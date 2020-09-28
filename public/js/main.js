function toggleExpandSection(className) {
  const element = document.querySelector(`div.${className}`);
  element.classList.toggle("expanded");
  console.log(`toggled expanded state on element: section.${className}`);
}
