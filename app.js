let titleModal = document.querySelector("#exampleModalLabel");
let bodyModal = document.querySelector(".modal-body");
let usersEmails = document.querySelector('#userEmail');

const urlPosts = "http://localhost:3000/posts";
const urlUsers = "http://localhost:3000/users";

async function getData() {
  const response1 = await fetch(urlPosts);
  const data1 = await response1.json();

  const response2 = await fetch(urlUsers);
  const data2 = await response2.json();

    cardsPosts(data1);
    modalPosts(data2);

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
    modals += `<p class="userModal" name="${modale.userId}">${modale.username}</p>
                
               <p class="emailModal" name="${modale.userId}">${modale.email}</p>`;
              
    document.querySelector("#userEmail").innerHTML = modals;

  });
}

function prueba(e) {
  const element = e.target.name;

  fetch(`${urlPosts}/${element}`)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data1) {
      titleModal.textContent = data1.title;
      bodyModal.textContent = data1.body;
      
      return fetch(`${urlUsers}/${data1.userId}`);
    })
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data2) {            
      usersEmails.textContent = " Username: " + data2.username +" Email: "+ data2.email;      
    })
    .catch(function (error) {
      console.log(error);
    });
}