async function setData() {
  const data = await fetch("../../data.json").then((response) => response.json());

  localStorage.setItem("clothes", JSON.stringify(data));
}

export default setData;
