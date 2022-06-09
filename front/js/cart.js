const panierClient__JSON = localStorage.getItem("addToCart");
let panierClient = JSON.parse(panierClient__JSON);
(panierClient);
let conteneur = document.querySelector("#cart__items");

conteneurs();
deleteItem();
changeQuantity();
verifFormulaire();
post(panierClient);

function conteneurs() {
    if (panierClient) {
        let tableau = [];
        for (let products in panierClient) {
            let url =
                "http://localhost:3000/api/products/" + panierClient[products].id;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {


                    let pPrice = document.createElement("p");
                    pPrice.innerText = data.price + " €";
                    pPrice.setAttribute("id", "price");
                    pPrice.className = "price";
                    divDescription.appendChild(pPrice);
                    let prix = data.price;
                    total(prix, tableau, products);
                });

            let article = document.createElement("article");
            article.className = "cart__item";
            article.setAttribute("data-id", panierClient[products].id);
            document.querySelector("#cart__items").appendChild(article);

            let divImg = document.createElement("div");
            divImg.className = "cart__item__img";
            article.appendChild(divImg);

            let img = document.createElement("img");
            img.src = panierClient[products].image;
            img.alt = "Photographie d'un canapé";
            divImg.appendChild(img);

            let divContent = document.createElement("div");
            divContent.className = "cart__item__content";
            article.appendChild(divContent);

            let divDescription = document.createElement("div");
            divDescription.className = "cart__item__content__description";
            divContent.appendChild(divDescription);

            let h2 = document.createElement("h2");
            h2.innerText = panierClient[products].titre;
            divDescription.appendChild(h2);

            let p = document.createElement("p");
            p.innerText = panierClient[products].color;
            divDescription.appendChild(p);

            let divSettings = document.createElement("div");
            divSettings.className = "cart__item__content__settings";
            divContent.appendChild(divSettings);

            let divQuantity = document.createElement("div");
            divQuantity.className = "cart__item__content__settings__quantity";
            divSettings.appendChild(divQuantity);

            let pQuantity = document.createElement("p");
            pQuantity.innerText = "Quantité : " + panierClient[products].quantity;
            divQuantity.appendChild(pQuantity);

            let input = document.createElement("input");
            input.type = "number";
            input.value = panierClient[products].quantity;
            input.min = "1";
            input.max = "100";
            input.className = "itemQuantity";
            input.name = "itemQuantity";
            divQuantity.appendChild(input);

            let divDelete = document.createElement("div");
            divDelete.className = "cart__item__content__settings__delete";
            divSettings.appendChild(divDelete);

            let pDelete = document.createElement("p");
            pDelete.className = "deleteItem";
            pDelete.innerText = "Supprimer";
            divDelete.appendChild(pDelete);
        }
    } else {
        alert("Votre panier est vide");
    }
}

function deleteItem() {
    let supprimer = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < supprimer.length; i++) {
        supprimer[i].addEventListener("click", (e) => {
            if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
                panierClient.splice(i, 1);
                localStorage.setItem("addToCart", JSON.stringify(panierClient));
                location.reload();
            } else {
                alert("Vous avez annulé la suppression");
                return;
            }
            e.preventDefault();
        });
    }
}

function changeQuantity() {
    (document.querySelectorAll(".itemQuantity"));
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < itemQuantity.length; i++) {
        itemQuantity[i].addEventListener("change", (e) => {
            e.preventDefault();
            if (itemQuantity[i].value < 1) {
                itemQuantity[i].value = 1;
                alert("Vous devez au moins avoir 1 article");

              }
            panierClient[i].quantity = itemQuantity[i].value;
            localStorage.setItem("addToCart", JSON.stringify(panierClient));
            location.reload();
        });
    }
}

function total(prix, tableau, products) {

    tableau.push(panierClient[products].quantity * prix);

    totalPrices = document.querySelector(".cart__price").children[0];
    totalPrice.innerText = tableau.reduce((a, b) => a + b, 0);
}

function verifFormulaire() {
    const formulaire = document.querySelector(".cart__order__form");
    let firstName = formulaire.firstName;
    let lastName = formulaire.lastName;
    let address = formulaire.address;
    let city = formulaire.city;
    let email = formulaire.email;

    firstName.addEventListener("change", function() {
        verifFirstName(this);
    });
    lastName.addEventListener("change", function() {
        verifLastName(this);
    });
    email.addEventListener("change", function() {
        verifEmail(this);
    });
    address.addEventListener("change", function() {
        verifAdress(this);
    });
    city.addEventListener("change", function() {
        verifCity(this);
    });
    email.addEventListener("change", function() {
        verifEmail(this);
    });

    const verifFirstName = function(inputt) {
        firstNameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
        if (firstNameRegExp.test(inputt.value)) {
            document.getElementById("firstNameErrorMsg").innerText = "";

        } else {
            document.getElementById("firstNameErrorMsg").innerText =
                "Votre prénom n'est pas valide";
        }
    };
    const verifLastName = function(inputt) {
        lastNameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
        if (lastNameRegExp.test(inputt.value)) {
            document.getElementById("lastNameErrorMsg").innerText = "";
        } else {
            document.getElementById("lastNameErrorMsg").innerText =
                "Votre nom n'est pas valide";
        }
    };
    const verifAdress = function(inputt) {
        adressRegExp = new RegExp("^[a-zA-Z0-9 ,.'-]+$");
        if (adressRegExp.test(inputt.value)) {
            document.getElementById("addressErrorMsg").innerText = "";
        } else {
            document.getElementById("addressErrorMsg").innerText =
                "Votre adresse n'est pas valide";
        }
    };
    const verifCity = function(inputt) {
        cityRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
        if (cityRegExp.test(inputt.value)) {
            document.getElementById("cityErrorMsg").innerText = "";
        } else {
            document.getElementById("cityErrorMsg").innerText =
                "Votre ville n'est pas valide";
        }
    };
    const verifEmail = function(inputt) {
        let pEmail = document.getElementById("emailErrorMsg");
        emailRegExp = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}.[a-z]{2,4}$");
        if (emailRegExp.test(inputt.value)) {
            pEmail.innerText = "";
            return true;
        } else {
            document.getElementById("emailErrorMsg").innerText =
                "Votre email n'est pas valide";
            return false;
        }
    };

}
const verifForm = function() {
    let firstNameError = document.getElementById("firstNameErrorMsg");
    let lastNameError = document.getElementById("lastNameErrorMsg");
    let addressError = document.getElementById("addressErrorMsg");
    let cityError = document.getElementById("cityErrorMsg");
    let emailError = document.getElementById("emailErrorMsg");
    let error = false;
    if (firstNameError.innerText !== "") {
        error = true;
    }
    if (lastNameError.innerText !== "") {
        error = true;
    }
    if (addressError.innerText !== "") {
        error = true;
    }
    if (cityError.innerText !== "") {
        error = true;
    }
    if (emailError.innerText !== "") {
        error = true;
    }
    if (error === true) {
        return false;
    } else {
        return true;
    }
}

// recupt input
function post(panierClient) {
    document.getElementById("order").addEventListener("click", function(e) {
        e.preventDefault();
        if (verifForm() === true) {
            let idProducts = [];

            for (let i = 0; i < panierClient.length; i++) {
                idProducts.push(panierClient[i].id);
            }


            let order = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    address: address.value,
                    city: city.value,
                },
                products: idProducts,
            };
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            };

            fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    (data);
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);

                    document.location.href = "confirmation.html";
                })
                .catch((err) => {
                    alert("Problème avec fetch : " + err.message);
                })
        } else {
            alert("Veillez remplir correctement le formulaire");













































        
        }

    })
}
