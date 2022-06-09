let params = new URL(document.location).searchParams;
let id = params.get("id");
let url = "http://localhost:3000/api/products/" + id;
let quantitys = document.getElementById("quantity").value

adddProductLocalStorage()


fetch(url)
    .then(response => response.json())
    .then(products => handleData(products))

function handleData(product) {

    const { altTxt, imageUrl, name, price, _id, colors, description } = product
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makedescription(description)
    makeValue(colors)
}


function makeImage(imgUrl, altTxt) {
    const image = document.createElement('img')
    image.setAttribute('src', imgUrl)
    image.setAttribute('alt', altTxt)
    document.querySelector('.item__img').appendChild(image)
}

function makeTitle(name) {
    const title = document.getElementById("title")
    title.innerHTML = name
    document.title = name
}

function makePrice(price) {
    const prix = document.getElementById("price")
    prix.innerHTML = price
}

function makedescription(description) {
    const descr = document.getElementById("description")
    descr.innerHTML = description
}

function makeValue(colors) {
    for (color in colors) {
        const parents = document.getElementById("colors")
        const option = document.createElement("option")
        option.setAttribute(`value`, colors[color])
        option.innerText = colors[color]
        parents.appendChild(option)
    }

}
function adddProductLocalStorage() {
    document.getElementById("addToCart").addEventListener("click", () => {
        if (document.getElementById("quantity").value < 0) { alert("Veuillez entrer une quantité positive") }
        if (document.getElementById("quantity").value > 0 && document.getElementById("quantity").value <= 100 && document.getElementById("colors").value != "") {
       let colorValue = document.getElementById("colors").value
       let quantityValue = document.getElementById("quantity").value
        
       
       let product = {
             quantity: Number(quantityValue),
                color: colorValue,
                titre: document.getElementById("title").innerHTML,
                image: document.querySelector(".item__img img").getAttribute("src"),
                id: id,
        }
        let addProductLocalStorage = JSON.parse(localStorage.getItem("addToCart"))
        if (addProductLocalStorage) {
             const find = addProductLocalStorage.find(
                 (product) => product.id === id && product.color === colorValue)
                if (find) {
                    let newQuantity =
                    parseInt(product.quantity) + parseInt(find.quantity)
                    find.quantity = newQuantity
                    localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage))
                } else {
                    addProductLocalStorage.push(product)
                    localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage))
                    alert("Le produit a été ajouté au panier")
                }} else {
                    addProductLocalStorage = []
                    addProductLocalStorage.push(product)
                    localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage))
                    alert("Le produit a été ajouté au panier")
                }}
            })
        }
