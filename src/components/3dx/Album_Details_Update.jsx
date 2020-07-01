// @import ::
import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

// @context ::
import { ThreeDxContext } from "./_context3dx";

// @material-ui ::
import { FormControl, FormHelperText, TextField } from "@material-ui/core/";

function AlbumDetailsUpdate(props) {
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
  const { name, albumID } = props;

  const initialValues = {
    [name]: "",
  };
  const onSubmit = (values, { resetForm }) => {
    const {
      artistName,
      coArtistNames,
      categoryName,
      tagNamex,
      albumName,
      albumDetails,
    } = values;
    if (artistName) {
      const url = `/albums/a/d/${albumID}/update`;
      const payload = { artistName: artistName };
      postUpdateAlbumDetails(url, payload);
    } else if (coArtistNames) {
      const url = `/albums/a/${albumID}/addcoartist`;
      const payload = { addcoartist: coArtistNames };
      postUpdateAlbumDetails(url, payload);
    } else if (categoryName) {
      const url = `/albums/a/${albumID}/addcategory`;
      const payload = { categoryname: categoryName };
      postUpdateAlbumDetails(url, payload);
    } else if (tagNamex) {
      const url = `/albums/a/${albumID}/addtag`;
      const payload = { tagname: tagNamex };
      postUpdateAlbumDetails(url, payload);
    } else if (albumDetails) {
      const url = `/albums/a/d/${albumID}/update`;
      const payload = { albumDetails: albumDetails };
      postUpdateAlbumDetails(url, payload);
    } else if (albumName) {
      const url = `/albums/a/d/${albumID}/update`;
      const payload = { albumName: albumName };
      postUpdateAlbumDetails(url, payload);
    }
    resetForm({ values: "" });
  };
  const postUpdateAlbumDetails = async (url, payload) => {
    try {
      const res = await axios.post(url, payload);
      setRender(res);
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = Yup.object({
    [name]: Yup.string().min(3, "too short").max(30, "too big"),
  });

  console.log("initaila values", initialValues);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <Form>
            <FormControl error={touched[name] && Boolean(errors[name])}>
              <TextField
                id={name}
                name={name}
                className=""
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormHelperText id="component-error-text">
                {touched[name] ? errors[name] : ""}
              </FormHelperText>
            </FormControl>
          </Form>
        );
      }}
    </Formik>
  );
}
export default AlbumDetailsUpdate;
