import { allProducts } from "products/allProducts";

function toggleCart() {
  const { isShowingCart } = this.state;

  if (!isShowingCart) {
    document.body.classList.add("no-scroll");
    document.getElementById("oboe").style.top = `${window.scrollY}px`;
  } else {
    document.body.classList.remove("no-scroll");
    // new Promise((resolve) => {
    //   window.setTimeout(
    //     resolve(),
    //     300
    //   );
    // });
    window.setTimeout((document.getElementById("oboe").style.top = 0), 200);
  }

  this.setState({
    isShowingCart: !isShowingCart,
  });
}

function modifyCart(item, number) {
  const { selectedProducts } = this.state;

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
