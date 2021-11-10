import React from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL, handleImgClick }) => {
  const cbOnClick = (e) => handleImgClick(largeImageURL);
  console.log("webformatURL");
  return (
    <li className={s.ImageGalleryItem} onClick={cbOnClick}>
      <img
        src={webformatURL}
        alt={largeImageURL}
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleImgClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
