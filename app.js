fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => {
    const posts = data;
    let cards = "";
    posts.forEach(post => {

        cards += `<div class= "col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                        </div>
                    </div>
                </div>`;
          document.querySelector('#cards').innerHTML = cards;
      });
  });
