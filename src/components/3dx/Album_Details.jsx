// @import ::
import React, { useState, useContext } from "react";
import axios from "axios";

// @context ::
import { ThreeDxContext } from "./_context3dx";

// @hook ::
import { UseFetchAlbumDetails } from "./useFetchAlbumDetails";

// @component ::
import AlbumDetailsUpdate from "./Album_Details_Update";
import AlbumPhotosUpload from "./Album_Photos_Upload";

// @material-ui ::
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { albumDetailsStyle } from "./mui_Album_Details";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CategoryIcon from "@material-ui/icons/Category";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StarsIcon from "@material-ui/icons/Stars";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PersonIcon from "@material-ui/icons/Person";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

function AlbumDetailsOnly(props) {
  const { classes, albumID, history } = props;
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

  const albumdetails = UseFetchAlbumDetails(albumID);
  const {
    albumName,
    albumCreatedAt,
    albumCoverPhoto,
    albumDetails,
    artistName,
    coArtistNames,
    sector,
    albumCategories,
    albumTags,
    albumOrigianlTitle,
    isFavorite,
    isLove,
    likeCount,
  } = albumdetails;

  const [expanded, setExpanded] = useState(false); // more details

  // @handle :: Popover
  const [openPopover, setOpenPopover] = useState(null); // popover
  const open = Boolean(openPopover); // popover
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  // @handle :: EditMode
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = (event) => {
    setEditMode(!editMode);
    setShowUpFieldTag(false);
    setShowUpFieldCat(false);
    setShowUpFieldCoAt(false);
    setShowUpFieldArt(false);
    setShowUpFieldDet(false);
  };
  const [showUpFieldTag, setShowUpFieldTag] = useState(false);
  const [showUpFieldCat, setShowUpFieldCat] = useState(false);
  const [showUpFieldCoAt, setShowUpFieldCoAt] = useState(false);
  const [showUpFieldArt, setShowUpFieldArt] = useState(false);
  const [showUpFieldDet, setShowUpFieldDet] = useState(false);

  // @handle :: Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenPopover(null);
  };

  // @handle :: Delete ALbum Deteils
  const onDeleteField = async (coid, dtOption) => {
    const res = await axios.post(`/albums/a/${albumID}/${dtOption}/${coid}`);
    setRender(res);
  };

  // @handle :: Love and Favorite Album
  const onLoveFav = async (dlOption) => {
    const res = await axios.post(`/albums/a/${albumID}/${dlOption}/`);
    setRender(res);
  };

  // @handle :: Delete album and Photos
  const handleAlbumNPhotos = async () => {
    const res = await axios.delete(`/albums/a/${albumID}/data/delete`);
    if (res) {
      const location = {
        pathname: `/3DX`,
        state: { fromDashboard: true },
      };
      history.push(location);
    }
  };

  // @handle :: random Cover Photo
  const handleAlbumCover = async () => {
    const res = await axios.post(`/photos/a/${albumID}/change`);
    setRender(res);
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={1}>
      <Card className={classes.root} align="left">
        {/* @action :: cardHeader w/ sector || albumName || */}

        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {sector}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleClickPopover} />
            </IconButton>
          }
          title={
            albumName ? (
              <Box>
                {albumName}

                {editMode && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    className={classes.EditModeIconButton}
                  >
                    <EditIcon
                      className={classes.EditModeEditIcon}
                      onClick={() => setShowUpFieldArt(!showUpFieldArt)}
                    />
                  </IconButton>
                )}
                {showUpFieldArt && (
                  <AlbumDetailsUpdate name="albumName" albumID={albumID} />
                )}
              </Box>
            ) : null
          }
          subheader={albumCreatedAt}
        />

        {/* @action ::  Popover || options || uploadPhoto || editmode || delete photo*/}

        <Popover
          open={open}
          anchorEl={openPopover}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List>
            <ListItem className={classes.ListItemPop}>
              <Typography style={{ marginRight: "115px", fontSize: "17px" }}>
                Upload Photos
              </Typography>
              <ListItemText
                className={classes.ListItemText}
                primary={
                  <IconButton>
                    <AddAPhotoIcon
                      style={{ fontSize: "22px" }}
                      onClick={handleOpenModal}
                    />
                  </IconButton>
                }
              />

              {/* @action :: Modal || upload photo*/}

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openModal}>
                  <div className={classes.paper}>
                    <AlbumPhotosUpload albumID={albumID} />
                  </div>
                </Fade>
              </Modal>
            </ListItem>

            <ListItem className={classes.ListItemPop}>
              <Typography style={{ marginRight: "70px", fontSize: "17px" }}>
                Change Album Cover
              </Typography>
              <ListItemText
                className={classes.ListItemText}
                primary={
                  <IconButton>
                    <InsertPhotoIcon
                      style={{ fontSize: "22px" }}
                      onClick={() => handleAlbumCover()}
                    />
                  </IconButton>
                }
              />
            </ListItem>
            <ListItem className={classes.ListItemPop}>
              <Typography style={{ marginRight: "140px", fontSize: "17px" }}>
                Edit Mode
              </Typography>
              <ListItemText
                className={classes.ListItemText}
                primary={
                  <Switch checked={editMode} onChange={handleEditMode} />
                }
              />
            </ListItem>

            <ListItem className={classes.ListItemPop}>
              <Typography style={{ marginRight: "125px", fontSize: "17px" }}>
                Delete Photos
              </Typography>
              <ListItemText
                className={classes.ListItemText}
                primary={
                  <IconButton>
                    <DeleteIcon style={{ fontSize: "22px" }} />
                  </IconButton>
                }
              />
            </ListItem>
            <ListItem className={classes.ListItemPop}>
              <Typography style={{ marginRight: "130px", fontSize: "17px" }}>
                Delete Album
              </Typography>
              <ListItemText
                className={classes.ListItemText}
                primary={
                  <IconButton>
                    <DeleteForeverIcon
                      style={{ fontSize: "22px" }}
                      onClick={() => handleAlbumNPhotos(albumID)}
                    />
                  </IconButton>
                }
              />
            </ListItem>
          </List>
        </Popover>
        <CardMedia
          className={classes.media}
          image={albumCoverPhoto}
          title={albumName}
        />

        {/* @action :: albumDetails */}

        <CardContent className={classes.root_2}>
          {albumDetails ? (
            <Box>
              <Typography
                size="small"
                variant="outlined"
                className={classes.ListItemText}
              >
                {albumDetails}
              </Typography>
              {editMode && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  className={classes.EditModeIconButton4details}
                >
                  <EditIcon
                    style={{ fontSize: "17px" }}
                    onClick={() => setShowUpFieldDet(!showUpFieldDet)}
                  />
                </IconButton>
              )}
              {showUpFieldDet && (
                <AlbumDetailsUpdate name="albumDetails" albumID={albumID} />
              )}
            </Box>
          ) : (
            <Box>
              {editMode && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  className={classes.EditModeIconButton4details}
                >
                  <EditIcon
                    style={{ fontSize: "17px" }}
                    onClick={() => setShowUpFieldDet(!showUpFieldDet)}
                  />
                </IconButton>
              )}
              {showUpFieldDet && (
                <AlbumDetailsUpdate name="albumDetails" albumID={albumID} />
              )}
            </Box>
          )}
        </CardContent>

        {/* @action :: Love || Favorite || like*/}

        <CardContent className={classes.LoveCardContent}>
          <IconButton aria-label="Love">
            {isLove ? (
              <FavoriteIcon
                onClick={() => onLoveFav("love")}
                style={{ color: "#f50057" }}
                title="You already Love this album"
              />
            ) : (
              <FavoriteIcon onClick={() => onLoveFav("love")} />
            )}
          </IconButton>
          <IconButton aria-label="Favorite">
            {isFavorite ? (
              <StarsIcon
                onClick={() => onLoveFav("favorite")}
                style={{ color: "#ffc107" }}
              />
            ) : (
              <StarsIcon onClick={() => onLoveFav("favorite")} />
            )}
          </IconButton>
          <IconButton aria-label="Like">
            <ThumbUpAltIcon />
          </IconButton>
        </CardContent>

        {/* @action :: artistName*/}

        <CardContent>
          <List
            component="nav"
            aria-label="main mailbox folders"
            disableSpacing
            className={classes.List}
          >
            <ListItem className={classes.ListItem}>
              <ListItemIcon title="Original Artist">
                <PersonIcon className={classes.ListItemIcon} />
              </ListItemIcon>
              <ListItemText
                primary={
                  artistName ? (
                    <Box>
                      <Button
                        size="small"
                        variant="outlined"
                        className={classes.ListItemText}
                      >
                        {artistName}
                      </Button>
                      {editMode && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className={classes.EditModeIconButton}
                        >
                          <EditIcon
                            className={classes.EditModeEditIcon}
                            onClick={() => setShowUpFieldArt(!showUpFieldArt)}
                          />
                        </IconButton>
                      )}
                      {showUpFieldArt && (
                        <AlbumDetailsUpdate
                          name="artistName"
                          albumID={albumID}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box>
                      {editMode && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className={classes.EditModeIconButton}
                        >
                          <EditIcon
                            className={classes.EditModeEditIcon}
                            onClick={() => setShowUpFieldArt(!showUpFieldArt)}
                          />
                        </IconButton>
                      )}
                      {showUpFieldArt && (
                        <AlbumDetailsUpdate
                          name="artistName"
                          albumID={albumID}
                        />
                      )}
                    </Box>
                  )
                }
              />
            </ListItem>

            {/* @action :: coArtistName*/}

            <ListItem className={classes.ListItem}>
              <ListItemIcon>
                <PeopleAltIcon
                  className={classes.ListItemIcon}
                  title="Featured Artist"
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  coArtistNames ? (
                    <Box>
                      {!editMode
                        ? coArtistNames.map((coartist) => (
                            <Button
                              variant="outlined"
                              key={coartist._id}
                              size="small"
                              pt={10}
                              className={classes.ListItemText}
                            >
                              {coartist.coArtistName}
                            </Button>
                          ))
                        : coArtistNames.map((coartist) => (
                            <Button
                              variant="outlined"
                              key={coartist._id}
                              size="small"
                              pt={10}
                              className={classes.EditModeDeleteHover}
                              onClick={() => onDeleteField(coartist._id, "dca")}
                            >
                              {coartist.coArtistName}
                            </Button>
                          ))}

                      {editMode && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className={classes.EditModeIconButton}
                        >
                          <EditIcon
                            className={classes.EditModeEditIcon}
                            onClick={() => setShowUpFieldCoAt(!showUpFieldCoAt)}
                          />
                        </IconButton>
                      )}
                      {showUpFieldCoAt && (
                        <AlbumDetailsUpdate
                          name="coArtistNames"
                          albumID={albumID}
                        />
                      )}
                    </Box>
                  ) : (
                    "null"
                  )
                }
              />
            </ListItem>

            {/* @action :: Categories*/}

            <ListItem className={classes.ListItem}>
              <ListItemIcon title="Album Categoires">
                <CategoryIcon className={classes.ListItemIcon} />
              </ListItemIcon>
              <ListItemText
                primary={
                  albumCategories ? (
                    <Box>
                      {!editMode
                        ? albumCategories.map((category) => (
                            <Button
                              variant="outlined"
                              key={category._id}
                              size="small"
                              pt={10}
                              className={classes.ListItemText}
                            >
                              {category.categoryName}
                            </Button>
                          ))
                        : albumCategories.map((category) => (
                            <Button
                              variant="outlined"
                              key={category._id}
                              size="small"
                              pt={10}
                              className={classes.EditModeDeleteHover}
                              onClick={() => onDeleteField(category._id, "dc")}
                            >
                              {category.categoryName}
                            </Button>
                          ))}
                      {editMode && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className={classes.EditModeIconButton}
                        >
                          <EditIcon
                            className={classes.EditModeEditIcon}
                            onClick={() => setShowUpFieldCat(!showUpFieldCat)}
                          />
                        </IconButton>
                      )}
                      {showUpFieldCat && (
                        <AlbumDetailsUpdate
                          name="categoryName"
                          albumID={albumID}
                        />
                      )}
                    </Box>
                  ) : (
                    "null"
                  )
                }
              />
            </ListItem>

            {/* @action :: tags*/}

            <ListItem className={classes.ListItem}>
              <ListItemIcon title="Album Tags">
                <LocalOfferIcon className={classes.ListItemIcon} />
              </ListItemIcon>
              <ListItemText
                className={classes.ListItemText}
                primary={
                  albumTags ? (
                    <Box>
                      {!editMode
                        ? albumTags.map((tag) => (
                            <Button
                              variant="outlined"
                              key={tag._id}
                              size="small"
                              pt={10}
                              className={classes.ListItemText}
                            >
                              {tag.tagName}
                            </Button>
                          ))
                        : albumTags.map((tag) => (
                            <Button
                              variant="outlined"
                              key={tag._id}
                              size="small"
                              pt={10}
                              className={classes.EditModeDeleteHover}
                              onClick={() => onDeleteField(tag._id, "dt")}
                            >
                              {tag.tagName}
                            </Button>
                          ))}
                      {editMode && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className={classes.EditModeIconButton}
                        >
                          <EditIcon
                            className={classes.EditModeEditIcon}
                            onClick={() => {
                              setShowUpFieldTag(!showUpFieldTag);
                            }}
                          />
                        </IconButton>
                      )}
                      {showUpFieldTag && (
                        <AlbumDetailsUpdate name="tagNamex" albumID={albumID} />
                      )}
                    </Box>
                  ) : (
                    "null"
                  )
                }
              />
            </ListItem>
          </List>
        </CardContent>

        {/* @action :: furute */}

        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>No Content</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}

export default withStyles(albumDetailsStyle)(AlbumDetailsOnly);
