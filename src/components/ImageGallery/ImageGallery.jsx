import React, { memo } from "react";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ gallery, handleImgClick }) => {
  const elements = gallery.map(({ id, ...props }) => {
    return (
      <ImageGalleryItem key={id} {...props} handleImgClick={handleImgClick} />
    );
  });
  return <ul className={s.ImageGallery}>{elements}</ul>;
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  handleImgClick: PropTypes.func.isRequired,
};

export default memo(ImageGallery);
