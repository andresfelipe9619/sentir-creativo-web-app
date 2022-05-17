import { useState } from "react";

export default function useFilterOptions({ defaultFilters }) {
  const [filterOptions, setFilterOptions] = useState(defaultFilters);

  function findUniqueOptions(items) {
    return items.reduce((acc, s) => {
      const keys = Object.keys(acc);
      const result = keys.reduce((accFilters, filterKey) => {
        let currentOptions = (s[filterKey] || [])
          .filter((t) => !acc[filterKey][t.id])
          .reduce((accT, t) => ({ ...accT, [t.id]: t.nombre }), acc[filterKey]);

        return {
          ...accFilters,
          [filterKey]: currentOptions,
        };
      }, defaultFilters);

      return result;
    }, defaultFilters);
  }

  return { filterOptions, findUniqueOptions, setFilterOptions };
}
