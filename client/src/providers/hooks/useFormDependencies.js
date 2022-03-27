const { useCallback, useState } = require("react");
const { default: API } = require("../../api");

export default function useFormDependencies(columns) {
  const [dependencies, setDependencies] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDependencies = useCallback(async () => {
    try {
      setLoading(true);
      let dependencyColumns = columns.reduce((acc, col) => {
        let dependency = col?.form?.dependency;
        if (dependency) {
          acc = acc.concat(dependency);
        }
        return acc;
      }, []);
      await Promise.all(
        dependencyColumns.map(async (dependecy) => {
          let result = await API[dependecy].getAll();
          setDependencies((prev) => ({
            ...prev,
            [dependecy]: result.map((item) => ({
              label: item.nombre || item.codigo,
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
