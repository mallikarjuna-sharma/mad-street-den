import { Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import ContextMenu from "../components/CustomizedMenus";
import CustomizedMenus from "../components/CustomizedMenus";

export default function Desktop() {
  return (
    <Grid
      container
      direction="column"
      style={{ height: "100%", width: "100%" }}
    >
      <CustomizedMenus />
    </Grid>
  );
}
