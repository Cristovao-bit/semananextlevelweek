function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {
            for ( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        } );
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");

    // Trocar id por nomes
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    // continuação da troca de id por nome
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then( res => res.json() )
        .then( cities => {

            for ( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citySelect.disabled = false;
        } );
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Itens de coleta

// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem (event) {
    const itemLi = event.target;
    
    // add or remove uma classe com javascript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    // Verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId; // isso será true ou false
        return itemFound;
    } );

    //console.log(alreadySelected);
    
    // Se já estiver selecionado
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;  
            return itemIsDifferent;
        } );

        //console.log(filteredItems);
        selectedItems = filteredItems;
    } else {
        // Se não tiver selecionado, adicionar a seleção
        selectedItems.push(itemId);
    }   

    //console.log(selectedItems);
    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;   
}