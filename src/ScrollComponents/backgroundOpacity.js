const backgroundOpacity = (height, scroll) => {
  const el = document.getElementById("background");

  if (scroll > (height * 2) / 3) {
    el.style.opacity = 0;
  } else if (scroll > height / 3) {
    const partial = (
      (height / 3 - (scroll - height / 3)) /
      (height / 3)
    ).toFixed(2);
    el.style.opacity = partial;
  } else {
    el.style.opacity = 1;
  }
};
export default backgroundOpacity;
