import style from "./CreateForm.module.css";
// import axios from "axios";
import { addGame } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const CreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: "",
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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      background_image: "",
      description: "",
      platforms: "",
      released: "",
      rating: "",
    });
    console.log("Form Submitted with data:", formData);
    return dispatch(addGame(formData));
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
          />
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
          />
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
              />
            </div>
          ))}
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
          />
        </label>
        <br />
        <label className={style.spacing}>
          Rating:
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className={style.spacingRight}
          >
            <option value="0">Select a rating</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </select>
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
          />
        </label>
        <br />
        <button type="submit" className={style.spacing}>
          Add Game
        </button>
      </form>
    </div>
  );
};
