import axios from "axios";
import Notiflix from "notiflix";

export const getImgRequest = async (querry = "cat", page = 1) => {
  axios.defaults.baseURL = "https://pixabay.com/api/";
  const searchParams = {
    per_page: 12,
    orientation: "horizontal",
    image_type: "photo",
    key: process.env.REACT_APP_API_KEY,
    page: page,
    q: querry,
  };
  try {
    const response = await axios(`?`, { params: { ...searchParams } });
    const gallery = response.data.hits;
    const galleryTotal = response.data.total;
    return { gallery, galleryTotal };
  } catch (error) {
    Notiflix.Notify.failure(error);
    return false;
  }
};
