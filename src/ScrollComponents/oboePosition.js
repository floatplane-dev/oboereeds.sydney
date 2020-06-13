const oboePosition = () => {
  const { innerHeight, scrollY } = window;
  const { offsetTop, offsetHeight } = document.getElementById("the-oboe");
  const el = document.getElementById("oboe");

  if (scrollY > offsetTop + offsetHeight + innerHeight) {
    console.log("beyond the oboe");
    el.style.position = "absolute";
    el.style.top = `${offsetTop + offsetHeight - innerHeight}px`;
  } else if (scrollY > innerHeight) {
    el.style.position = "fixed";
    el.style.top = `0px`;
  } else {
    el.style.position = "absolute";
    el.style.top = `${innerHeight}px`;
  }
};

const calculateCameraOffset = () => {
  const el = document.getElementById("the-oboe");
  if (!el) return 0;

  const { innerHeight, innerWidth, scrollY } = window;
  const { offsetTop, offsetHeight } = el;

  let offset;
  if (scrollY > offsetTop + offsetHeight + innerHeight) {
    // scrollPosition is below the CanvasBackground
    offset = offsetHeight;
  } else if (scrollY > offsetTop - innerHeight) {
    // scrollPosition within the CanvasBackground border
    offset = (scrollY - offsetTop + innerHeight) / (innerWidth / 25);
  } else {
    // scrollPosition is above the CanvasBackground
    offset = 0;
  }

  return offset;
};
export { oboePosition, calculateCameraOffset };
