const { useCallback, useState } = require("react");
const { default: API } = require("../../api");
const couponColumns = ["cupon_descuentos", "cuponDescuento"];

export default function useFormDependencies(columns) {
  const [dependencies, setDependencies] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultLabel = (item) => item.nombre || item.codigo;

  const loadDependencies = useCallback(async () => {
    try {
      setLoading(true);
      const dependencyColumns = columns.reduce((acc, col) => {
        let { dependency } = col?.form;
        if (dependency) acc = acc.concat(col);

        return acc;
      }, []);
      await Promise.all(
        dependencyColumns.map(async (col) => {
          const { dependency, renderLabel } = col?.form;
          const isCouponColumn = couponColumns.includes(col?.name);
          const sort = isCouponColumn ? "codigo:ASC" : "nombre:ASC";
          const result = await API[dependency].getAll({
            params: {
              _limit: -1,
              _sort: sort,
            },
          });
          setDependencies((prev) => ({
            ...prev,
            [dependency]: result.map((item) => ({
              label: renderLabel ? renderLabel(item) : defaultLabel(item),
              value: item.id,
            })),
          }));
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    //eslint-disable-next-line
  }, []);

  return { dependencies, loadDependencies, loadingDependencies: loading };
}
