let titleModal = document.querySelector("#exampleModalLabel");
let bodyModal = document.querySelector(".modal-body");
let userModal = document.querySelector(".userModal");
let emailModal = document.querySelector(".emailModal");
let usersEmails = document.querySelector('#userEmail');

const urlPosts = "http://localhost:3000/posts";
const urlUsers = "http://localhost:3000/users";
console.log(urlPosts)

async function getData() {
  const response1 = await fetch(urlPosts);
  const data1 = await response1.json();

  const response2 = await fetch(urlUsers);
  const data2 = await response2.json();

    cardsPosts(data1);
    prueba(data2);

}
getData();

function cardsPosts(titlesCards) {
  let cards = "";
  titlesCards.forEach((post) => {
    cards += `<div class= "col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <button onclick="prueba(event)" type="button" class="btn btn-primary" data-bs-toggle="modal" name="${post.id}" data-bs-target="#exampleModal">View post</button>
                        </div>
                    </div>
                </div>`;
    document.querySelector("#cards").innerHTML = cards;
  });
}

function modalPosts(userEmail) {
  let modals = "";
  userEmail.forEach((modale) => {
    modals += `<p class="userModal" name="${modale.id}">${modale.username}</p>
                <br>
               <p class="emailModal" name="${modale.id}">${modale.email}</p>`;
              
    document.querySelector("#userEmail").innerHTML = modals;
  });
}

 function prueba(e) {
  let postId =  e.target.name;
  let posts, users;
  fetch(`${urlPosts}/${postId}`)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data1) {
      titleModal.textContent = data1.title;
      bodyModal.textContent = data1.body;
      posts = data1;
      console.log(posts);
      return fetch(`${urlUsers}/${postId}`);
    })
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data2) {
      users = data2;
      usersEmails.textContent = data2.username + data2.email;
      // usersEmails.textContent = data2.email ;
      console.log(users);
      
    })
    .catch(function (error) {
      console.log(error);
    });
}
