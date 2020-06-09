const oboePosition = (height, scroll) => {
  const el = document.getElementById("oboe");

  if (scroll > height * 3) {
    el.style.position = "absolute";
  } else if (scroll > height) {
    el.style.position = "fixed";
  } else {
    el.style.position = "absolute";
  }
};
export default oboePosition;
