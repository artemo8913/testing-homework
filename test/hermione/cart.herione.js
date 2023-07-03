const { assert } = require("chai");

describe("Корзина", function () {
  // @ts-ignore
  it("добавление товара и его удаление", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");
    const title = await browser.$("h1").getText();
    assert.equal(title, "Catalog");
    await browser.$(".card-link").click();
    await delay(1000);
    await browser.$(".ProductDetails-AddToCart").click();
    await browser.url("http://localhost:3000/hw/store/cart");
    await browser.assertView("fullfield_cart", "body", {
      ignoreElements: [".Cart-Table"],
    });
    await delay(1000);
    await browser.$(".Cart-Clear").click();
    await delay(1000);
    await browser.assertView("clear_cart", "body");
  });
  // @ts-ignore
  it("добавление товара и оформление заказа", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");
    const title = await browser.$("h1").getText();
    assert.equal(title, "Catalog");
    await browser.$(".card-link").click();
    await delay(1000);
    await browser.assertView("addToCart_btn", ".ProductDetails-AddToCart");
    await browser.$(".ProductDetails-AddToCart").click();
    await browser.url("http://localhost:3000/hw/store/cart");
    await browser.assertView("fullfield_cart", "body", {
      ignoreElements: [".Cart-Table"],
    });
    await browser.$(".Form-Field_type_name").setValue("name");
    await browser.$(".Form-Field_type_phone").setValue("+79999999999");
    await browser.$(".Form-Field_type_address").setValue("adress");
    await delay(1000);
    await browser.$(".Form-Submit").click();
    await delay(1000);
    await browser.assertView("sucess_order", "body");
  });
});

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
