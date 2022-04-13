import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import API from "../../api";

export default function CitySelect({ item, ...formikProps }) {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("formikProps", formikProps);

  const loadCities = async (region) => {
    let result = await API.Ciudad.getAll({
      params: { _limit: -1, region },
    });
    setCities(result);
  };

  const loadRegions = async (pais) => {
    let result = await API.Region.getAll({
      params: { _limit: -1, pais },
    });
    setRegions(result);
  };

  const loadCountries = async () => {
    let result = await API.Pais.getAll({ params: { _limit: -1 } });
    setCountries(result);
  };

  const handleChangeCountry = async (_, newValue) => {
    try {
      setLoading(true);
      console.log("newValue", newValue);
      setSelectedCountry(newValue);
      await loadRegions(newValue.id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRegion = async (_, newValue) => {
    try {
      setLoading(true);
      console.log("newValue", newValue);
      setSelectedRegion(newValue);
      await loadCities(newValue.id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <Box display="flex">
      <CustomAutocomplete
        label="País"
        name="pais"
        options={countries}
        value={selectedCountry}
        handleChange={handleChangeCountry}
      />
      {selectedCountry && (
        <CustomAutocomplete
          label="Región"
          name="region"
          loading={loading}
          value={selectedRegion}
          options={regions}
          handleChange={handleChangeRegion}
        />
      )}
      {selectedRegion && (
        <CustomAutocomplete
          label="Ciudad"
          name="ciudad"
          loading={loading}
          options={cities}
          value={formikProps?.values?.ciudad || ""}
          {...formikProps}
        />
      )}
    </Box>
  );
}

function CustomAutocomplete({
  value,
  label,
  name,
  options,
  handleBlur,
  handleChange,
  loading,
  isSubmitting,
}) {
  return (
    <Autocomplete
      disabled={isSubmitting}
      id={name}
      name={name}
      options={options}
      loading={loading}
      loadingText="Cargando..."
      value={value || ""}
      onBlur={handleBlur}
      onChange={handleChange}
      getOptionSelected={(option) => option?.id || ""}
      getOptionLabel={(option) => option?.nombre || ""}
      style={{ width: 300, margin: 4 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          autoComplete="off"
        />
      )}
    />
  );
}
