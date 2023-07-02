const { assert } = require("chai");

describe("Запуск страниц сайта магазина", async function () {
  it("Запуск главной страницы", async function () {
    await this.browser.url("http://localhost:3000/hw/store/");
    await this.browser.assertView("plain", "body");

    const title = await this.browser.$(".Application-Brand.navbar-brand").getText();
    assert.equal(title, "Example store");
  });
  it("Запуск страницы контактнов", async function () {
    await this.browser.url("http://localhost:3000/hw/store/contacts");
    await this.browser.assertView("plain", "body");

    const title = await this.browser.$("h1").getText();
    assert.equal(title, "Contacts");
  });
  it("Запуск страницы информации о доставке", async function () {
    await this.browser.url("http://localhost:3000/hw/store/delivery");
    await this.browser.assertView("plain", "body", { ignoreElements: [".Image.w-25.mb-4"] });

    const title = await this.browser.$("h1").getText();
    assert.equal(title, "Delivery");
  });
  it("Запуск пустой страницы корзины", async function () {
    await this.browser.url("http://localhost:3000/hw/store/cart");
    await this.browser.assertView("plain", "body");

    const title = await this.browser.$("h1").getText();
    assert.equal(title, "Shopping cart");
  });
  // Если нет товаров в магазине, то это фатальная ошибка
  it("Запуск каталога товаров. Проверка по наличию карточки товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    await this.browser.assertView("plain", "[data-testid='0']", {
      ignoreElements: ["Image.card-img-top", ".ProductItem-Name.card-title", ".ProductItem-Price.card-text"],
    });

    const title = await this.browser.$("h1").getText();
    assert.equal(title, "Catalog");
  });
});
