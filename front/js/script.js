let url = "http://localhost:3000/api/products/";
fetch(url)
    .then(response => response.json())
    .then(articles => { handleData(articles) })

handleData()

function handleData(articles) {
    const listeProduct = articles;
    for (productss in listeProduct) {
        let productsCard = document.createElement("a");
        productsCard.setAttribute(
            "href",
            "./product.html?id=" + listeProduct[productss]._id
        );
        document.getElementById("items").appendChild(productsCard);

        let card = document.createElement("article");
        productsCard.appendChild(card);

        let cardImg = document.createElement("img");
        cardImg.setAttribute("src", listeProduct[productss].imageUrl);
        card.appendChild(cardImg);

        let cardTitle = document.createElement("h3");
        cardTitle.innerHTML = listeProduct[productss].name;
        card.appendChild(cardTitle);

        let cardDescription = document.createElement("p");
        cardDescription.innerHTML = listeProduct[productss].description;
        card.appendChild(cardDescription);
    }
}