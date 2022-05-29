import React, { memo } from "react";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import Spinner from "../spinner/Spinner";
import { CheckboxGroup } from "../radio";
import useStyles from "./styles";

const FilterOption = memo(function FilterOption({
  label,
  name,
  options,
  loading,
  values,
  handleChange,
}) {
  const hasOptions = (options || []).length;
  return (
    <AccordionOption title={label}>
      {loading && !hasOptions && <Spinner mt={0} />}
      {hasOptions ? (
        <CheckboxGroup
          name={name}
          disabled={loading}
          options={options}
          values={values}
          handleChange={handleChange}
        />
      ) : (
        "No hay opciones para filtrar con los datos actuales..."
      )}
    </AccordionOption>
  );
});

const AccordionOption = memo(function AccordionOption({ title, children }) {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        className={classes.accordion}
        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
        aria-controls={`panel-${title}-content`}
        id={`panel-${title}-header`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
});

export default FilterOption;
