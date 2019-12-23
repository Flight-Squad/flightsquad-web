import React, { Fragment, useState } from "react";
import { DatePicker } from "@material-ui/pickers";

function DobPicker(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <Fragment>
            {/* <DatePicker
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
      />

      <DatePicker
        autoOk
        label="Clearable"
        clearable
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
      /> */}

      {/* See https://stackoverflow.com/a/50432162 */}
      {/* https://material-ui.com/components/pickers/ */}

            <DatePicker
                disableFuture
                openTo="year"
                format="MM/dd/yyyy"
                // label="Date of birth"
                views={["year", "month", "date"]}
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth={true}
                InputProps={{
                    disableUnderline: true,
                    margin: 'none',
                }}
            />
        </Fragment>
    );
}

export default DobPicker;
