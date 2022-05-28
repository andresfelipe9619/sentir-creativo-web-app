import { useEffect, useState } from "react";
import { isObject } from "../../utils";

export default function useFilterOptions({ data, initialValues }) {
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    if (!initialValues) return;
    if (Array.isArray(initialValues)) {
      let defaultFilters = initialValues.reduce(
        (acc, f) => ({ ...acc, [f.name]: {} }),
        {}
      );

      if (data) {
        defaultFilters = findUniqueOptions(data, defaultFilters);
      }
      setFilterOptions(defaultFilters);
    } else {
      setFilterOptions(initialValues);
    }
    //eslint-disable-next-line
  }, []);

  function findUniqueOptions(items, defaultFilters) {
    const filters2use = defaultFilters || filterOptions;
    return items.reduce((acc, item) => {
      const keys = Object.keys(acc);
      const result = keys.reduce((accFilters, filterKey) => {
        let value = item[filterKey];
        let isArray = Array.isArray(value);
        let isObj = isObject(value);
        let currentOptions = {};
        if (isArray) {
          currentOptions = (value || [])
            .filter((t) => !acc[filterKey][t.id])
            .reduce(
              (accT, t) => ({ ...accT, [t.id]: t.nombre }),
              acc[filterKey]
            );
        } else if (isObj && !acc[filterKey][value.id]) {
          currentOptions = { ...acc[filterKey], [value.id]: value.nombre };
        }

        return {
          ...accFilters,
          [filterKey]: currentOptions,
        };
      }, filters2use);

      return result;
    }, filters2use);
  }

  return { filterOptions, findUniqueOptions, setFilterOptions };
}
