const lettersandnumbers =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const randomId = () => {
  return Array(30)
    .fill(null)
    .map(
      () =>
        lettersandnumbers[Math.floor(Math.random() * lettersandnumbers.length)]
    )
    .join("");
};

export { randomId };
