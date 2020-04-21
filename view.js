const apiServer = new fetchAPI('https://games-world.herokuapp.com');

console.log();

async function gamesFromServer() {
    const gameServerRequest = await apiServer.getGameList();

    const gameList = [];

    for(let i = 0; i < gameServerRequest.length; i++) {
        const takeGames = gameServerRequest[i];
        //console.log(takeGames[i]);
        //obiect nou creat cu ajutorul functiei contructor din gamesListPosts.js
        const postDOM = new gamePost(
            takeGames._id,
            takeGames.title,
            takeGames.imageUrl,
            takeGames.description
    
            )
  
       
        const postGamesInDom = postDOM.displayGames();
        document.querySelector('.container').appendChild(postGamesInDom);
        document.getElementById(`${postDOM.id}`).addEventListener("click", async function(){
            // console.log(event.target.parentElement);
                if (event.target.classList.contains('delete-btn')) {
                    const divId = event.target.parentElement.getAttribute('id');
                    const delGame = await apiServer.deleteGame(divId);
                    if(delGame.succes){
                        // remove from dom
                    } else {
                        alert("Could not delete game, something went wrong");
                    }
                }
            })





        //console.log('PostDOMID: ', postDOM);
        // console.log(document.getElementById(takeGames._id));
    }
    

    // console.log(document.getElementById(takeGames._id));



}
gamesFromServer()

/*async function deleteSingleGame() {
    const generateID = document.getElementById(`${this._id}`)
    const waitResponse = await apiServer.deleteGame(generateID);

    console.log(waitResponse);
    
}

deleteSingleGame()*/