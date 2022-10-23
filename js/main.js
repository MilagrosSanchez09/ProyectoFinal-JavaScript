const muñecos = []

//card

const loadProducts = (muñecos) =>
{
    let container = document.querySelector("#shop-content");
    for (const product of muñecos)
    {
        let div = document.createElement("div");
        div.setAttribute("class", "product-box");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.description}" class="product-img">
            <h2 class="product-title">${product.name}</h2>
            <span class="price">$${product.price}</span>
            <i class='bx bx-cart add-cart'></i>
        `;
        container.appendChild(div);
    }
    addProductToCart();
}

//TRAIGO EL ARRAY DE PRODUCTOS
const getData = async () =>
{
    try{
        const response = await fetch('/products.json');
        const data = await response.json();
        loadProducts(data);
        muñecos.push(...data);
    }
    catch(e)
    {
        console.log(e);
    }
}
getData()


// Cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Abrimos y mostramos el carrito
cartIcon.onclick = ()  =>{
    cart.classList.add("active");
};

//Cerramos y ocultamos el carrito
closeCart.onclick = () => {
    cart.classList.remove("active");
};


// Cart working JS
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
};

//Function
function ready(){
    //Eliminar productos del carrito
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged);
    }
    // Añadir al carrito
    var addCart = document.getElementsByClassName("add-cart")
    for (var i = 0; i < addCart.length; i ++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //Boton comprar 
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
};

//Boton comprar
function buyButtonClicked(){
    alert('You order is placed')
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
};

//Remove Items from Cart

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal();
}

//Quantity Changes
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatetotal();
};

//Add to cart
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName ("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName ("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName ("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
};
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    // cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i ++){
        if (cartItemsNames[i].innerText == title){
            alert("Ya Has Agregado este Producto al Carrito");
            return;
        }
    }
    var cartBoxContent = 
                        `
                          <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                              <div class="cart-product-tittle">${title}</div>
                              <div class="cart-price">${price}</div>
                              <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!--Remove cart-->
                            <i class='bx bxs-trash-alt cart-remove'></i>
                        `;
                       cartShopBox.innerHTML = cartBoxContent
                       cartItems.append(cartShopBox)
                       cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("change", removeCartItem);
                       cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);

};



//Update Total

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
};



