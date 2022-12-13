const titlePost = document.querySelector("#titlePost");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((titles) => {
      let h5 = document.createElement("h5");
      h5.classList.add("card-title");
      titlePost.innerHTML = titles.title;
      titlePost.appendChild(h5);
    });
  });
