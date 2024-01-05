const socket = io()

const btnCrear = document.querySelector("#btnCrear")
const title = document.querySelector("#title")
const description = document.querySelector("#description")
const price = document.querySelector("#price")
const thumbnail = document.querySelector("#thumbnail")
const code = document.querySelector("#code")
const stock = document.querySelector("#stock")

const btnDelete = document.querySelector("#btnDelete")
const id = document.querySelector("#id")

const historyProducts = document.querySelector("#historyProducts")


btnCrear.addEventListener("click", () => {
  let product = {
    title: title.value,
    description: description.value,
    price: price.value,
    thumbnail: thumbnail.value,
    code: code.value,
    stock: stock.value,
  };
  socket.emit("new-product", product)
});

btnDelete.addEventListener("click", () => {
  socket.emit("delete-product", id.value)
});

socket.on("resp-new-product", (data) => {
    updateHistory(data)
});

socket.on("resp-delete-product", (data) => {
    updateHistory(data)
});

function updateHistory(data) {
  historyProducts.innerHTML = ""
  data.reverse().forEach((element) => {
    historyProducts.innerHTML += `
      <div>
        <h3>${element.title}</h3>
        <p>${element.description}</p>
        <p>${element.price}</p>
        <p>${element.thumbnail}</p>
        <p>${element.code}</p>
        <p>${element.stock}</p>
        <p>ID: ${element.id}</p>
      </div>
    `
  })
}