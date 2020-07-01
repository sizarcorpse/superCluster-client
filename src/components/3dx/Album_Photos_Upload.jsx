// @import ::
import React, { useState, useContext, useRef } from "react";
import axios from "axios";

// @context ::
import { ThreeDxContext } from "./_context3dx";

// @material-ui ::
import { withStyles } from "@material-ui/core/styles";
import { Input, Box, Button, InputLabel, Typography } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fade from "@material-ui/core/Fade";

const photoUploadStyle = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#0f161c",
    border: "2px solid #0f161c",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "600px",
    width: "600px",
  },
  UpInput: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginTop: "10px",
  },
  UpTotal: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginLeft: "75px",
  },
  UpTotalNotice: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginLeft: "35px",
    marginBottom: "10px",
  },
});

function AlbumPhotosUpload(props) {
  const [
    threedxAlbums,
    setThreedxAlbums,
    filter3dxAlbums,
    setFilter3dxAlbums,
    page,
    setPage,
    category,
    setCategory,
    render,
    setRender,
  ] = useContext(ThreeDxContext);
  const { classes, albumID } = props;
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [notice, setNotice] = useState("");
  const imp = useRef();

  // @handle ::
  const handleUploadPhoto = (e) => {
    let file = e.target.files;
    setUploadedPhotos(file);
    setNotice("");
  };

  const handleuplaodPhoto = () => {
    var xx = new FormData();
    for (let i = 0; i < uploadedPhotos.length; i++) {
      xx.append("albumPhotos", uploadedPhotos[i]);
    }
    axios
      .post(`/photos/a/${albumID}/upload`, xx, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "upload Progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((res) => {
        setRender(res);
        setNotice(res.data.message);
        setUploadedPhotos([]);
      });
  };
  return (
    <Box className={classes.modal}>
      <Box class="custom-file" className={classes.paper}>
        <Input
          inputProps={{
            multiple: true,
            className: classes.UpInput,
            ref: imp,
          }}
          type="file"
          class="custom-file-input"
          name="file"
          onChange={handleUploadPhoto}
          className={classes.modal}
          style={{ visibility: "hidden" }}
        />
        <Typography
          variant="h1"
          component="h2"
          gutterBottom
          className={classes.UpTotal}
        >
          {uploadedPhotos.length < 10
            ? "0" + uploadedPhotos.length
            : uploadedPhotos.length}
        </Typography>

        {notice && (
          <Fade in={notice}>
            <Typography
              style={{ color: "#00c853" }}
              variant="subtitle1"
              className={classes.UpTotalNotice}
            >
              {notice}
            </Typography>
          </Fade>
        )}

        <Box>
          <Button
            style={{
              marginLeft: "70px",
              textTransform: "none",
            }}
            variant="outlined"
            onClick={() => imp.current.click()}
          >
            <AddPhotoAlternateIcon style={{ marginRight: "10px" }} />
            <Typography style={{ marginLeft: "3px", marginRight: "5px" }}>
              Choose
            </Typography>
          </Button>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          style={{
            marginLeft: "70px",
            marginTop: "5px",
            textTransform: "none",
          }}
          onClick={handleuplaodPhoto}
        >
          Uplaod Photos
        </Button>
      </Box>
    </Box>
  );
}

export default withStyles(photoUploadStyle)(AlbumPhotosUpload);
