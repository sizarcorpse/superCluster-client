// @import ::
import React, { useState } from "react";

// @component ::
import All3dxAlbums from "./ThreeDx_All";
import Filter3dxAlbums from "./ThreeDx_Filter";

// @material-ui ::
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box, Paper } from "@material-ui/core";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  SwipeableViews: {
    backgroundColor: "#0f161c",
  },
}));

function ThreeDx() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Paper>
      <Box className={classes.root}>
        <AppBar position="static" color="default" alignContent="flex-end">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            alignContent="flex-end"
            className={classes.SwipeableViews}
          >
            <Tab icon={<PhotoSizeSelectActualIcon />} {...a11yProps(0)} />
            <Tab icon={<FavoriteIcon />} {...a11yProps(1)} />
            <Tab icon={<PersonPinIcon />} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <All3dxAlbums />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Filter3dxAlbums categoryName={"comics"} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Filter3dxAlbums categoryName={"artistcg"} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Paper>
  );
}

export default ThreeDx;
