const Categories = require("./modules/categoriesController.js");
const Products = require("./modules/productController.js");
const Basket = require("./modules/basketController.js");

function run() {
  var CategoriesName = ["Smart phone", "Laptop", "Desktop computer"];
  var CategoriesImg = ["./images/mobile_categories.png", "./images/leptop_categories.jpg", "./images/pc_categories.png"];
  CategoriesName.forEach(function (value, index, arr) {
    Categories.add(value, CategoriesImg[index], function (err, itm) { });
  });

  for (var i = 0; i < 20; i++) {
    Products.add("TEST MOBILE", "SAMSUNG", i + 1, "TEST PRODUCT MOBILE PHONE",
      "TEST PRODUCT MOBILE PHONE", i*100 + 100, "Smart phone", ["./images/test.jpg", "./images/mob2.jpg", "./images/mob3.jpeg"], () => { });
  }

  for (var i = 0; i < 20; i++) {
    Products.add("TEST Laptop", "Acer", i + 1, "TEST PRODUCT Laptop",
      "TEST PRODUCT Laptop", i*100 + 100, "Laptop", ["./images/laptop.jpg", "./images/laptop.jpg", "./images/laptop.jpg"], () => { });
  }

  for (var i = 0; i < 20; i++) {
    Products.add("TEST PC", "HP", i + 1, "TEST PRODUCT PC",
      "TEST PRODUCT Desktop computer", i*100 + 100, "Desktop computer", ["./images/PC.jpg", "./images/PC.jpg", "./images/PC.jpg"], () => { });
  }
}

run();