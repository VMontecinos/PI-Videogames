import style from "./CreateForm.module.css";
import validation from "./errors.js";
import { addGame } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export const CreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    genres: [],
    released: "",
    rating: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    genres: [],
    released: "",
    rating: "",
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const genres = useSelector((state) => state.allGenres);

  const dispatch = useDispatch();

  const handlePlatformChange = (value, checked) => {
    const updatedPlatforms = checked
      ? [...formData.platforms, value]
      : formData.platforms.filter((platform) => platform !== value);

    setFormData({ ...formData, platforms: updatedPlatforms });
    setErrors(validation({ ...formData, platforms: updatedPlatforms }));
  };

  const handleGenreChange = (value, checked) => {
    const updatedGenres = checked
      ? [...formData.genres, value]
      : formData.genres.filter((genre) => genre !== value);

    setFormData({ ...formData, genres: updatedGenres });
    setErrors(validation({ ...formData, genres: updatedGenres }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "platform") {
        handlePlatformChange(value, checked);
      } else if (name === "genre") {
        handleGenreChange(value, checked);
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors(validation({ ...formData, [name]: value }));
    }
  };

  const handleFocus = (e) => {
    setFocusedInput(e.target.name);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedFormData = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    };

    if (
      !trimmedFormData.name ||
      !trimmedFormData.description ||
      trimmedFormData.platforms.length === 0 ||
      !trimmedFormData.released ||
      trimmedFormData.genres.length === 0 ||
      !trimmedFormData.rating
    ) {
      window.alert("Your game is missing information.");
      return;
    } else {
      setFormData({
        name: "",
        background_image: "",
        description: "",
        platforms: [],
        genres: [],
        released: "",
        rating: "",
      });
      return dispatch(addGame(trimmedFormData));
    }
  };

  return (
    <div className={style.formWrapper}>
      <div className={style.formBackground}>
        <h1>Add a New Game</h1>
        <form onSubmit={handleSubmit}>
          <label className={style.spacing}>
            Name:
            <input
              className={`${style.textBox} ${style.spacingRight}`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p>{focusedInput === "name" && errors.name}</p>
          </label>
          <br />
          <label className={style.spacing}>
            Description:
            <input
              className={`${style.textBox} ${style.spacingRight}`}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p>{focusedInput === "description" && errors.description}</p>
          </label>
          <br />

          <label className={style.spacing}>
            Platforms:
            <br />
            {[
              "PC",
              "PlayStation 4",
              "PlayStation 5",
              "Xbox One",
              "Xbox Series X",
            ].map((platform) => (
              <div key={platform}>
                {platform}
                <input
                  className={style.spacingRight}
                  type="checkbox"
                  name="platform"
                  value={platform}
                  checked={formData.platforms.includes(platform)}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            ))}
            <p>
              {focusedInput && formData.platforms.length < 1
                ? errors.platforms
                : ""}
            </p>
          </label>
          <br />
          <label className={style.spacing}>
            Release Date:
            <input
              className={style.spacingRight}
              type="date"
              name="released"
              value={formData.released}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p>
              {focusedInput === "released" && !formData.released
                ? errors.released
                : ""}
            </p>
          </label>
          <br />
          <label className={`${style.spacing}  ${style.checkbox}`}>
            Game genres:
            {genres.map((genre) => (
              <div key={genre.id}>
                {genre.name}
                <input
                  className={style.spacingRight}
                  type="checkbox"
                  name="genre"
                  value={genre.name}
                  checked={formData.genres.includes(genre.name)}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            ))}
            <br />
            <p>
              {focusedInput &&
              focusedInput.includes("genre") &&
              formData.genres.length < 1
                ? errors.genres
                : ""}
            </p>
          </label>
          <br />
          <label className={style.spacing}>
            Rating:
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={style.spacingRight}
            >
              <option value="0">Select a rating</option>
              <option value="1">1 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="5">5 ⭐</option>
            </select>
            <p>{focusedInput === "rating" && errors.rating}</p>
          </label>
          <br />
          <label className={style.spacing}>
            Image URL:
            <input
              className={`${style.textBox} ${style.spacingRight}`}
              type="text"
              name="background_image"
              value={formData.background_image}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p>
              {focusedInput === "background_image" && errors.background_image}
            </p>
          </label>
          <br />
          <button
            type="submit"
            className={`${style.spacing} ${style.button}`}
            disabled={
              errors.name ||
              errors.description ||
              errors.platforms ||
              errors.released ||
              errors.rating ||
              errors.background_image
            }
          >
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
};
