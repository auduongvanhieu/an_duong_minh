import { Typography, FormControlLabel,Switch } from "@material-ui/core";
import React from "react";

const Switch2 = (initialProps) => {
  const { label, checked, handleOnChangeChecked = (e) => {} } = initialProps;
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          size="small"
          color="primary"
          onChange={(_, value) => {
            handleOnChangeChecked(value);
          }}
        />
      }
      label={<Typography style={{ fontSize: 14 }}>{label}</Typography>}
      labelPlacement={"end"}
    />
  );
};

export default Switch2;
