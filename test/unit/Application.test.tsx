import { it, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";

import events from "@testing-library/user-event";
import { initStore } from "../../src/client/store";
import { Application } from "../../src/client/Application";
import { CartApi, ExampleApi } from "../../src/client/api";
import React from "react";

describe("Проверка работы приложения", () => {
  it("ссылки в шапке в наличии", async () => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    const { container } = render(application);

    const catalogLink = container.querySelector("[href $='/catalog']");
    const deliveryLink = container.querySelector("[href $='/delivery']");
    const contactsLink = container.querySelector("[href $='/contacts']");
    const cartLink = container.querySelector("[href $='/cart']");
    expect(catalogLink).not.toBe(null);
    expect(deliveryLink).not.toBe(null);
    expect(contactsLink).not.toBe(null);
    expect(cartLink).not.toBe(null);
  });
});
