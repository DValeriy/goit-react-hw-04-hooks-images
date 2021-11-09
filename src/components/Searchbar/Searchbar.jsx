import s from "./Searchbar.module.css";

import { useState } from "react";
import PropTypes from "prop-types";

const Searchbar = ({ onSubmit }) => {
  const [querry, setQuerry] = useState("");

  const handleChange = ({ target: { value } }) => {
    setQuerry(value);
  };
  const cbOnSubmit = (e) => {
    e.preventDefault();
    onSubmit({ querry });
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={cbOnSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={querry}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
