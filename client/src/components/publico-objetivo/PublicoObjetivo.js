import React from "react";
import CheckboxesGroup from "../checkbox";
import Spinner from "../spinner/Spinner";
import useAPI from "../../providers/hooks/useAPI";

export default function PublicoObjetivo({ values, handleChange }) {
  const { data, loading } = useAPI({ service: "PublicoObjetivo", map: true });
  if (loading) return <Spinner />;
  return (
    <CheckboxesGroup
      legend=""
      name="publicoObjetivo"
      options={data}
      values={values}
      handleChange={handleChange}
    />
  );
}
