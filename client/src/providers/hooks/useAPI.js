import { useCallback, useEffect, useState } from "react";
import API from "../../api";

export default function useAPI({
  service,
  map = false,
  initilize = true,
  lazy = false,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const init = useCallback(
    async (customParams) => {
      try {
        let params = { _limit: -1, ...(customParams || {}) };
        // Use this for server side pagination
        // if (lazy) {
        //   params = getPaginationData({ page, pageSize: PAGE_SIZE });
        // }
        let result = await API[service].getAll({ params });
        if (map) {
          result = result
            .map(({ id, nombre }) => ({
              value: id,
              label: nombre,
            }))
            .filter((i) => i.label);
        }
        if (!lazy) return setData(result || []);
        // Use this for server side pagination
        // setData((prev) => prev.concat(result));
        // const countResult = await API[service].count();
        // setCount(countResult);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    //eslint-disable-next-line
    [page, service, lazy]
  );

  const loadMore = useCallback(() => {
    setPage((prev) => ++prev);
  }, []);

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

  return {
    api: API[service],
    create,
    data,
    init,
    loadMore,
    loading,
    page,
  };
}
