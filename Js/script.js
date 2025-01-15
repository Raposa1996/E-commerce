// Array para armazenar os itens do carrinho
let cart = [];

// Função para adicionar um item ao carrinho
// Função para adicionar um item ao carrinho
function addToCart(productId, productName, productPrice) {
    const product = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
    };

    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    updateCartCount();
    updateCartTotal();
    showItemAddedPopup(productName); // Exibe o pop-up
}

// Função para exibir o pop-up de notificação
function showItemAddedPopup(productName) {
    const popup = document.getElementById("item-added-popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = `${productName} foi adicionado ao carrinho!`; // Mensagem personalizada
    popup.classList.add("show");

    // Fecha o pop-up após 3 segundos
    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}
    

// Função para atualizar o contador de itens no carrinho
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Função para atualizar o total do carrinho
function updateCartTotal() {
    const cartTotal = document.getElementById("cart-total");
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Função para exibir os itens no modal do carrinho
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li>Carrinho vazio</li>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement("li");
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}


// Função para alternar o modal do carrinho
function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.toggle("active");
    if (cartModal.classList.contains("active")) {
        displayCartItems();
    }
}

// Função para limpar o carrinho
function clearCart() {
    cart = [];
    updateCartCount();
    updateCartTotal();
    displayCartItems();
}

// Função de simulação de checkout (atualizar itens do carrinho)
function checkout() {
    if (cart.length === 0) {
        alert("Carrinho vazio. Não é possível finalizar a compra.");
        return;
    }
    alert(`Compra atualizada! Total: $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`);
    displayCartItems();
}

// Adiciona os eventos aos botões de adicionar ao carrinho
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        addToCart(productId, productName, productPrice);
    });
});

// Eventos para alternar o modal do carrinho
document.getElementById("cart-icon").addEventListener("click", toggleCart);
document.getElementById("close-cart").addEventListener("click", toggleCart);

// Evento para limpar o carrinho
document.getElementById("clear-cart").addEventListener("click", clearCart);

// Evento para finalizar a compra (simula atualização)
document.getElementById("checkout").addEventListener("click", checkout);
