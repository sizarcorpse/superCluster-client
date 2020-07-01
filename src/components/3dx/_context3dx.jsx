import React, { useState, createContext, useEffect } from "react";

export const ThreeDxContext = createContext();

export function ThreeDxProvider(props) {
  const [threedxAlbums, setThreedxAlbums] = useState([]);
  const [filter3dxAlbums, setFilter3dxAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [render, setRender] = useState("render file");

  useEffect(() => {
    console.log("3dx all albums fecthed");
    fetch3dxAlbums();
  }, [setPage, setThreedxAlbums]);

  const fetch3dxAlbums = async () => {
    try {
      const primalData = await fetch(`/albums/3dx?page=${page}`);
      const data = await primalData.json();
      setThreedxAlbums(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("3dx filter category albums fecthed");
    fetchFilter3dxAlbums();
  }, [page, setPage, setFilter3dxAlbums, category]);

  const fetchFilter3dxAlbums = async () => {
    try {
      const primalData = await fetch(
        `/albums/3dx/q?cat=${category}&page=${page}`
      );
      const data = await primalData.json();
      setFilter3dxAlbums(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThreeDxContext.Provider
      value={[
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
      ]}
    >
      {props.children}
    </ThreeDxContext.Provider>
  );
}
