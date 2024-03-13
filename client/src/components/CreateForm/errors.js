export default (form) => {
  const errors = {};

  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  const isUrl = (str) => {
    return urlRegex.test(str);
  };

  if (form.name.length === 0) {
    errors.name = "Please enter a valid name.";
  }

  if (form.name.length > 20) {
    errors.name = "That name is too long.";
  }

  if (form.description.length < 10) {
    errors.description = "Pleae enter a longer description.";
  }

  if (form.description.length > 650) {
    errors.description = "That description is too long.";
  }

  if (form.platforms.length === 0) {
    errors.platforms = "Game must have at least one platform.";
  }

  if (form.genres.length === 0) {
    errors.genres = "Game must have at least one genre.";
  }

  if (!form.released) {
    errors.released = "Game must have a release date.";
  }

  if (!form.rating) {
    errors.rating = "Game must have rating.";
  }

  if (!isUrl(form.background_image)) {
    errors.background_image = "Image must be a URL.";
  }

  return errors;
};
