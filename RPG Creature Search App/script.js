const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const specialName = document.getElementById('special-name')
const specialDescription = document.getElementById('special-description')
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

const buildCreatureDataUrl = (value) => {
    const regex = /{name-or-id}$/;
    return creatureDataUrl.replace(regex, value);
}

const fetchCreature = async (value) => {
    try {
        const url = buildCreatureDataUrl(value);
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("UNSUCCESSFUL CREATURE FETCH: " + err);
        console.log("VALUE USED: " + value);
        return undefined;
    }
}

const displayCreatureInfo = (info) => {
    const { id, name, weight: Weight, height: Height } = info;
    creatureName.innerHTML = name + ` <span id="creature-id">#${id}</span>`;
    weight.textContent = Weight;
    height.textContent = Height;

    const { special, stats, types: typeList } = info;

    const { name: spName, description: spDescription } = special;
    specialName.textContent = spName;
    specialDescription.textContent = spDescription;

    stats.forEach((stat) => {
        const { base_stat, name } = stat;
        window[name].textContent = base_stat;
    });

    typeList.forEach((type) => {
        const { name: typeName } = type;
        types.innerHTML += `
            <div class="type ${typeName}">${typeName.charAt(0).toUpperCase() + typeName.slice(1)}</div>
        `;
    });
};

const searchForCreature = (value) => {
    if (Number.isNaN(value)) {
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        // TODO: FIX BUG WITH "florASPINE" as value
        console.log(value);
        const found = creatures.find((el) => el.name === value);
        if (found) {
            fetchCreature(value).then(creatureInfo => {
                displayCreatureInfo(creatureInfo);
            });
        } else {
            alert("Creature not found");
        }
    } else {
        let target = Number(value);
        let left = 0;
        let right = creatures.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (creatures[mid].id === target) {
                fetchCreature(value).then(creatureInfo => {
                    displayCreatureInfo(creatureInfo);
                });
                return;
            } else if (creatures[mid].id < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        alert("Creature not found");
    }
};

const processNewSearch = () => {
    const value = searchInput.value;
    searchForCreature(value);
};

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        processNewSearch();
    }
});
searchButton.onclick = processNewSearch;

