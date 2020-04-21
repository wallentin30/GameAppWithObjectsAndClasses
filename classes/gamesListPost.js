// functia contructor
function gamePost(id,title,imageUrl,description) {
    this._id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
}

gamePost.prototype.displayGames = function() {
    const divContainer = document.createElement('div');
    divContainer.setAttribute('id', `${this._id}`);
    divContainer.setAttribute('class', 'divContainer');
    divContainer.innerHTML = `
                <h1>${this.title}</h1>
                <p><strong>GAME ID: ${this._id}</strong></p>
                <img src='${this.imageUrl}'>
                <p>${this.description}</p> 
                <button class="delete-btn">Delete Game</button>
                <button class="editBtn">Edit Game</button>       
    `;
    //console.log(divContainer.hasAttribute('id', this._id));
    
    // console.log(document.getElementById(`${this.id}`));
   
    // document.getElementById(`${this._id}`).addEventListener("click", function(){
    //     if (event.target.classList.contains('delete-btn')) {
    //             alert('delete')
    //     }
    // })

    return divContainer;
}

