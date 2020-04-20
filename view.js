const apiServer = new fetchAPI('https://games-world.herokuapp.com');

//console.log(apiServer.getGames());

async function gamesFromServer() {
    const gameServerRequest = await apiServer.getGames();

    const gameList = [];

    for(let i = 0; i < gameServerRequest.length; i++) {
        const takeGames = gameServerRequest[i];
        console.log(takeGames);
        
    }

}

gamesFromServer()