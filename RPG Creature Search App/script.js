const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const creatureListUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creatureDataUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/{name-or-id}";

const creatures = [];

const populateCreaturesArr = (data) => {
    data.forEach((element) => {
        const { id, name } = element;
        creatures.push({ id, name })
   });
}

const fetchData = async () => {
    try {
        const res = await fetch(creatureListUrl);
        const data = await res.json();
        populateCreaturesArr(data);
    } catch (err) {
        console.log(err);
    }
};

fetchData();
