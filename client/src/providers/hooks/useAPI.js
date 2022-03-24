import { useCallback, useEffect, useState } from "react";
import API from "../../api";

export default function useAPI(service, map = false, initilize = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const init = useCallback(async () => {
    try {
      let result = await API[service].getAll();
      if (map) {
        result = result
          .map(({ id, nombre }) => ({
            value: id,
            label: nombre,
          }))
          .filter((i) => i.label);
      }
      setData(result || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [service, map]);

  const create = useCallback(
    async (values) => {
      try {
        setLoading(true);
        const created = await API[service].create(values);
        const result = await API[service].get(created.id);
        setData((prev) => prev.concat(result));
        return result;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [service]
  );

  useEffect(() => {
    initilize && init();
  }, [initilize, init]);

  return { data, loading, init, create, api: API[service] };
}
