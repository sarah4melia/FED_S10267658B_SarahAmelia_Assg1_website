/* PRODUCTS */
function filterProducts(category) {

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {

        if (category === "all" || card.getAttribute("data-category") === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
}

function showSizePopup(button) {

    const type = button.getAttribute("data-type");
    const sizePopup = document.getElementById("sizePopup");
    const sizeOptions = sizePopup.querySelector(".size-options");
    const sizeGuideLink = document.getElementById("sizeGuideLink");

    sizeOptions.innerHTML = "";

    if (type === "tops") {

        sizeOptions.innerHTML = `

            <button class="size-button">XS</button>
            <button class="size-button">S</button>
            <button class="size-button">M</button>
            <button class="size-button">L</button>
            <button class="size-button">XL</button>
            <button class="size-button">XXL</button>`;

        sizeGuideLink.onclick = () => showSizeGuide("tops");
        sizeGuideLink.style.display = "inline";

    } else if (type === "shoes") {

        sizeOptions.innerHTML = `

            <button class="size-button">36</button>
            <button class="size-button">37</button>
            <button class="size-button">38</button>
            <button class="size-button">39</button>
            <button class="size-button">40</button>
            <button class="size-button">41</button>`;

        sizeGuideLink.onclick = () => showSizeGuide("shoes");
        sizeGuideLink.style.display = "inline";

    } else if (type === "bags") {

        sizeOptions.innerHTML = "<p>No size options available for this product.</p>";
        sizeGuideLink.style.display = "none";

    }

    sizePopup.style.display = "flex";

}

function showSizeGuide(type) {

    const sizeGuidePopup = document.getElementById("sizeGuidePopup");
    const table = sizeGuidePopup.querySelector("table");

    if (type === "tops") {

        table.innerHTML = `

            <tr><th>Size</th><th>Chest (in)</th><th>Waist (in)</th></tr>
            <tr><td>XS</td><td>32-34</td><td>24-26</td></tr>
            <tr><td>S</td><td>35-37</td><td>27-29</td></tr>
            <tr><td>M</td><td>38-40</td><td>30-32</td></tr>
            <tr><td>L</td><td>41-43</td><td>33-35</td></tr>
            <tr><td>XL</td><td>44-46</td><td>36-38</td></tr>
            <tr><td>XXL</td><td>47-49</td><td>39-41</td></tr>`;

    } else if (type === "shoes") {

        table.innerHTML = `

            <tr><th>EU Size</th><th>Foot Length (cm)</th></tr>
            <tr><td>36</td><td>22.5</td></tr>
            <tr><td>37</td><td>23</td></tr>
            <tr><td>38</td><td>23.5</td></tr>
            <tr><td>39</td><td>24</td></tr>
            <tr><td>40</td><td>24.5</td></tr>
            <tr><td>41</td><td>25.5</td></tr>`;

    }

    sizeGuidePopup.style.display = "flex";
}

function closePopup() {

    document.getElementById("sizePopup").style.display = "none";
    document.getElementById("sizeGuidePopup").style.display = "none";

}

/* CART */

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Initialize cart

function showSizePopup(button) {
    const type = button.getAttribute("data-type");
    const productCard = button.parentElement;
    const productName = productCard.querySelector("h3").textContent;
    const productPrice = productCard.querySelector("p").textContent;
    const productImage = productCard.querySelector("img").src;

    const sizePopup = document.getElementById("sizePopup");
    const sizeOptions = document.querySelector(".size-options");
    const sizeGuideLink = document.querySelector(".popup-content p a");

    sizeOptions.innerHTML = "";

    if (type === "tops" || type === "bottoms") {
        sizeOptions.innerHTML = `
            <button class="size-button">XS</button>
            <button class="size-button">S</button>
            <button class="size-button">M</button>
            <button class="size-button">L</button>
            <button class="size-button">XL</button>
            <button class="size-button">XXL</button>`;
        sizeGuideLink.onclick = () => showSizeGuide(type);

        sizeOptions.querySelectorAll(".size-button").forEach((btn) => {
            btn.onclick = () => {
                addToCart(productName, productPrice, productImage, btn.textContent);
                closePopup();
            };
        });
    } else if (type === "shoes") {
        sizeOptions.innerHTML = `
            <button class="size-button">36</button>
            <button class="size-button">37</button>
            <button class="size-button">38</button>
            <button class="size-button">39</button>
            <button class="size-button">40</button>
            <button class="size-button">41</button>`;
        sizeGuideLink.onclick = () => showSizeGuide(type);

        sizeOptions.querySelectorAll(".size-button").forEach((btn) => {
            btn.onclick = () => {
                addToCart(productName, productPrice, productImage, btn.textContent);
                closePopup();
            };
        });
    } else if (type === "bags") {
        addToCart(productName, productPrice, productImage, "N/A");
    }

    sizeGuideLink.style.display = type === "bags" ? "none" : "inline";
    sizePopup.style.display = "flex";
}

function addToCart(name, price, image, size) {
    cart.push({ name, price, image, size });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added "${name}" to cart!`);
}

function displayCart() {
    const cartContainer = document.getElementById("cartContainer");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartContainer.innerHTML = ""; // Clear previous contents
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        // Convert price to a numeric value and add to totalPrice
        const price = parseFloat(item.price.replace('$', '').trim());
        totalPrice += price;

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Size: ${item.size}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    // Display the total price and add a "Proceed to Checkout" button
    const totalPriceElement = document.createElement("div");
    totalPriceElement.classList.add("cart-total");
    totalPriceElement.innerHTML = `
        <h2>Total: $${totalPrice.toFixed(2)}</h2>
        <button id="checkoutButton" class="checkout-button">Proceed to Checkout</button>
    `;
    cartContainer.appendChild(totalPriceElement);

    // Event listener for the "Proceed to Checkout" button
    document.getElementById("checkoutButton").onclick = () => {
        window.location.href = "checkout.html";
    };
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove the item at the given index
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // Update the cart display
}

// Call displayCart when the cart.html page is loaded
if (document.getElementById("cartContainer")) {
    displayCart();
}
