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

const nameInput = document.getElementById('js--name-input');
const countryInput = document.getElementById('js--country-input');
const predictButton = document.getElementById('js--predict-button');
const ageResult = document.getElementById('js--age-result');

async function predictAge(name, country = '') {
    if (!name.trim()) {
        ageResult.textContent = 'Please enter a name';
        return;
    }

    try {
        let apiUrl = `https://api.agify.io/?name=${encodeURIComponent(name)}`;
        if (country) {
            apiUrl += `&country_id=${country}`;
        }

        ageResult.innerHTML = 'Loading...';

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.age !== null) {
            ageResult.innerHTML = `<span class="highlight">${data.name}</span> is approximately <span class="highlight">${data.age}</span> years old`;

            if (country) {
                ageResult.innerHTML += ` in ${countryInput.options[countryInput.selectedIndex].text}`;
            }
        } else {
            ageResult.textContent = `No age prediction available for "${name}"`;
        }
    } catch (error) {
        console.error('Error fetching age prediction:', error);
        ageResult.textContent = 'Error fetching age prediction';
    }
}

predictButton.addEventListener('click', () => {
    predictAge(nameInput.value, countryInput.value);
});

nameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        predictAge(nameInput.value, countryInput.value);
    }
});
