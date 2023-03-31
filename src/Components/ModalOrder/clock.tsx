import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimeClock, TimeClockProps } from "@mui/x-date-pickers/TimeClock";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const slots: TimeClockProps<any>["slots"] = {
  leftArrowIcon: ArrowLeft,
  rightArrowIcon: ArrowRight,
};

type CurrentComponent = "date" | "time";

export default function ArrowSwitcherComponent() {
  let [isValue, setValue] = React.useState(new Date());
  console.log(isValue, "eee");
  const [currentComponent, setCurrentComponent] =
    React.useState<CurrentComponent>("date");

  const handleCurrentComponentChange = (
    event: React.MouseEvent<HTMLElement>,
    nextCurrentComponent: CurrentComponent | null
  ) => {
    if (nextCurrentComponent !== null) {
      setCurrentComponent(nextCurrentComponent);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2} sx={{ width: "100%" }} alignItems="center">
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={currentComponent}
          onChange={handleCurrentComponentChange}
          exclusive
        >
          <ToggleButton value={"date"}>date</ToggleButton>
          <ToggleButton value={"time"}>time</ToggleButton>
        </ToggleButtonGroup>
        {currentComponent === "date" && (
          <DateCalendar
            defaultValue={new Date()}
            disablePast={true}
            onChange={(newValue) => {
              setValue(newValue);
              console.log(newValue);
            }}
          />
        )}
        {currentComponent === "time" && (
          <Box sx={{ position: "relative" }}>
            <TimeClock
              defaultValue={new Date("2024-04-21")}
              view="hours"
              onChange={(newValue) => {
                //setValue(newValue);
                console.log(newValue);
              }}
              ampm={false}
              minTime={new Date(0, 0, 0, 8)}
              maxTime={new Date(0, 0, 0, 18)}
            />
          </Box>
        )}
      </Stack>
    </LocalizationProvider>
  );
}
