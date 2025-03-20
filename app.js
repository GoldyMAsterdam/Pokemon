const pokemonImage = document.getElementById("js--pokemon-image");
let randomNumber = Math.floor(Math.random() * 250 + 1);
let catchNumber = Math.floor(Math.random() * 1);
console.log(catchNumber);

let pokemon = fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
  .then(function(response) {
    return response.json();
  })

  .then(function(realData) {
    pokemonImage.src = realData.sprites.front_default;
  });