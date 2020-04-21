const apiServer = new fetchAPI('https://games-world.herokuapp.com');

console.log();

async function gamesFromServer() {
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
                        console.log(`The game with id: ${divId} was successfully deleted!`);
                        
                    } else {
                        alert("Could not delete game, something went wrong");
                    } 
                }
            })



    }
    
  

}
gamesFromServer()

 function removeDeletedElementFromDOM(domElement){
     domElement.remove();
}


/*async function deleteSingleGame() {
    const generateID = document.getElementById(`${this._id}`)
    const waitResponse = await apiServer.deleteGame(generateID);

    console.log(waitResponse);
    
}

deleteSingleGame()*/