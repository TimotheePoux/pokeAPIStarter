let apiLink = "https://tyradex.app/api/v1/pokemon"; //définition du lien de l'API
const data = await fetch (apiLink) //récupère l'api
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));

console.log('Données récupérées :', data); //vérifie que les donnés sont bien récupérées

const dataClean = data.filter(pokemon => pokemon.types != null); //nouvelle liste sans pokemon bug
let gen = 1; //cette variable gen facilite le tri avec les boutons de type
let dataSorted = dataClean.filter(pokemon => pokemon.generation == gen); //variable triée qui sera affichée sur la page,quand on ouvre la page, la génération sélectionnée par défaut est la gen 1
let selecteur = document.querySelector('select');
selecteur.addEventListener('click', ()=>{
    gen = selecteur.value; //màj de la variable gen
    dataSorted = dataClean.filter(pokemon => pokemon.generation == gen);//tri selon la génération sélectionnée
    loadPKMN();//réaffiche les pokémons
});

let typeButtons = document.querySelectorAll('.btnType');
typeButtons.forEach(typeButton =>{
    typeButton.style.backgroundColor = getTypeColor(typeButton.value);//applique à chaque bouton de type la couleur qui lui est associée
    typeButton.addEventListener('click', ()=>{
    dataSorted = [];//vide dataSorted pour la re-remplir par la suite
    dataClean.forEach(pokemon=>{
        if (pokemon.generation == gen){//sélectionne uniquement les pokémons présents dans la génération sélectionnée
            if (pokemon.types[0].name == typeButton.value){
                dataSorted.push(pokemon);
            }
            else if(pokemon.types.length==2){//condition nécessaire dans l'éventualité où on a un double typé
                if (pokemon.types[1].name == typeButton.value){
                    dataSorted.push(pokemon);
                }
            }
        }
    })
    loadPKMN();//réaffiche les pokémons
});
});

function getTypeColor(typeName) {//Prend en entrée un nom de type et renvoie la couleur qui lui est associée
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
loadPKMN(); //Affiche les pokémons quand on ouvre la page

function loadPKMN(){ //Affiche tous les pokémons contenus dans une liste de pokémon
    main.innerHTML = "";//enlève tous les pokémons de la page pour re-remplir ensuite la page avec la nouvelle liste
    dataSorted.forEach(pokemon => {
        const article = document.createElement('article');//crée un article dans lequel on va mettre toutes les informations du pkmn
            if (pokemon.types.length == 2){//si le pokémon à un double type, la bordure de sa carte aura la couleur de son deuxieme type, sinon elle aura la couleur de son premier (et seul) type
                article.style.borderColor = getTypeColor(pokemon.types[1].name);
            }
            else{
                article.style.borderColor = getTypeColor(pokemon.types[0].name);
            }
        article.style.backgroundColor = getTypeColor(pokemon.types[0].name);//mets comme couleur de fond de la carte la couleur associée au premier type du pkmn
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
        `;//remplit l'article avec les infos du pokémon
        main.appendChild(article);//ajoute l'article au main
    });
}