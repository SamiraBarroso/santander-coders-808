// - Voltando ao cardápio/catálogo, vocês devem extrair um array de objetos a partir de um arquivo JSON contendo pelo menos 20 entradas;
import saveDataOnLocalStorage from "./utils/saveDataOnLocalStorage.js";
saveDataOnLocalStorage();

// - Criar pelo menos uma função usando o prototype do Array;
Array.prototype.replace = function (index, replaceTo) {
  if (!index) throw new Error("Invalid parameters, fill index and replacement item.");

  if (replaceTo) {
    this.splice(index, 1, replaceTo);
  } else {
    this.splice(index, 1);
  }
};

const products = {
  data: JSON.parse(localStorage.getItem("products")),
  create({ category, name, price }) {
    if (!category || !name || !price) {
      console.log("Please, fill in the category, name and price");
      return;
    }

    const categoryIndex = this.findCategoryIndexById(category);

    this.data[categoryIndex].products.push({
      id: Date.now().toString(),
      name,
      price: Number(price),
    });
  },
  // - Utilizar o this para acessar alguma propriedade do objeto em alguma funcionalidade;
  update({ id, name, price }) {
    if (!id || !name || !price) {
      console.log("Please, fill in the id, name and price");
      return;
    }

    const product = this.listAllProducts().find((product) => product.id === id);

    if (!product) {
      console.log("This product does not exist.");
      return;
    }

    const categoryIndex = this.findCategoryIndexById(product.category);

    const productIndex = this.data[categoryIndex].products.findIndex((item) => item.id === id);

    this.data[categoryIndex].products.replace(productIndex, { id, name, price });
  },
  delete(id) {
    const product = this.listAllProducts().find((product) => product.id === id);

    if (!product) {
      console.log("This product does not exist.");
      return;
    }

    const categoryIndex = this.findCategoryIndexById(product.category);

    const productIndex = this.data[categoryIndex].products.findIndex((item) => item.id === id);

    this.data[categoryIndex].products.replace(productIndex);
  },
  listAll() {
    return this.data;
  },
  // - Reduce
  // - Utilizar o spread operator para qualquer operação.
  listCategories() {
    const categories = this.data.reduce((acc, category) => {
      delete category.products;

      return [...acc, category];
    }, []);

    return categories;
  },
  findCategoryIndexById(id) {
    const categoryIndex = this.data.findIndex((c) => c.id === id);

    if (categoryIndex === -1) {
      console.log("This category does not exist.");
      return;
    }

    return categoryIndex;
  },
  // - Map
  listAllProducts() {
    const products = this.data.reduce((acc, category) => {
      let productsFormatted = category.products.map((product) => {
        product.category = category.id;
        return product;
      });

      acc = acc.concat(productsFormatted);

      return acc;
    }, []);

    return products;
  },
};

function recursiveFunction() {
  function sumAllProductsPrices(products, length) {
    if (length === 0) {
      return 0;
    } else {
      return products[length - 1] + sumAllProductsPrices(products, length - 1);
    }
  }

  const allProducts = products.listAllProducts().map((product) => product.price);

  console.log(sumAllProductsPrices(allProducts, allProducts.length));
}

function introductionMessage() {
  // - Filter
  const productsMethods = Object.keys(products).filter((item) => typeof products[item] === "function");

  const message = `Por favor, para consultar ou manipular o array de produtos utilize os métodos ${productsMethods.join(
    ", "
  )}. ex: products.listAll() ou products.create({ name: "Produto de exemplo", price: 32}).`;

  console.log(message);
}

introductionMessage();

debugger;
