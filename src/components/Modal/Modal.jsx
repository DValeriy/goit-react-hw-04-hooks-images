import s from "./Modal.module.css";

import PropTypes from "prop-types";
import { useEffect } from "react";

const Modal = ({ handleModalClose, imgUrl }) => {
  const cbOnClick = (e) => {
    if (e.currentTarget === e.target) handleModalClose();
  };

  const cbOnKeyDown = (event) => {
    if (event.code === "Escape") handleModalClose();
  };
  useEffect(() => {
    window.addEventListener("keydown", cbOnKeyDown);
    return () => {
      window.removeEventListener("keydown", cbOnKeyDown);
    };
  }, [cbOnKeyDown]);

  return (
    <div className={s.Overlay} onClick={cbOnClick} onKeyDown={cbOnKeyDown}>
      <div className={s.Modal}>
        <img src={imgUrl} alt={imgUrl} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

export default Modal;
