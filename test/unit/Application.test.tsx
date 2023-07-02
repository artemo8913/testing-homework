import { it, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";

import { initStore } from "../../src/client/store";
import { Application } from "../../src/client/Application";
import { CartApi, ExampleApi } from "../../src/client/api";
import React from "react";

describe("Проверка работы приложения", () => {
  it("в наличии бургер меню", () => {
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

    const { getByTestId, container } = render(application);
    console.log(container.outerHTML);
    console.log(getByTestId("menu").outerHTML);
  });
});
