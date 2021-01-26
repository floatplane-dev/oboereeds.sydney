import { allProducts } from "../products/allProducts";

function toggleCart() {
  if (!document.getElementById("app").classList.contains("cart-active")) {

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.getElementById("app").appendChild(overlay);

    document.getElementById("app").classList.add("scrolling-disabled", "cart-active");

    overlay.addEventListener('click', () => {
      document.getElementById("app").classList.remove("scrolling-disabled", "cart-active");
      overlay.remove();
    });

  } else {
    document.getElementById("app").classList.remove("scrolling-disabled", "cart-active");
    document.querySelector('.overlay').remove();
  }

}

function modifyCart(item, number) {
  console.log('modifyCart, params:', {item, number});

  const { selectedProducts } = this.state;

  if (!item) {
    window.alert("no item found!");
    console.log({ item, number, selectedProducts });
    return;
  }

  const oldQuantity = selectedProducts[item].quantity;

  let newProductsState = Object.assign({}, selectedProducts);
  newProductsState[item].quantity = oldQuantity + number;

  window.localStorage.setItem(
    "selectedProducts",
    JSON.stringify(newProductsState)
  );

  this.setState({
    selectedProducts: newProductsState,
  });
}

function resetCart() {
  const emptyCart = allProducts;
  Object.keys(allProducts).forEach(
    (product) => (emptyCart[product].quantity = 0)
  );

  window.localStorage.setItem("selectedProducts", JSON.stringify(emptyCart));
  this.setState({ selectedProducts: emptyCart });
}

function checkLocalstorage() {
  let storedProducts =
    JSON.parse(window.localStorage.getItem("selectedProducts")) || {};

  // safely resets your storedProducts if there are stored ones which aren't included in allProducts
  if (
    Object.keys(storedProducts).some(
      (key) => !Object.keys(allProducts).find((innerKey) => innerKey === key)
    )
  ) {
    storedProducts = {};
  }

  let selectedProducts = Object.assign({}, allProducts);

  Object.keys(storedProducts).forEach((key) => {
    selectedProducts[key].quantity = storedProducts[key].quantity;
  });

  return selectedProducts;
}

export { toggleCart, modifyCart, resetCart, checkLocalstorage };
