import s from "./App.module.css";

import { Component } from "react";
import Notiflix from "notiflix";

import Searchbar from "../Searchbar/";
import ImageGallery from "../ImageGallery/";
import Loader from "../Loader";
import Modal from "../Modal";
import Button from "../Button";
import { getImgRequest } from "../../services/api";

class App extends Component {
  state = {
    galerySize: 0,
    galleryImg: [],
    isShowModal: false,
    isShowLoader: false,
    querry: "",
    // error: false,
    page: 1,
    imgUrl: "",
  };
  onSubmit = ({ querry }) => {
    this.setState({ querry, page: 1 });
  };
  togglePreloader = () => {
    this.setState((prev) => ({ isShowLoader: !prev.isShowLoader }));
  };

  handleBtnLoadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }));
  };
  handleImgClick = (largeImageURL) => {
    this.setState({
      isShowModal: !this.state.isShowModal,
      imgUrl: largeImageURL,
    });
  };
  handleModalClose = () => {
    this.setState({ isShowModal: !this.state.isShowModal });
  };
  loadImg = async () => {
    const { querry, page, galleryImg } = this.state;

    this.togglePreloader();

    const { gallery, galleryTotal } = await getImgRequest(querry, page);
    if (gallery && gallery.length) {
      this.setState((prev) => ({
        galerySize: galleryTotal,
        galleryImg: [...prev.galleryImg, ...gallery],
      }));
      if (page !== 1)
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    } else if (gallery && gallery.length === 0) {
      Notiflix.Notify.warning("No result for your request!");
      this.setState({ querry: "", page: 1 });
    }
    this.togglePreloader();
  };

  componentDidUpdate(prevProps, prevState) {
    const { querry, page, galleryImg } = this.state;
    if (querry && prevState.querry !== querry) {
      this.setState({ galleryImg: [], page: 1 });
      this.loadImg();
    }
    if (querry && prevState.page !== page && page !== 1) {
      this.loadImg();
      return;
    }
  }

  render() {
    const { galleryImg, imgUrl, isShowModal, isShowLoader, galerySize } =
      this.state;
    const difTotalandGallery = galerySize - galleryImg.length;
    console.log("ok");
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          gallery={galleryImg}
          handleImgClick={this.handleImgClick}
        />
        {isShowLoader && <Loader />}
        {!isShowLoader && !!galleryImg.length && difTotalandGallery && (
          <Button handleLoadMore={this.handleBtnLoadMore} />
        )}
        {isShowModal && (
          <Modal imgUrl={imgUrl} handleModalClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}

export default App;
