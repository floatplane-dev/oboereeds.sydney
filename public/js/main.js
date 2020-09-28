function toggleExpandSection(className) {
  const element = document.querySelector(`div.${className}`);
  element.classList.toggle("expanded");
  console.log(`toggled expanded state on element: section.${className}`);
}

function disableScrollingOnBody() {
  document.body.classList.add("scrolling-disabled");
}

function toggleScrollingOnBody() {
  document.body.classList.toggle("scrolling-disabled");
}
