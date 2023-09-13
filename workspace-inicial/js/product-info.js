const productID = localStorage.getItem("productID");
const url_products = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const url_comments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
const container = document.getElementById("products-container");
const comments = document.getElementById("comments")
const rating = document.getElementById("rating");
const selectedRating = document.getElementById("selected-rating");

document.addEventListener("DOMContentLoaded", function() {
    getData()
    getComments()
})

function getData(){
    return fetch(url_products)
    .then(response => response.json())
        .then(data => { 
          showProducts(data);
        })
        .catch(error => console.error("error fetchig data:", error));
}

function getComments(){
    return fetch(url_comments)
    .then(response => response.json())
        .then(data_comments => { 
          showComments(data_comments);
        })
        .catch(error => console.error("error fetchig data:", error));
}

function showProducts(data) {
    container.innerHTML += `<div class="container">
    <h1 class="p-5">${data.name}</h1>
    <hr>
    <h3>Precio</h3>
    <p class="pb-4">${data.cost} ${data.currency}</p>
    <h3>Descripción</h3>
    <p class="pb-4">${data.description}</p>
    <h3>Categoría</h3>
    <p class="pb-4">${data.category}</p>
    <h3>Cantidad vendidos</h3>
    <p class="pb-4">${data.soldCount}</p>
    <h3>Imagenes ilustrativas</h3>
    <div class="d-flex flex-row">
    
    ${data.images.map(imageUrl => `<div class=""> <img class="w-100 p-4 d-block border" src="${imageUrl}"></div>`).join('')}
     </div>
    </div>`
}


function showComments(data_comments){
    for (const comment of data_comments) {
        container.innerHTML += `
        <h3>Comentarios</h3>
        <div class="list-group-item">
            <h4>${comment.user}</h4>
            <span>
            ${stars(comment.score)}
            </span>
            <p>${comment.description}</p>
            <small class="text-muted">
            ${comment.dateTime}</small>
        </div>
        `
    }
}

function stars(quantity) {
    return "<i class='fa fa-star checked'></i>".repeat(Math.floor(quantity)) + "<i class='fa fa-star'></i>".repeat(5 - Math.floor(quantity));
}

// Manejador de clic en las estrellas
rating.addEventListener("click", (event) => {
    if (event.target.classList.contains("star")) {
      const ratingValue = event.target.getAttribute("data-rating");
      
      // Actualizamos la puntuación seleccionada en el DOM
      selectedRating.textContent = ratingValue;
  
      // Obtener todas las estrellas
      const stars = document.querySelectorAll(".star");
  
      // Iterar sobre las estrellas y aplicar el estilo según la puntuación seleccionada
      stars.forEach((star) => {
        const starRating = star.getAttribute("data-rating");
        if (starRating <= ratingValue) {
          star.classList.add("selected");
        } else {
          star.classList.remove("selected");
        }
      });
    }
  });