import { useState, useEffect, useContext } from "react";
import { ThreeDxContext } from "./_context3dx";
export const UseFetchAlbumDetails = (albumID) => {
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
  const [albumDetails, setAlbumDetails] = useState({});

  useEffect(() => {
    console.log("album details fetch");
    fetchAlbumDetails();
  }, [render, setRender]);

  const fetchAlbumDetails = async () => {
    try {
      const primalData = await fetch(`/albums/a/d/${albumID}`);
      const data = await primalData.json();
      setAlbumDetails(data.Album);
    } catch (e) {
      console.log(e);
    }
  };

  return albumDetails;
};

// import React, { useState, createContext, useEffect } from "react";

// export const AlbumDetailsContext = createContext();

// export function AlbumDetailProvider(props) {
//   const [albumDetailsx, setAlbumDetails] = useState({});
//   const [render, setRender] = useState("");
//   const [albumID, setAlbumID] = useState("");

//   useEffect(() => {
//     console.log("album details fetch");
//     fetchAlbumDetails();
//   }, [setAlbumID]);

//   console.log("album id", albumID);

//   const fetchAlbumDetails = async (albumID) => {
//     try {
//       const primalData = await fetch(`/albums/a/d/${albumID}`);
//       const data = await primalData.json();
//       setAlbumDetails(data.Album);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <AlbumDetailsContext.Provider
//       value={[
//         albumDetailsx,
//         setAlbumDetails,
//         render,
//         setRender,
//         albumID,
//         setAlbumID,
//       ]}
//     >
//       {props.children}
//     </AlbumDetailsContext.Provider>
//   );
// }
