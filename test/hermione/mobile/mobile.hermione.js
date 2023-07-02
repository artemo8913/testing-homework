const { assert } = require("chai");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

describe("Гамбургер меню", async function () {
  it("Переход по страницам", async function () {
    await this.browser.url("http://localhost:3000/hw/store/");

    const title = await this.browser.$(".Application-Brand.navbar-brand").getText();
    assert.equal(title, "Example store");

    await delay(1000);
    await this.browser.assertView("main_page_menu_closed", ".navbar");
    // Клик по гамбургеру на главной странице
    await this.browser.$(".Application-Toggler.navbar-toggler").click();
    await delay(1000);
    await this.browser.assertView("main_page_menu_opened", ".navbar");

    // Клик по ссылке страницы доставки
    await this.browser.$("[href $= 'hw/store/delivery']").click();
    await delay(1000);
    await this.browser.assertView("delivery_page_menu_closed", ".navbar");
    // Клик по гамбургеру на странице доставки
    await this.browser.$(".Application-Toggler.navbar-toggler").click();
    await delay(1000);
    await this.browser.assertView("delivery_page_menu_opened", ".navbar");

    // Клик по ссылке страницы каталога
    await this.browser.$("[href $= 'hw/store/catalog']").click();
    await delay(1000);
    await this.browser.assertView("catalog_page_menu_closed", ".navbar");
    // Клик по гамбургеру на странице каталога
    await this.browser.$(".Application-Toggler.navbar-toggler").click();
    await delay(1000);
    await this.browser.assertView("catalog_page_menu_opened", ".navbar");

    // Клик по ссылке страницы контактнов
    await this.browser.$("[href $= 'hw/store/contacts']").click();
    await delay(1000);
    await this.browser.assertView("contacts_page_menu_closed", ".navbar");
    // Клик по гамбургеру на странице каталога
    await this.browser.$(".Application-Toggler.navbar-toggler").click();
    await delay(1000);
    await this.browser.assertView("contacts_page_menu_opened", ".navbar");

    // Клик по ссылке страницы cart
    await this.browser.$("[href $= 'hw/store/cart']").click();
    await delay(1000);
    await this.browser.assertView("cart_page_menu_closed", ".navbar");
    // Клик по гамбургеру на странице cart
    await this.browser.$(".Application-Toggler.navbar-toggler").click();
    await delay(1000);
    await this.browser.assertView("cart_page_menu_opened", ".navbar");
  });
});
