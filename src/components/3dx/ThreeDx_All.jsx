// @import ::
import React, { useContext } from "react";

// @context ::
import { ThreeDxContext } from "./_context3dx";

// @material-ui ::
import withWidth from "@material-ui/core/withWidth";
import All3dxAlbumSmall from "./ThreeDx_AF_Thumb";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Paper, GridList, GridListTile } from "@material-ui/core";

// @import func ::
import { getGridListCols } from "./mui_GridCols";

const my3dxStyles = (theme) => ({
  GridList: {
    Width: "200px",
    Height: "500px",
    overflow: "hidden",
  },
  GridListTile: {
    overflow: "hidden",
    Width: "500px",
    Height: "500px",
  },
});

function All3dxAlbums(props) {
  const [
    threedxAlbums,
    setThreedxAlbums,
    filter3dxAlbums,
    setFilter3dxAlbums,
    page,
    setPage,
    category,
    setCategory,
    ren,
    serRen,
  ] = useContext(ThreeDxContext);
  const { classes, width } = props;

  const customGridCols = getGridListCols(width);
  return (
    <Paper>
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          {threedxAlbums ? (
            <GridList
              cellHeight={250}
              spacing={0}
              cols={customGridCols}
              className={classes.gridList}
            >
              {threedxAlbums.map((album) => (
                <GridListTile cols={1} spacing={0}>
                  <All3dxAlbumSmall album={album} key={album._id} />
                </GridListTile>
              ))}
            </GridList>
          ) : (
            "laoding"
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withWidth()(withStyles(my3dxStyles)(All3dxAlbums));
