import PreLoader from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <PreLoader
      className={s.PreLoader}
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
};
export default Loader;
