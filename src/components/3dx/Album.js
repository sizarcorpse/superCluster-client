import React from "react";
import AlbumDetailsOnly from "./Album_Details";
import AlbumShowcase from "./Album_Showcase";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";

const albumDetails = (theme) => ({});

function AlbumDetails(props) {
  const { match, classes, history } = props;
  return (
    <Paper>
      <Grid container>
        <Grid item xl={10} lg={9} md={8}>
          <AlbumShowcase albumID={match.params.albumID} />
        </Grid>
        <Grid item xl={2} lg={3} md={4}>
          <AlbumDetailsOnly albumID={match.params.albumID} history={history} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(albumDetails)(AlbumDetails);
