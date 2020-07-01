// import React, { useState, useEffect, useContext } from "react";
// import { albumsContext } from "../_context/albumContext";

// // @material-ui ::
// import withStyles from "@material-ui/core/styles/withStyles";

// import {
//   Grid,
//   Paper,
//   GridList,
//   GridListTile,
//   Button,
//   Typography,
//   List,
//   ListItem,
// } from "@material-ui/core";
// const myAlbumStyles = (theme) => ({
//   ho: {
//     display: "flex",
//   },
// });

// function Album(props) {
//   const { classes } = props;
//   const [albums, page, setAlbums, setPage] = useContext(albumsContext);

//   return (
//     <Paper>
//       <Grid container>
//         <Grid item xl={12}>
//           <List className={classes.ho}>
//             <Typography> yes page : {page}</Typography>
//             <Typography> yes albums : {albums.length}</Typography>

//             {albums
//               ? albums.map((album) => (
//                   <ListItem alignItems="center">
//                     <Typography>{album.albumName}</Typography>
//                   </ListItem>
//                 ))
//               : "no"}
//           </List>
//           <Button
//             onClick={() => {
//               setPage(page - 1);
//             }}
//           >
//             prev page
//           </Button>
//           <Button
//             onClick={() => {
//               setPage(page + 1);
//             }}
//           >
//             next page
//           </Button>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }

// export default withStyles(myAlbumStyles)(Album);
// /*

//           <Typography> yes page : {page}</Typography>
//           <Typography> yes albums : {albums.length}</Typography>
//           <List className={classes.ho}>
//             {albums.map((album) => (
//               <ListItem alignItems="center">
//                 <Typography>{album.albumName}</Typography>
//               </ListItem>
//             ))}
//           </List>
//           <Button onClick={() => setPage(2)}>next page</Button>

// */

import React from "react";

function Album() {
  return (
    <div>
      <p>album</p>
    </div>
  );
}

export default Album;
