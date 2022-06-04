import { useEffect, useState } from "react";
import {
  isBoolean,
  isNullish,
  isObject,
  isDate,
  formatFilterDate,
} from "../../utils";

export default function useFilterOptions({ data, initialValues }) {
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    if (!initialValues) return;
    console.log("initialValues", initialValues);
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

  return { filterOptions, findUniqueOptions, setFilterOptions };
}

function findUniqueOptions(items, filters2use) {
  // Map over all the items and find the unique options for each filter
  return items.reduce((acc, item) => {
    const keys = Object.keys(acc);
    // For each filter from filters2use,
    // get the values from the current item
    const result = keys.reduce((accFilters, filterKey) => {
      const value = item[filterKey];
      const isArray = Array.isArray(value);
      const isObj = isObject(value);
      const isBool = isBoolean(value);
      const isADate = isDate(value);
      const accumulatedFilter = acc[filterKey];
      const hasProperty = (prop) => accumulatedFilter.hasOwnProperty(prop);

      let currentOptions = {};
      if (isArray) {
        currentOptions = (value || [])
          .filter((t) => !hasProperty([t.id]))
          .reduce(
            (accT, t) => ({ ...accT, [t.id]: t.nombre || t.codigo }),
            accumulatedFilter
          );
      } else if (isObj && value?.id && !hasProperty(value.id)) {
        currentOptions = { ...accumulatedFilter, [value.id]: value.nombre };
      } else if (isBool && !hasProperty(value) && !isNullish(value)) {
        let booleanLabel = value ? "Si" : "No";
        let booleanValue = value ? 1 : 0;
        currentOptions = {
          ...accumulatedFilter,
          [booleanValue]: booleanLabel,
        };
      } else if (isADate && !hasProperty(value) && !isNullish(value)) {
        let dateLabel = formatFilterDate(value);
        currentOptions = {
          ...accumulatedFilter,
          [value]: dateLabel,
        };
      } else if (!isObj && !hasProperty(value) && !isNullish(value)) {
        currentOptions = {
          ...accumulatedFilter,
          [value]: value,
        };
      }
      // Merge the options from the current item with the accumulated options
      return {
        ...accFilters,
        [filterKey]: { ...accumulatedFilter, ...currentOptions },
      };
    }, filters2use);
    return result;
  }, filters2use);
}
