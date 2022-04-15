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
  const [selectedCity, setSelectedCity] = useState(null);
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
      setSelectedRegion(newValue);
      await loadCities(newValue.id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCity = async (_, value) => {
    const event = { target: { name: "ciudad", value: value.id } };
    setSelectedCity(value);
    formikProps.handleChange(event);
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
          {...formikProps}
          label="Ciudad"
          name="ciudad"
          loading={loading}
          options={cities}
          value={selectedCity}
          handleChange={handleChangeCity}
        />
      )}
    </Box>
  );
}

function CustomAutocomplete(props) {
  const { handleChange, isSubmitting, label, loading, name, options, value } =
    props;
  return (
    <Autocomplete
      id={name}
      name={name}
      options={options}
      loading={loading}
      disabled={isSubmitting}
      loadingText="Cargando..."
      value={value}
      onChange={handleChange}
      getOptionSelected={(option, v) => option?.id === v.id}
      getOptionLabel={(option) => option?.nombre || ""}
      style={{ width: 300, margin: 8 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          autoComplete="off"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
