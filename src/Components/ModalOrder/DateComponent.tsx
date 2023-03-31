import { Box } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  TimeClock,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { useState } from "react";

export default function DateComponent() {
  let [isDateDone, setDateDone] = useState(false);
  let [currentDate, setCurrentDate] = useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {!isDateDone ? (
        <DateCalendar
          defaultValue={new Date()}
          disablePast={true}
          onChange={(newValue) => {
            setCurrentDate(newValue);
            setDateDone(true);
          }}
        />
      ) : (
        <Box sx={{ position: "relative" }}>
          <TimeClock
            defaultValue={new Date(currentDate)}
            view="hours"
            onChange={(newValue) => {
              setCurrentDate(newValue);
              console.log(newValue);
            }}
            ampm={false}
            minTime={new Date(0, 0, 0, 8)}
            maxTime={new Date(0, 0, 0, 18)}
          />
        </Box>
      )}
    </LocalizationProvider>
  );
}
