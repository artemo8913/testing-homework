import React from "react";
import { it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";

import { addToCart, initStore, clearCart } from "../../src/client/store";
import { Product } from "../../src/common/types";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Cart } from "../../src/client/pages/Cart";

describe("Проверка работы store", () => {
  const basename = "/hw/store";
  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  it("добавить в корзину", () => {
    const productInfo: Product = {
      id: 1,
      name: "name",
      price: 100,
      color: "red",
      description: "description",
      material: "material",
    };
    const cartItem = { name: "name", price: 100, count: 1 };
    const result = { "1": cartItem };
    store.dispatch(addToCart(productInfo));
    expect(store.getState().cart).toEqual(result);
  });
  it("страница магазина с товаром", async () => {
    const application = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </MemoryRouter>
    );
    const { container } = render(application);
    const checkoutTitleHtml = container.querySelector("h2");
    const cartItemPriceHtml = container.querySelector(".Cart-Total");
    const totalPriceHtml = container.querySelector(".Cart-OrderPrice");
    expect(checkoutTitleHtml).not.toBe(null);
    expect(cartItemPriceHtml?.innerHTML).toBe("$100");
    expect(totalPriceHtml?.innerHTML).toBe("$100");
    screen.logTestingPlaygroundURL();
  });
  it("очистить корзину", () => {
    store.dispatch(clearCart());
    expect(store.getState().cart).toEqual({});
  });
  it("пустая корзина после удаления товара", () => {
    const application = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </MemoryRouter>
    );
    const { container } = render(application);
    const checkoutTitleHtml = container.querySelector("h2");
    const cartItemPriceHtml = container.querySelector(".Cart-Total");
    const totalPriceHtml = container.querySelector(".Cart-OrderPrice");
    expect(checkoutTitleHtml).toBe(null);
    expect(cartItemPriceHtml).toBe(null);
    expect(totalPriceHtml).toBe(null);
  });
});
