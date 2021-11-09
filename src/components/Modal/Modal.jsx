import s from "./Modal.module.css";

import PropTypes from "prop-types";
import { PureComponent } from "react";

class Modal extends PureComponent {
  state = {};
  cbOnClick = (e) => {
    const { handleModalClose } = this.props;
    handleModalClose();
  };
  cbOnKeyDown = (event) => {
    const { handleModalClose } = this.props;
    // if (event.keyCode === 27) handleModalClose();
    if (event.code === "Escape") handleModalClose();
  };
  componentDidMount() {
    window.addEventListener("keydown", this.cbOnKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.cbOnKeyDown);
  }
  render() {
    const { imgUrl } = this.props;
    return (
      <div
        className={s.Overlay}
        onClick={this.cbOnClick}
        onKeyDown={this.cbOnKeyDown}
      >
        <div className={s.Modal}>
          <img src={imgUrl} alt={imgUrl} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
export default Modal;
