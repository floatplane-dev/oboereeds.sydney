function createModal(e, src, caption) {
  const [modalNode, figureNode, figcaptionNode, captionTextNode, imageNode] = [
    document.createElement("div"),
    document.createElement("figure"),
    document.createElement("figcaption"),
    document.createTextNode(caption),
    document.createElement("img"),
  ];

  modalNode.setAttribute("id", "modal-wrapper");
  imageNode.src = src;

  figureNode.addEventListener("click", (e) => e.stopPropagation());
  modalNode.addEventListener("click", (e) => e.target.remove());

  figcaptionNode.appendChild(captionTextNode);
  figureNode.appendChild(figcaptionNode);
  figureNode.appendChild(imageNode);
  modalNode.appendChild(figureNode);
  document.body.appendChild(modalNode);
}

function addClickListenersToImages() {
  const nodeList = document.querySelectorAll(".product-images img");
  nodeList.forEach((imgNode) => {
    imgNode.addEventListener("click", (e) =>
      createModal(
        e,
        imgNode.getAttribute("src"),
        imgNode.getAttribute("data-caption")
      )
    );
  });
}
