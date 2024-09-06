const url = "http://localhost:3000/posts"
const buttonPage = document.getElementById('add-page');
const nickname = document.getElementById('nick-post').innerText;
const createPostContainer = document.getElementById('create-post-container');
const cancelBtn = document.getElementById('cancel-button');
const confirmBtn = document.getElementById('confirm-button');

function carregarPosts() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '';

            data.forEach(post => {

                let cDiv = document.createElement("div");
                let nickPost = document.createElement('h3');
                let newPost = document.createElement('p');

                nickPost.innerText = nickname;
                newPost.textContent = post.textInput;

                cDiv.className = 'posts';
                cDiv.appendChild(nickPost);
                cDiv.appendChild(newPost);

                postsContainer.appendChild(cDiv);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar posts:', error);
        });
}

window.onload = carregarPosts;

// ========================================================
// EventListener ( Tem mutcho ┐(‘～` )┌ )
buttonPage.addEventListener('mouseenter', BpEnter)
buttonPage.addEventListener('mouseleave', function () {
    buttonPage.style.backgroundColor = ""
})
buttonPage.addEventListener('mousedown', BpPressDown)
buttonPage.addEventListener('mouseup', BpPressUp)
buttonPage.addEventListener('click', createPostOpen)
cancelBtn.addEventListener('click', createPostClose)
confirmBtn.addEventListener('click', enviarPost)
// confirmBtn.addEventListener('click', enviarPost)
// ========================================================

// Functions "+" Button
function BpEnter() {
    buttonPage.style.backgroundColor = "#e0d2a3"
}

function BpPressDown() {
    buttonPage.style.backgroundColor = ""
}

function BpPressUp() {
    buttonPage.style.backgroundColor = "#f0e4bc"
}

// Create Post
function enviarPost() {
    let cDiv = document.createElement("div");
    let nickPost = document.createElement('h3');
    let textArea = document.getElementById('post-text');

    const post = {
        textInput: textArea.value
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Post criado:', data);

            atualizarPosts();
            createPostClose();

            textArea.value = "";
        })
        .catch(error => {
            console.error('Erro ao criar post:', error);
        });
}

function atualizarPosts() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            // postsContainer.innerHTML = '';

            data.forEach(post => {
                let cDiv = document.createElement("div");
                let nickPost = document.createElement('h3');
                let newPost = document.createElement('p');

                newPost.textContent = post.textInput;
                nickPost.innerText = nickname;

                cDiv.className = 'posts';
                cDiv.appendChild(nickPost);
                cDiv.appendChild(newPost);
                postsContainer.appendChild(cDiv);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar posts:', error);
        });
}

function createPostOpen() {
    createPostContainer.style.display = "flex"
}

function createPostClose() {
    createPostContainer.style.display = ""
}