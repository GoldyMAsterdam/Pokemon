const pokemonImage = document.getElementById("js--pokemon-image");
const catchButton = document.getElementById("js--catch-button");
const pokemonText = document.getElementById("js--pokemon-text");
let pokemonGamePlayed = false;

let randomNumber = Math.floor(Math.random() * 250 + 1);

let pokemon = fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
  .then(function(response) {
    return response.json();
  })

  .then(function(realData) {
    pokemonImage.src = realData.sprites.front_default;
  });

console.log(catchButton);
catchButton.onclick = function() {
    if(pokemonGamePlayed === false){
        let catchNumber = Math.floor(Math.random() * 2);
        if(catchNumber === 0){
            console.log("%cYou caught the pokemon!", "color: green; font-size:2rem;");
            pokemonText.innerText = "You caught the pokemon!";
            pokemonText.className = "success-message";
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
        else{
            console.log("You missed the pokemon!");
            pokemonText.innerHTML = "You missed the pokemon!";
            pokemonText.className = "fail-message";
        }
        catchButton.onclick = function() {
            console.log("You already played the game!");
            pokemonText.innerHTML = "You already played the game!";
            pokemonText.className = "alreadyplayed-message";
        }
        pokemonGamePlayed = true;
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
}