import React, { Fragment } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

function DobPicker(props) {

  return (
    <Fragment>
      {/* See https://stackoverflow.com/a/50432162 */}
      {/* https://material-ui.com/components/pickers/ */}
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        id="date-picker-inline"
        value={props.dob}
        onChange={props.onChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        fullWidth={true}
        InputProps={{
          disableUnderline: true,
          margin: "none"
        }}
      />
    </Fragment>
  );
}

export default DobPicker;
