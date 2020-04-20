function fetchAPI(serverURL) {
    this.serverURL = serverURL;
}

fetchAPI.prototype.getGames = function() {
    return fetch(`${this.serverURL}/games`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        console.log('Raspuns de la server: ', response);
        return response.json();
    })
} 

