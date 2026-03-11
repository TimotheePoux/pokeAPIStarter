await loadData(1);

async function loadData(generation){ 
    let apiLink = "https://pokebuildapi.fr/api/v1/pokemon/generation/" + generation; 
    const data = await fetch (apiLink)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));

    console.log('Données récupérées :', data);

    let selecteur = document.querySelector('select');
    console.log(selecteur.value)
    selecteur.addEventListener('click', ()=>{
        loadData(selecteur.value);
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
    main.innerHTML = "";
    data.forEach(pokemon => {
        const article = document.createElement('article');
        const typesHTML = pokemon.apiTypes;
        if (typesHTML.length == 2){
            article.style.backgroundColor = getTypeColor(pokemon.apiTypes[1].name);
        }
        else{
            article.style.backgroundColor = getTypeColor(pokemon.apiTypes[0].name);
        }
        article.style.borderColor = getTypeColor(pokemon.apiTypes[0].name);
        let types = '<span class="types">';
        typesHTML.forEach(async (type)=>{
            types = `${types}${type.name} `;
        });
        types = `${types}</span>`;
        article.innerHTML = `
            <figure>
                <picture>
                    <img src="${pokemon.image}" alt="Image ${pokemon.name}" />
                </picture>
                <figcaption>
                    ${types}
                    <h2>${pokemon.name}</h2>
                    <ol>
                        <li>Points de vie : ${pokemon.stats.HP}</li>
                        <li>Attaque : ${pokemon.stats.attack}</li>
                        <li>Défense : ${pokemon.stats.defense}</li>
                        <li>Attaque spéciale : ${pokemon.stats.special_attack}</li>
                        <li>Défense spéciale : ${pokemon.stats.special_defense}</li>
                        <li>Vitesse : ${pokemon.stats.speed}</li>
                    </ol>
                </figcaption>
            </figure>
        `;
        main.appendChild(article);
    });
}