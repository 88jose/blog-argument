let titleModal =document.querySelector("#exampleModalLabel");
let bodyModal =document.querySelector(".modal-body");
let userModal = document.querySelector(".userModal");
let emailModal = document.querySelector(".emailModal");

const urlPosts = "http://localhost:3000/posts";
const urlUsers = "http://localhost:3000/users";

async function getData(){
    const response1 = await fetch(urlPosts)
    const data1 = await response1.json()

    const response2 = await fetch(urlUsers)
    const data2 = await response2.json()

    cardsPosts(data1);
    // cardsPosts(data2);
}
getData();


function cardsPosts(titlesCards) {
  let cards = "";
  titlesCards.forEach((post) => {
    cards += `<div class= "col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <button onclick="prueba(event)" type="button" class="btn btn-primary" data-bs-toggle="modal" name ="${post.id}" data-bs-target="#exampleModal">View post</button>
                        </div>
                    </div>
                </div>`;
    document.querySelector("#cards").innerHTML = cards;
  });
}

function prueba(e){
  var posts, users;
  fetch(`${urlPosts}/${e.target.name}`)
  .then(function (response1){
    return response1.json();
  }).then(function (data1){
    posts = data1;
      titleModal.textContent = data1.title;
      bodyModal.textContent = data1.body;
      console.log(posts)
      return fetch(urlUsers);
  })
  .then(function (response2){
    return response2.json();
  }).then(function (data2){
    userModal.textContent = data2.username;
    emailModal.textContent = data2.email ;
    users = data2;
    console.log(users)
   
}).catch(function (error) {
  console.log(error);
});
}