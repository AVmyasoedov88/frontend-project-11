const renderRssForm = (value) => {
const button = document.querySelector(".col-auto");
  let div = document.createElement("div");
  div.innerHTML = `<strong>${value}</strong>`;
  button.append(div);
};

export default renderRssForm;