import s from "./App.module.css";

import { Component } from "react";

import Searchbar from "../Searchbar/";
import ImageGallery from "../ImageGallery/";
import Loader from "../Loader";
import Modal from "../Modal";
import Button from "../Button";
import { getImgRequest } from "../../services/api";

class App extends Component {
  state = {
    gallery: [],
    isShowModal: false,
    isShowLoader: false,
    querry: "",
    error: false,
    page: 1,
    imgUrl: "",
  };
  onSubmit = ({ querry }) => {
    this.setState({ querry });
  };
  togglePreloader = () => {
    this.setState((prev) => ({ isShowLoader: !prev.isShowLoader }));
  };

  handleLoadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }));
  };
  handleImgClick = (largeImageURL) => {
    this.setState({ isShowModal: !this.state.isShowModal });
    this.setState({ imgUrl: largeImageURL });
  };
  handleModalClose = () => {
    this.setState({ isShowModal: !this.state.isShowModal });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { querry, page } = this.state;
    if (prevState.querry !== querry) {
      this.togglePreloader();
      this.setState({ page: 1 });
      const gallery = await getImgRequest(querry, page);
      this.setState({ gallery: [...gallery] });
      this.togglePreloader();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    if (prevState.page !== page) {
      this.togglePreloader();
      const gallery = await getImgRequest(querry, page);
      this.setState((prev) => ({ gallery: [...prev.gallery, ...gallery] }));
      this.togglePreloader();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    if (prevState.querry !== querry && prevState.page !== page) {
      this.togglePreloader();
      const gallery = await getImgRequest(querry, page);
      this.setState({ gallery: [...gallery] });
      this.togglePreloader();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  render() {
    const { gallery, imgUrl, isShowModal, isShowLoader } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery gallery={gallery} handleImgClick={this.handleImgClick} />
        {isShowLoader && <Loader />}
        {!isShowLoader && !!gallery.length && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {isShowModal && (
          <Modal imgUrl={imgUrl} handleModalClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}

export default App;
