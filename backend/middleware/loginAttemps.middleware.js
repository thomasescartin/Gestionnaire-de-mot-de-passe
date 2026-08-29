exports.loginAttemps = (attemps) => {
  if (attemps === 10) {
    return 24 * 60 * 60 * 1000;
  }

  if (attemps === 9) {
    return 15 * 60 * 60 * 1000;
  }

  if (attemps === 8) {
    return 8 * 60 * 60 * 1000;
  }

  if (attemps === 7) {
    return 4 * 60 * 60 * 1000;
  }

  if (attemps === 6) {
    return 2 * 60 * 60 * 1000;
  }

  if (attemps === 5) {
    return 60 * 60 * 1000;
  }

  if (attemps === 4) {
    return 30 * 60 * 1000;
  }

  if (attemps === 3) {
    return 10 * 60 * 1000;
  }

  if (attemps === 2) {
    return 5 * 60 * 1000;
  }

  if (attemps === 1) {
    return 2 * 60 * 1000;
  }

  return 0;
};
