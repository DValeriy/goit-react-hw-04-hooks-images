import s from "./Button.module.css";

import React from "react";
import PropTypes from "prop-types";

const Button = ({ handleLoadMore }) => {
  const cbOnClick = () => {
    handleLoadMore();
  };
  return (
    <button onClick={cbOnClick} className={s.Button}>
      Load More
    </button>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
