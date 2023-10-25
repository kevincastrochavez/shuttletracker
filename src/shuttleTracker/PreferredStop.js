import React from "react";
import { Select } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import classes from "./PreferredStop.module.css";

import {
  useBusInfo,
  usePreferredStop,
  useSetPreferredStop,
} from "./ShuttleTrackerProvider";
import { useStorage } from "./utils";

/**
 * Component to select preferred bus stop you will be waiting at
 * @returns {JSX.Element}
 */
function PreferredStop() {
  const { busStopsList } = useBusInfo();
  const { setStopSelected } = useSetPreferredStop();
  const { stopSelected } = usePreferredStop();
  const [value, setValue] = useStorage("preferredBusStop", "BYU-I Hart");
  const { width } = useViewportSize();
  let inputSize;
  if (width <= 750) {
    inputSize = "100%";
  }
  if (width > 750 && width <= 990) {
    inputSize = "60%";
  }
  if (width > 990) {
    inputSize = "40%";
  }

  return (
    <Select
      style={{ width: inputSize }}
      className={classes.preferredStop}
      size="md"
      label="Select your Preferred Stop"
      description="(shuttle might be closer than you think)"
      data={busStopsList}
      placeholder="Pick value"
      onChange={(value) => {
        setStopSelected(value);
        setValue(value);
      }}
      value={stopSelected}
    />
  );
}

export default PreferredStop;
