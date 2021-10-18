async function setData() {
  const data = await fetch("../../products.json").then((response) => response.json());

  localStorage.setItem("products", JSON.stringify(data));
}

export default setData;
