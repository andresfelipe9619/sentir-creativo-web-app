const { useCallback, useState } = require("react");
const { default: API } = require("../../api");

const API_OPTIONS = {
  params: { _limit: -1, _sort: "nombre:ASC" },
};

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

          const result = await API[dependency].getAll(API_OPTIONS);
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
