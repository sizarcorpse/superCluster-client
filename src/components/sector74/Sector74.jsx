import React, { useState, useEffect, useContext } from "react";
import { albumsContext } from "../_context/albumContext";
import withStyles from "@material-ui/core/styles/withStyles";

import {
  Grid,
  Paper,
  GridList,
  GridListTile,
  Button,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";

const myAlbumStyles = (theme) => ({
  ho: {
    display: "flex",
  },
});
function Sector74(props) {
  const { classes } = props;
  const [
    albums,
    page,
    sector,
    cat,
    setCat,
    albumsc,
    setalbumsc,
    setsector,
    setalbums,
    setPage,
  ] = useContext(albumsContext);
  setsector("SECTOR74");
  return (
    <Paper>
      <Grid container>
        <Grid item xl={12}>
          <List className={classes.ho}>
            <Typography> yes page : {page}</Typography>
            <Typography> yes albums : {albums.length}</Typography>

            {albums
              ? albums.map((album) => (
                  <ListItem alignItems="center">
                    <Typography>{album.albumName}</Typography>
                  </ListItem>
                ))
              : "no"}
          </List>
          <Button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            prev page
          </Button>
          <Button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            next page
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(myAlbumStyles)(Sector74);
