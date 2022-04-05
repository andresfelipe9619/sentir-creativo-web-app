import { useCallback, useEffect, useState } from "react";
import API from "../../api";
import { getPaginationData } from "../../utils";

const PAGE_SIZE = 3;

export default function useAPI({
  service,
  map = false,
  initilize = true,
  lazy = false,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const init = useCallback(async () => {
    try {
      console.log("lazy", lazy);
      let params = {};
      if (lazy) {
        params = getPaginationData({ page, pageSize: PAGE_SIZE });
      }
      console.log("params", params);
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
      setData((prev) => prev.concat(result));
      const countResult = await API[service].count();
      setCount(countResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    //eslint-disable-next-line
  }, [page, service, lazy]);

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
    count,
    create,
    data,
    init,
    loadMore,
    loading,
    page,
  };
}
