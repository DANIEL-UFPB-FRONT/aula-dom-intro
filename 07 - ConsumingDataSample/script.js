// https://servicodados.ibge.gov.br/api/v1/localidades/estados)
// https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios)


let pokemonData = null
let pokemons = null

async function loadSpecies() {
    const speciesData = await fetch('https://pokeapi.co/api/v2/type/')
    const species = await speciesData.json()
    console.log(species.results)
    const selectEstados = document.getElementById('select-species')
    species.results.forEach(item => {
        const speciesOption = document.createElement('option')
        speciesOption.innerText = item.name
        speciesOption.value = item.url
        selectEstados.append(speciesOption)
    });

    const estadoDefault = document.getElementById('default-species')
    estadoDefault.innerText = 'Loading species...'
    
}


async function selectPokemonEvent() {
    const pokemonSelecionada = document.getElementById("selectPokemonList").value;
    console.log('pokemon selecionada ', pokemonSelecionada)
}
async function addPokemonList(types) {

    const cabecalhoPokemon = document.createElement('div')
    cabecalhoPokemon.id = 'selectpokemon'
    cabecalhoPokemon.innerHTML = '<h2>Choose type'
    document.body.append(cabecalhoPokemon)

    const pokemonContainer = document.createElement('div');
    pokemonContainer.id = 'pokemonContainer';

    const selectPokemon = document.createElement('select');
    selectPokemon.id = 'selectPokemonList'

    pokemonContainer.append(selectPokemon)

    const pokemonDefault = document.createElement('option')
    pokemonDefault.id = 'pokemonDefault'
    pokemonDefault.value = 'default'
    pokemonDefault.innerText = 'Loading pokemons'
    selectPokemon.append(pokemonDefault)

    document.body.append(pokemonContainer)
    pokemonData = await fetch(`${types}`)
    pokemons = await pokemonData.json()

    pokemons.pokemon.forEach(pokemonItem => {
        const pokemonOption = document.createElement('option')
        pokemonOption.innerText = pokemonItem.pokemon.name
        pokemonOption.value = pokemonItem.pokemon.url
        selectPokemon.append(pokemonOption)
    });
    pokemonDefault.innerText = 'Choose a pokemon...'

    document.getElementById('selectPokemonList').addEventListener('change', selectPokemonEvent)


    const searchButtom = document.createElement('input')
    searchButtom.type = 'submit'
    searchButtom.value = 'See info'
    searchButtom.id = 'seeInfo'
    pokemonContainer.append(searchButtom)

    document.getElementById('seeInfo').addEventListener('click', async () => {
            const pokemon = document.getElementById('selectPokemonList').value

            let data = document.getElementById('predata')
            if (data === null) {
                data = document.createElement('pre')
                data.id = 'predata'
            }

            if (pokemon === 'default') {
                data.innerHTML = ''
                return
            }

            const pokemonDataRaw = await fetch(`${pokemon}`)
            const pokemonData = await pokemonDataRaw.json()

const test = pokemonData.abilities.reduce((accumulator, element) => {
    console.log("accumulator")
    console.log(accumulator)
    console.log("element.ability.name")
    console.log(element.ability.name)   

    return `${accumulator}, ${element.ability.name}`

},"")
console.log(test)
            data.innerHTML = `
                Abilities: ${pokemonData.abilities.reduce((accumulator, element) => { return `${element.ability.name} ${accumulator}`},"")}
                Name: ${pokemonData.name}
                Height: ${pokemonData.height}
                Weight: ${pokemonData.weight}
                Species: ${pokemonData.species.name}
                Base Experience: ${pokemonData.base_experience}
                `
            document.body.append(data)
        }, )
}

async function selectSpecies() {

    

    const selectedSpecies = document.getElementById("select-species").value;
    let selectpokemonExist = !!document.getElementById("selectpokemon")
    if(selectpokemonExist) {
        document.getElementById('selectpokemon').removeEventListener('change', selectPokemonEvent)
        document.getElementById("selectpokemon").remove()
    }
    selectpokemonExist = !!document.getElementById('selectPokemonList')
    if(selectpokemonExist) document.getElementById("selectPokemonList").remove()

    selectpokemonExist = !!document.getElementById('seeInfo')
    if(selectpokemonExist) document.getElementById("seeInfo").remove()

    selectpokemonExist = !!document.getElementById('predata')
    if(selectpokemonExist) document.getElementById("predata").remove()
    
    if (selectedSpecies === 'default') return

    addPokemonList(selectedSpecies)

}

window.addEventListener('load', loadSpecies)
document.getElementById('select-species').addEventListener('change', selectSpecies)
