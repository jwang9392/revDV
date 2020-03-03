import "./styles/index.scss";


window.addEventListener("DOMContentLoaded", () => {
  const title = document.createElement("div");
  title.classList.add("test-title");
  title.innerHTML = `<h2>Hello ??? World!</h2>`;
  document.body.append(title);
});
