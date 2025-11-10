document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blogContainer");
  const searchInput = document.getElementById("searchInput");

  let posts = [];

  // Cargar los artículos desde el JSON
  fetch("./data/posts.json")
    .then(res => res.json())
    .then(data => {
      posts = data;
      mostrarPosts(posts);
    });

  // Mostrar los artículos
  function mostrarPosts(lista) {
    blogContainer.innerHTML = ""; // limpia
    lista.forEach(post => {
      const article = document.createElement("article");
      article.innerHTML = `
        <h3><a href="${post.url}" target="_blank">${post.titulo}</a></h3>
        <p>${post.descripcion}</p>
      `;
      blogContainer.appendChild(article);
    });
  }

  // Filtro de búsqueda
  searchInput.addEventListener("input", e => {
    const texto = e.target.value.toLowerCase();
    const filtrados = posts.filter(p =>
      p.titulo.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
    );
    mostrarPosts(filtrados);
  });
});
