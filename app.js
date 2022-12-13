const urlPosts = "https://jsonplaceholder.typicode.com/posts";

fetch(urlPosts)
  .then((response) => response.json())
  .then((data) => {
    cardsPosts(data);
    modalPosts(data);
  });

function cardsPosts(titlesCards) {
  let cards = "";
  titlesCards.forEach((post) => {
    cards += `<div class= "col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>
                        </div>
                    </div>
                </div>`;
    document.querySelector("#cards").innerHTML = cards;
  });
}

function modalPosts(infoModal) {
  let titleBodyModal = "";
  infoModal.forEach((modal) => {
    titleBodyModal += `<div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">${modal.title}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                ${modal.body}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div> `;
console.log(modal.title)
    document.querySelector("#exampleModal").innerHTML = titleBodyModal;
  });
}
