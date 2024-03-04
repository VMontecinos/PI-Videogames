export default (form) => {
  const errors = {};

  if (form.name.length === 0) {
    errors.name = "Please enter a valid name.";
  }

  if (form.platforms.length < 1) {
    errors.platforms = "Game should have at least one platform.";
  }

  if (!form.released) {
    errors.released = "Game should have a release date.";
  }

  if (!form.rating) {
    errors.rating = "Game should have rating.";
  }

  return errors;
};
