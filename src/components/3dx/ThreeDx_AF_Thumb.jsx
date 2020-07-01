// @import ::
import React, { useState } from "react";
import { Link } from "react-router-dom";

// @material-ui ::
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Fade, GridListTileBar, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const myStyles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
  photo: {
    width: "120%",
    height: "100%",
    "&:hover": {
      filter: "blur(1px)",
    },
  },
  FavoriteIcon: {
    fontSize: "20px",
    "&:hover": {
      color: "#f50057",
    },
  },
});
function All3dxAlbumSmall(props) {
  const [showGridListTileBar, setShowGridListTileBar] = useState(false);
  const { classes, album } = props;
  return (
    <Box
      className={classes.box}
      onMouseEnter={() => setShowGridListTileBar(true)}
      onMouseLeave={() => setShowGridListTileBar(false)}
    >
      <Link to={`3dx/${album._id}`}>
        <img src={album.albumCoverPhoto} className={classes.photo} alt="" />
      </Link>
      {showGridListTileBar && (
        <Fade in={true}>
          <GridListTileBar
            title={
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                to={`3dx/${album._id}`}
              >
                {album.albumName}
              </Link>
            }
            titlePosition="top"
            actionIcon={
              <IconButton
                aria-label={`star ${album.albumName}`}
                className={classes.icon}
                size="medium"
              >
                <FavoriteIcon className={classes.FavoriteIcon} />
              </IconButton>
            }
            actionPosition="right"
            className={classes.titleBar}
          />
        </Fade>
      )}
    </Box>
  );
}

export default withStyles(myStyles)(All3dxAlbumSmall);
