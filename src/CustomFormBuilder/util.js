export const isEmptyNullUndefined = (value) => {
    if (
      value === undefined ||
      value === '' ||
      (value && value.toString().trim() === '') ||
      value === null
    ) {
      return true;
    } else {
      return false;
    }
  };