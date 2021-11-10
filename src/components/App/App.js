import s from "./App.module.css";

import { useEffect, useState } from "react";
import Notiflix from "notiflix";

import Searchbar from "../Searchbar/";
import ImageGallery from "../ImageGallery/";
import Loader from "../Loader";
import Modal from "../Modal";
import Button from "../Button";
import { getImgRequest } from "../../services/api";

const App = () => {
  const [galerySize, setGalerySize] = useState(0);
  const [galleryImg, setGalleryImg] = useState([]);
  const [querry, setQuerry] = useState("");
  const [page, setPage] = useState(1);
  const [imgUrl, setImgUrl] = useState("");
  const [isShowLoader, setIsShowLoader] = useState(false);
  const onSubmit = ({ querry }) => {
    setQuerry(querry);
    setGalleryImg([]);
    setPage(1);
  };

  const handleBtnLoadMore = () => {
    setPage(page + 1);
  };
  const handleImgClick = (largeImageURL) => {
    setImgUrl(largeImageURL);
  };
  const handleModalClose = () => {
    setImgUrl("");
  };

  const loadImg = async () => {
    setIsShowLoader(true);
    try {
      const { gallery, galleryTotal } = await getImgRequest(querry, page);

      if (gallery.length) {
        setGalerySize(galleryTotal);
        setGalleryImg([...galleryImg, ...gallery]);
        setIsShowLoader(false);
        if (page !== 1)
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
      } else if (gallery.length === 0) {
        Notiflix.Notify.warning("No result for your request!");
        setQuerry("");
        setPage(1);
        setIsShowLoader(false);
      }
    } catch (error) {
      // console.dir(error);
      Notiflix.Notify.failure(error.message);
      setIsShowLoader(false);
    }
  };
  useEffect(() => {
    if (!querry) return;
    loadImg();
  }, [querry, page]);

  const difTotalandGallery = galerySize - galleryImg.length;
  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmit} />
      {!!galleryImg.length && (
        <ImageGallery gallery={galleryImg} handleImgClick={handleImgClick} />
      )}
      {isShowLoader && <Loader />}
      {!isShowLoader && !!galleryImg.length && difTotalandGallery && (
        <Button handleLoadMore={handleBtnLoadMore} />
      )}
      {imgUrl && <Modal imgUrl={imgUrl} handleModalClose={handleModalClose} />}
    </div>
  );
};

export default App;
