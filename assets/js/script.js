let itemsArray = []; // Array para armazenar os itens

// Gera opções para o seletor de quantidade (1 a 100)
function populateQuantityOptions() {
    const quantitySelect = document.getElementById('item-quantity');
    for (let i = 1; i <= 100; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        quantitySelect.appendChild(option);
    }
}

// Adiciona um item à lista e calcula o valor total
function addItem(event) {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemQuantity = parseInt(document.getElementById('item-quantity').value, 10);
    const itemPrice = parseFloat(document.getElementById('item-price').value);

    if (!itemName || isNaN(itemQuantity) || isNaN(itemPrice)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const itemTotal = itemQuantity * itemPrice;
    
    // Cria um objeto para o item
    const item = {
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice,
        total: itemTotal
    };

    // Adiciona o item ao array
    itemsArray.push(item);

    // Atualiza a exibição dos itens
    updateItemList();
    
    // Atualiza o valor total após adicionar o item
    updateTotalValue();

    // Limpa o formulário após adicionar o item
    document.getElementById('market-list-form').reset();
}

// Remove um item da lista e atualiza o valor total
function removeItem(index) {
    itemsArray.splice(index, 1); // Remove o item do array
    updateItemList(); // Atualiza a lista
    updateTotalValue(); // Atualiza o valor total após remover o item
}

// Atualiza a lista de itens e organiza em ordem alfabética
function updateItemList() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // Limpa a lista atual

    // Ordena o array por nome
    itemsArray.sort((a, b) => a.name.localeCompare(b.name));

    itemsArray.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <strong>Nome:</strong> ${item.name}<br>
            <strong>Quantidade:</strong> ${item.quantity}<br>
            <strong>Valor Unitário:</strong> R$ ${item.price.toFixed(2)}<br>
            <strong>Total:</strong> R$ ${item.total.toFixed(2)}
            <button onclick="removeItem(${index})">Remover</button>
        `;
        itemList.appendChild(itemDiv);
    });
}

// Atualiza o valor total geral
function updateTotalValue() {
    const totalValue = itemsArray.reduce((sum, item) => sum + item.total, 0);
    document.getElementById('total-value').textContent = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
}

// Exibe ou oculta o menu mobile
function menuShow() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('open');
}

// Popula o seletor de quantidade quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    populateQuantityOptions();
    document.getElementById('market-list-form').addEventListener('submit', addItem);
});
