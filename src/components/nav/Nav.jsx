import React from "react";

import { Link } from "react-router-dom";

// @material-ui ::
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Grid,
  Paper,
  GridList,
  GridListTile,
  Button,
  Typography,
  Box,
} from "@material-ui/core";

const myNavStyles = (theme) => ({
  grid: {
    width: "100%",
    maxHeight: "50px",
    height: "50px",
    backgroundColor: "#18232d",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#0f161c",
  },
  griditem: {
    width: "100%",
    maxHeight: "50px",
  },
  gridlist: {
    width: "100%",
    maxHeight: "50px",
  },
  gridlisttile: {
    Width: "100%",
    maxHeight: "48px",
  },
  gridlisttilebutton: {
    marginTop: "8px",
    color: "#D0E1F9",
  },
});

function Nav(props) {
  const { classes } = props;
  const menu = ["Home", "Albums", "3DX", "Sector74", "thots"];
  return (
    <Paper>
      <Grid container className={classes.grid}>
        <Grid item xl={3} className={classes.griditem}></Grid>
        <Grid item xl={6} className={classes.griditem}>
          <GridList
            cols={5}
            cellHeight={48}
            spacing={1}
            className={classes.gridlist}
          >
            {menu.map((item) => (
              <GridListTile className={classes.gridlisttile}>
                <Link to={`/${item}`} underline={"none"}>
                  <Button
                    style={{ textDecoration: "none" }}
                    size={"medium"}
                    underline={"none"}
                    className={classes.gridlisttilebutton}
                  >
                    {item}
                  </Button>
                </Link>
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        <Grid item xl={3} className={classes.griditem}></Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(myNavStyles)(Nav);
