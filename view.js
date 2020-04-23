const apiServer = new fetchAPI('https://games-app-siit.herokuapp.com');


(async function gamesFromServer() {
    const gameServerRequest = await apiServer.getGameList();
    for(let i = 0; i < gameServerRequest.length; i++) {
        const takeGames = gameServerRequest[i];
        
        //obiect nou creat cu ajutorul functiei contructor din gamesListPosts.js
        const postDOM = new gamePost(
            takeGames._id,
            takeGames.title,
            takeGames.imageUrl,
            takeGames.description
            )
        
        const postGamesInDom = postDOM.displayGames();
        document.querySelector('.container').appendChild(postGamesInDom);
       
       
        document.getElementById(`${postDOM._id}`).addEventListener("click", async function(){

            
                if (event.target.classList.contains('delete-btn')) {
                    const divId = event.target.parentElement.getAttribute('id');
                    const delGame = await apiServer.deleteGame(divId);
                   
                    if(delGame.succes){
                        removeDeletedElementFromDOM(document.querySelector('.divContainer'));
                        //console.log(`The game with id: ${divId} was successfully deleted!`);
                        
                    } else {
                        alert("Could not delete game, something went wrong");
                    } 
                }else if (event.target.classList.contains('editBtn')) {
            
                        createEditForm(event.target.parentElement)
                        
            }   
            });

    }
    
})();

 function createEditForm(gameContainer) {
    console.log(gameContainer);
    
    if (!gameContainer.querySelector('#updateForm')) {

        if (document.querySelector('#updateForm')) {
            document.querySelector('#updateForm').remove();
        }
        
        const gameTitle = gameContainer.querySelector('h1');
        const gameDescription = gameContainer.querySelector('.description');
        const gameImageURL = gameContainer.querySelector('.imageUrl'); 

        const oldTitle = gameTitle.textContent;
        const oldDescription = gameDescription.textContent;
        const oldImageURL = gameImageURL.src;
      
        const formElement = document.createElement('form');
        formElement.setAttribute('id', 'updateForm');    
        formElement.innerHTML =  `<label for="updatedGameTitle">Title</label>
                                <input type="text" value="${gameTitle.textContent}" name="gameTitle" id="updatedGameTitle" />
                        
                                <label for="updatedGameDescription">Description</label>
                                <textarea name="gameDescription" id="updatedGameDescription">${gameDescription.textContent}</textarea>
                        
                                <label for="updatedGameImageUrl">Image URL</label>
                                <input type="text" value="${gameImageURL.src}" name="gameImageUrl" id="updatedGameImageUrl" />
                                <div>
                                    <button class="updateBtn">Save</button>
                                    <button class="cancelBtn">Cancel</button>
                                </div>`;
        gameContainer.appendChild(formElement); 
        
        gameContainer.querySelector('.cancelBtn').addEventListener('click', function(){
            removeDeletedElementFromDOM(formElement);
        });

        gameContainer.querySelector('.updateBtn').addEventListener('click', function(){
            //event.preventDefault();
            const updatedGameTitle = document.querySelector('#updatedGameTitle');
            const updatedGameDescription = document.querySelector('#updatedGameDescription');
            const updatedGameImageUrl = document.querySelector('#updatedGameImageUrl');

            const urlencoded = new URLSearchParams();
            urlencoded.append("title", updatedGameTitle.value);
            urlencoded.append("description", updatedGameDescription.value);
            urlencoded.append("imageUrl", updatedGameImageUrl.value);

            if (updatedGameTitle.value !== "" && updatedGameDescription.value !== "" && updatedGameImageUrl.value !== "") {
                
                gameContainer.querySelector('h1').innerText = updatedGameTitle.value;
                gameContainer.querySelector('.description').innerText = updatedGameDescription.value;
                gameContainer.querySelector('.imageUrl').src = updatedGameImageUrl.value;
                removeDeletedElementFromDOM(formElement);
            }
            
            if (updatedGameTitle.value !== oldTitle || updatedGameDescription.value !== oldDescription || updatedGameImageUrl.value !== oldImageURL){
                (async function(){
                    const gameEditor = await apiServer.editGame(gameContainer.id, urlencoded);
                    return gameEditor;
                })();
                
            }
        });
    } else {
        gameContainer.querySelector('#updateForm').remove();
    }

}

 function removeDeletedElementFromDOM(domElement){
     domElement.remove();
}


(async function() {
    const reloadDataBase = document.createElement('button');
    reloadDataBase.setAttribute('class', 'reloadDB');
    reloadDataBase.innerHTML = "Reload DataBase";
    reloadDataBase.style.width = "200px";
    reloadDataBase.style.position = "relative";
    reloadDataBase.style.left = "150px"; 
    reloadDataBase.style.top = "-55px"; 
    reloadDataBase.style.padding = "10px";
    reloadDataBase.style.cursor = "pointer";
    reloadDataBase.style.backgroundColor = "#E67E22";
    reloadDataBase.style.color = "white";
    reloadDataBase.style.fontWeight = "bold";
    reloadDataBase.style.border = "none";
    const formForRegen = document.querySelector(".creationForm");
    formForRegen.appendChild(reloadDataBase);

    reloadDataBase.addEventListener('click', function() {

        const alertBox = confirm("Do you really want to reload DataBase ?")
        if (alertBox === true) {   
            (async function(){
                const dbLoader = await apiServer.reloadDB();
                console.log(dbLoader);
                
                return dbLoader;
            })();
        }
    });
})();

