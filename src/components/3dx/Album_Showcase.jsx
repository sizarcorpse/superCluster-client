// @import ::
import React, { useState, useEffect, useCallback, useContext } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

// @context ::
import { ThreeDxContext } from "./_context3dx";

//@material-ui ::
import { Box } from "@material-ui/core";

function AlbumShowcase({ match, albumID }) {
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

  const [albumPhotos, setAlbumPhotos] = useState({});
  const { message, photos, totalPhotos } = albumPhotos;
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // @handle :: fetch all photos form an album
  useEffect(() => {
    console.log("album photo fetch");
    fetchAlbumFetch();
  }, [render, setRender]);

  const fetchAlbumFetch = async () => {
    try {
      const primalData = await fetch(`/albums/a/${albumID}`);
      const data = await primalData.json();
      setAlbumPhotos(data);
    } catch (e) {
      console.log(e);
    }
  };

  // @handle :: lightbox
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  // @handle :: set photos to usealbe formet for react-photo-gallery
  const photosz = [];
  if (photos) {
    photos.map((photo) => {
      let cons = {
        src: `http://127.0.0.1:5000/photos/p/${photo.filename}`,
        width: 4,
        height: 4,
        key: photo._id,
      };
      photosz.push(cons);
    });
  }

  return (
    <Box mt={1} justifyContent="center">
      {!photos ? (
        "loading...."
      ) : (
        <Box>
          <Gallery photos={photosz} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  allowFullscreen="false"
                  isFullscreen="false"
                  autoSize={false}
                  preventScroll="false"
                  currentIndex={currentImage}
                  views={photosz.map((x) => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: (
                      <button
                        onClick={() => {
                          console.log(x.key);
                        }}
                      >
                        i mama
                      </button>
                    ),
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </Box>
      )}
    </Box>
  );
}

export default AlbumShowcase;
