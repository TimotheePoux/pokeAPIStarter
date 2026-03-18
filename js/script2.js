let apiLink = "https://tyradex.app/api/v1/pokemon"; 
const data = await fetch (apiLink)
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));

console.log('Données récupérées :', data);

const dataClean = data.filter(pokemon => pokemon.types != null);
let gen = 1;
let dataSorted = dataClean.filter(pokemon => pokemon.generation == gen);
let selecteur = document.querySelector('select');
console.log(selecteur.value)
selecteur.addEventListener('click', ()=>{
    console.log(selecteur.value);
    gen = selecteur.value;
    dataSorted = dataClean.filter(pokemon => pokemon.generation == gen);
    loadPKMN();
});

let typeButtons = document.querySelectorAll('.btnType');
typeButtons.forEach(typeButton =>{
    typeButton.style.backgroundColor = getTypeColor(typeButton.value);
    typeButton.addEventListener('click', ()=>{
    dataSorted = [];
    dataClean.forEach(pokemon=>{
        if (pokemon.generation == gen){
            if (pokemon.types[0].name == typeButton.value){
                dataSorted.push(pokemon);
            }
            else if(pokemon.types.length==2){
                if (pokemon.types[1].name == typeButton.value){
                    dataSorted.push(pokemon);
                }
            }
        }
    })
    loadPKMN();
});
});

function getTypeColor(typeName) {
    switch (typeName) {
        case 'Plante':
            return '#4caf50';
        case 'Feu':
            return '#ff6f00';
        case 'Eau':
            return '#1565c0';
        case 'Poison':
            return '#8e24aa';
        case 'Vol':
            return '#88aae3';
        case 'Insecte':
            return '#9ec530';
        case 'Électrik':
            return '#f5d044';
        case 'Sol':
            return '#e77235';
        case 'Fée':
            return '#eb91e8'
        case 'Combat':
            return '#cf3e6a';
        case 'Psy':
            return '#f87078'
        case 'Roche':
            return '#c4b987';
        case 'Glace':
            return '#74d0bd'
        case 'Acier':
            return '#5a8fa0';
        case 'Spectre':
            return '#5169ab';
        case 'Dragon':
            return '#086dc8';
        case 'Ténèbres':
            return '#595266';
        default:
            return '#757575';
    }
}

const main = document.querySelector('main');
loadPKMN();

function loadPKMN(){
    main.innerHTML = "";
    dataSorted.forEach(pokemon => {
        const article = document.createElement('article');
            if (pokemon.types.length == 2){
                article.style.borderColor = getTypeColor(pokemon.types[1].name);
            }
            else{
                article.style.borderColor = getTypeColor(pokemon.types[0].name);
            }
        article.style.backgroundColor = getTypeColor(pokemon.types[0].name);
        article.innerHTML = `
            <figure>
                <picture>
                    <img src="${pokemon.sprites.regular}" alt="Image ${pokemon.name.fr}" />
                </picture>
                <figcaption>
                    <span class="types">
                        ${pokemon.types.map(type => type.name).join(" ")}
                    </span>
                    <h2>${pokemon.name.fr}</h2>
                    <ol>
                        <li>Points de vie : ${pokemon.stats.hp}</li>
                        <li>Attaque : ${pokemon.stats.atk}</li>
                        <li>Défense : ${pokemon.stats.def}</li>
                        <li>Attaque spéciale : ${pokemon.stats.spe_atk}</li>
                        <li>Défense spéciale : ${pokemon.stats.def_atk}</li>
                        <li>Vitesse : ${pokemon.stats.vit}</li>
                    </ol>
                </figcaption>
            </figure>
        `;
        main.appendChild(article);
    });
}