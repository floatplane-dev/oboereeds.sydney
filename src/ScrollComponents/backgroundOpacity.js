const backgroundOpacity = () => {
  const { innerHeight, scrollY } = window;
  const el = document.getElementById("background");

  if (scrollY > (innerHeight * 2) / 3) {
    el.style.opacity = 0;
  } else if (scrollY > innerHeight / 3) {
    const partial = (
      (innerHeight / 3 - (scrollY - innerHeight / 3)) /
      (innerHeight / 3)
    ).toFixed(2);
    el.style.opacity = partial;
  } else {
    el.style.opacity = 1;
  }
};
export default backgroundOpacity;
