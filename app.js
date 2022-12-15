// Variables
let titleModal = document.querySelector('#exampleModalLabel');
let bodyModal = document.querySelector('.modal-body');
let usersModal = document.querySelector('#userModal');
let emailsModal = document.querySelector('#emailModal');
let commentModal = document.querySelector('#commentModal');
let btnComments = document.querySelector('#btnComments');
let editButton = document.querySelector('#editButton');
let btnDelete = document.querySelector('#btnDelete');
let containerPost = document.querySelector('#containerPost');
let cards = document.querySelector('#cards');

// Variables URLs
const urlPosts = "http://localhost:3000/posts";
const urlUsers = "http://localhost:3000/users";
const urlComments = "http://localhost:3000/comments";


// Escuchador de eventos
btnComments.addEventListener('click', showComments);
btnDelete.addEventListener('click',  deletePost);


// Funcion para hacer fetch a las urls de manera asincrona, es decir de manera simultanea, una vez obtenidos los datos se llama a las funciones
async function getData() {
  const response1 = await fetch(urlPosts);
  const data1 = await response1.json();

  const response2 = await fetch(urlUsers);
  const data2 = await response2.json();

  cardsPosts(data1);
  modalPosts(data2);

}
getData();

// Funcion para crear los post del blog
function cardsPosts(titlesCards) {
  let cards = "";
  titlesCards.forEach((post) => {
    cards += `<div class= "col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <button onclick="swohModal(event)" type="button" class="btn btn-primary" data-bs-toggle="modal" name="${post.id}" data-bs-target="#exampleModal">View post</button>
                        </div>
                    </div>
                </div>`;
    document.querySelector('#cards').innerHTML = cards;
  });
}

// Funcion para crear unos parrafos para el username y el email
function modalPosts(userEmail) {
  let modalsUser = "";
  let modalsEmail = "";
  userEmail.forEach((modal) => {
      modalsUser += `<p class="userModal" name="${modal.userId}">${modal.username}</p>`;
      modalsEmail +=`<p class="emailModal" name="${modal.userId}">${modal.email}</p>`;
              
      document.querySelector('#userModal').innerHTML = modalsUser;
      document.querySelector('#emailModal').innerHTML = modalsEmail;
  });
}


function swohModal(e) {
  const element = e.target.name;
  fetch(`${urlPosts}/${element}`)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data1) { 
      titleModal.textContent = data1.title;
      bodyModal.textContent = data1.body;
      btnComments.setAttribute('name', data1.id);
      return fetch(`${urlUsers}/${data1.userId}`);
    })
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data2) {            
      usersModal.textContent = " Username: " + data2.username;  
      emailsModal.textContent =  " Email: "+ data2.email;      
      return fetch(`${urlComments}${data2.postId}`);
    })
    .then(function (response3) {
      return response3.json();
    })
    // para que cuando recargue esté vacío
    .then(function (data3) {
      // commentModal.textContent = ""; 
      document.getElementById('flush-collapseOne').classList.remove('show');
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Función para visualizar los comentarios al hacer click en el botón comments
function showComments() {
  let postId = btnComments.getAttribute('name', 'name');
  commentModal.innerHTML = '';
  fetch(urlComments)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(comment => {
      // aqui le estoy diciendo que si el postId es igual al postId del botón que me cree un parrafo con el comentario .body 
      if(comment.postId == postId){
        let commentElement = document.createElement('p');
        commentElement.textContent = comment.body;
        commentModal.appendChild(commentElement);
      }
    });
  });
}


// Funcion para borrar posts

function deletePost(){
  let postId = btnComments.getAttribute('name', 'delete');
  console.log(postId)
  fetch(`${urlPosts}/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then((data) => {
    cards.remove();
    
  });
  setTimeout(function(){ 
         window.location.reload(true); 
      }, 1000);
}





