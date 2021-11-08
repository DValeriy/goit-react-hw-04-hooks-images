import axios from "axios";

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
  const response = await axios(`?`, { params: { ...searchParams } });
  const gallery = response.data.hits;
  return gallery;
};
