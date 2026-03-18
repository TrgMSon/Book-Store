const itBooks = document.getElementById("itBook");
const viewDetailBtns = document.querySelectorAll(".viewDetailBtn");
const cart = document.getElementById("cart");
const cartBtn = document.getElementById("cartBtn");
const logoutBtn = document.getElementById("logoutBtn");

itBooks.style.backgroundColor = "#A9A9A9";
cart.classList.add("hide");

viewDetailBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        let bookId = this.dataset.bookId;
        console.log(bookId);
        window.location.href = "/viewDetail?bookId=" + bookId;
    })
});

async function getItemsInCart() {
    let items = await fetch("/api/viewCart");
    return items.json();
}

cartBtn.addEventListener("click", async function () {
    cart.classList.toggle("hide");

    let items = await getItemsInCart();

    for (let i=0; i<items.length; i++) {
        console.log(items[i]);
    }
});

logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "/logout";
});