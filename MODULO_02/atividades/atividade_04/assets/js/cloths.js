export default async function cloths() {
  const data = await fetch("../../data.json").then((response) => response.json());

  const template = function (props) {
    return `
        ${props
          .map(
            (category) =>
              `
              <section class="${category.normalized} section" id="${category.normalized}">
                <div class="title__container">
                  <h2 class="section__title">${category.name}</h2>
                  <span class="section__subtitle">${category.description}</span>
                </div>
                <div class="clothes__container container grid">
                  ${category.products
                    .map((product) => {
                      return `
                      <article class="cloth">
                        <div class="img__container">
                          <i class="uil uil-heart heart img__heart-icon"></i>
                          <i class="uil uil-shopping-bag bag img__bag-icon"></i>
                          ${
                            product.discount
                              ? `<span class="discount-badge"><strong>${product.discount}% OFF</strong></span>`
                              : ``
                          }
                          <img
                            src=${product.image}
                            alt=${product.name}>
                        </div>
                        <div class="labels__container">
                          <label class="clothes__name">${product.name}</label>
                          <label class="clothes__price"><b>$${product.price}</b></label>
                        </div>
                      </article>
                    `;
                    })
                    .join("")}
                </div>
              </section>
            `
          )
          .join("")}
    `;
  };

  // Returns an HTML string
  template(data);

  const main = document.querySelector("#main");

  main.innerHTML = template(data);
}
