import style from "./CreateForm.module.css";
import validation from "./errors.js";
import { addGame } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export const CreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedPlatforms = checked
        ? [...formData.platforms, value]
        : formData.platforms.filter((platform) => platform !== value);

      setFormData({ ...formData, platforms: updatedPlatforms });
      console.log(formData.platforms.length);
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors(validation(formData));
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
        released: "",
        rating: "",
      });
      return dispatch(addGame(trimmedFormData));
    }
  };

  return (
    <div className={style.formWrapper}>
      <h1>Add a New Game</h1>
      <form onSubmit={handleSubmit}>
        <label className={style.spacing}>
          Name:
          <input
            className={style.spacingRight}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleChange}
          />
          <p>{errors.name}</p>
        </label>
        <br />
        <label className={style.spacing}>
          Description:
          <input
            className={style.spacingRight}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onFocus={handleChange}
          />
          <p>{errors.description}</p>
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
                onFocus={handleChange}
              />
            </div>
          ))}
          <p>{errors.platforms}</p>
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
            onFocus={handleChange}
          />
          <p>{errors.released}</p>
        </label>
        <br />
        <label className={style.spacing}>
          Rating:
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            onFocus={handleChange}
            className={style.spacingRight}
          >
            <option value="0">Select a rating</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </select>
          <p>{errors.rating}</p>
        </label>
        <br />
        <label className={style.spacing}>
          Image URL:
          <input
            className={style.spacingRight}
            type="text"
            name="background_image"
            value={formData.background_image}
            onChange={handleChange}
            onFocus={handleChange}
          />
          <p>{errors.background_image}</p>
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
  );
};
