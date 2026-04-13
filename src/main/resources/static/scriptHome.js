const mainView = document.querySelector(".main-view2");
const itBooks = document.getElementById("itBook");
const novels = document.getElementById("novel");
const comicBooks = document.getElementById("comicBook");
const scienceBooks = document.getElementById("scienceBook");
const literatureBooks = document.getElementById("literatureBook");
const viewDetailBtns = document.querySelectorAll(".viewDetailBtn");
const cart = document.getElementById("cart");
const cartBtn = document.getElementById("cartBtn");
const logoutBtn = document.getElementById("logoutBtn");
const addToCartBtns = document.querySelectorAll(".addToCart");
const itemsInCart = document.getElementById("itemsInCart");
const totalLabel = document.getElementById("totalLabel");
const updateCart = document.getElementById("updateCart");
const payBtn = document.getElementById("payBtn");
const inforCloneDiv = document.getElementById("inforClone");
const backdrop = document.getElementById("modal");
const waiting = document.getElementById("waiting");
const signupBtn = document.getElementById("signupBtn");
const userNameP = document.getElementById("userNameP");
const discountInform = document.getElementById("discountInform");

backdrop.classList.add("hide");
waiting.classList.add("hide");
inforCloneDiv.classList.add("hide");

let cartId = null;
let bookType = "IT";
let role = "user";
let hasInfor = "no";

if (userNameP.innerText === "") {
    logoutBtn.classList.add("hide");
    signupBtn.classList.remove("hide");
    discountInform.innerText = "*Đăng ký tài khoản Book Store để được giảm 10% giá trị cho mọi hóa đơn.";
    role = "clone";
}
else {
    logoutBtn.classList.remove("hide");
    signupBtn.classList.add("hide");
    discountInform.innerText = "*Tài khoản của bạn được giảm 10% giá trị cho mọi hóa đơn.";
}

itBooks.style.backgroundColor = "#A9A9A9";
comicBooks.style.backgroundColor = "";
scienceBooks.style.backgroundColor = "";
literatureBooks.style.backgroundColor = "";
novels.style.backgroundColor = "";

cart.classList.add("hide");

function addBookToUI(book) {
    let viewBook = document.createElement("div");
    viewBook.classList.add("viewBook");

    let img = document.createElement("img");
    img.src = book.urlImg;

    let name = document.createElement("p");
    name.innerText = book.name;

    let addBtn = document.createElement("button");
    addBtn.classList.add("addToCart")
    addBtn.innerText = "Thêm vào giỏ hàng";
    addBtn.dataset.bookId = book.bookId;

    let viewDetailBtn = document.createElement("button");
    viewDetailBtn.classList.add("viewDetailBtn");
    viewDetailBtn.innerText = "Xem chi tiết";
    viewDetailBtn.dataset.bookId = book.bookId;

    viewBook.appendChild(img);
    viewBook.appendChild(name);
    viewBook.appendChild(addBtn);
    viewBook.appendChild(viewDetailBtn);

    mainView.appendChild(viewBook);
}

itBooks.addEventListener("click", async function () {
    bookType = "IT";

    itBooks.style.backgroundColor = "#A9A9A9";
    novels.style.backgroundColor = "";
    comicBooks.style.backgroundColor = "";
    scienceBooks.style.backgroundColor = "";
    literatureBooks.style.backgroundColor = "";

    mainView.innerHTML = "";

    let response = await fetch("/api/book/getBookType?type=IT");
    let books = await response.json();
    for (let i = 0; i < books.length; i++) {
        addBookToUI(books[i]);
    }
});

novels.addEventListener("click", async function () {
    bookType = "Novel";

    itBooks.style.backgroundColor = "";
    novels.style.backgroundColor = "#A9A9A9";
    comicBooks.style.backgroundColor = "";
    scienceBooks.style.backgroundColor = "";
    literatureBooks.style.backgroundColor = "";

    mainView.innerHTML = "";

    let response = await fetch("/api/book/getBookType?type=Novel");
    let books = await response.json();
    for (let i = 0; i < books.length; i++) {
        addBookToUI(books[i]);
    }
});

comicBooks.addEventListener("click", async function () {
    bookType = "comic";

    itBooks.style.backgroundColor = "";
    novels.style.backgroundColor = "";
    comicBooks.style.backgroundColor = "#A9A9A9";
    scienceBooks.style.backgroundColor = "";
    literatureBooks.style.backgroundColor = "";

    mainView.innerHTML = "";

    let response = await fetch("/api/book/getBookType?type=comic");
    let books = await response.json();
    for (let i = 0; i < books.length; i++) {
        addBookToUI(books[i]);
    }
});

scienceBooks.addEventListener("click", async function () {
    bookType = "Science";

    itBooks.style.backgroundColor = "";
    novels.style.backgroundColor = "";
    comicBooks.style.backgroundColor = "";
    scienceBooks.style.backgroundColor = "#A9A9A9";
    literatureBooks.style.backgroundColor = "";

    mainView.innerHTML = "";

    let response = await fetch("/api/book/getBookType?type=Science");
    let books = await response.json();
    for (let i = 0; i < books.length; i++) {
        addBookToUI(books[i]);
    }
});

literatureBooks.addEventListener("click", async function () {
    bookType = "literature";

    itBooks.style.backgroundColor = "";
    novels.style.backgroundColor = "";
    comicBooks.style.backgroundColor = "";
    scienceBooks.style.backgroundColor = "";
    literatureBooks.style.backgroundColor = "#A9A9A9";

    mainView.innerHTML = "";

    let response = await fetch("/api/book/getBookType?type=literature");
    let books = await response.json();
    for (let i = 0; i < books.length; i++) {
        addBookToUI(books[i]);
    }
});

mainView.addEventListener("click", async function (e) {
    if (e.target.classList.contains("viewDetailBtn")) {
        let bookId = e.target.dataset.bookId;
        window.location.href = "/viewDetail?bookId=" + bookId;
    }

    else if (e.target.classList.contains("addToCart")) {
        waiting.classList.remove("hide");

        if (cartId === null) {
            await fetch("/api/createCart", {
                method: "POST"
            });

            let res = await getcartId();
            cartId = res.cartId;

            role = await fetch("/api/user/getRoleUser").then(res => res.text());
        }

        let bookId = e.target.dataset.bookId;

        res = await fetch("/api/checkExistItem?cartId=" + cartId + "&bookId=" + bookId);
        let result = await res.text();

        if (result === "true") {
            waiting.classList.add("hide");
            alert("Sản phẩm đang có trong giỏ hàng");
            return;
        }

        await fetch("/api/addItemCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cartId: cartId,
                bookId: bookId
            })
        });

        waiting.classList.add("hide");

        alert("Thêm thành công");
    }
});

async function getItemsInCart() {
    let items = await fetch("/api/viewCart");
    role = await fetch("/api/user/getRoleUser").then(res => res.text());
    return items.json();
}

function formatTotal(total) {
    let ans = "";
    let arr = total.split('');
    arr.reverse();
    for (let i = 0; i < arr.length; i++) {
        ans = arr[i] + ans;
        if ((i + 1) % 3 === 0 && i > 0 && (i + 1) < arr.length) ans = '.' + ans;
    }
    return ans;
}

async function addItemToUI() {
    let items = await getItemsInCart();

    itemsInCart.innerHTML = "";
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        let itemsDiv = document.createElement("div");
        itemsDiv.classList.add("itemsDiv");
        itemsDiv.dataset.bookId = items[i].bookId;

        let bookName = document.createElement("p");
        bookName.classList.add("bookNameElement");
        bookName.innerText = items[i].bookName;

        let qty = document.createElement("input");
        qty.classList.add("qtyItemInput");
        qty.type = "text";
        qty.value = items[i].quantity;

        let delItemBtn = document.createElement("button");
        delItemBtn.classList.add("delItemBtn");
        delItemBtn.innerText = "Xóa";
        delItemBtn.dataset.bookId = items[i].bookId;

        itemsDiv.appendChild(bookName);
        itemsDiv.appendChild(qty);
        itemsDiv.appendChild(delItemBtn);

        itemsInCart.appendChild(itemsDiv);

        total += items[i].quantity * items[i].price;
    }

    if (role === "user") total -= total * 0.1;

    totalLabel.innerText = "Tổng tiền: " + formatTotal(total + "") + " VND";
}

cartBtn.addEventListener("click", async function () {
    waiting.classList.remove("hide");

    if (cartId === null) {
        await fetch("/api/createCart", {
            method: "POST"
        });

        let res = await getcartId();
        cartId = res.cartId;

        role = await fetch("/api/user/getRoleUser").then(res => res.text());
    }

    await addItemToUI();

    waiting.classList.add("hide");

    cart.classList.toggle("hide");
});

logoutBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    await fetch("/api/deleteCart", {
        method: "POST"
    });
    cartId = null;

    window.location.href = "/logout";
});

async function getcartId() {
    let res = await fetch("/api/findCart");

    if (res.ok) return res.json();
    else return null;
}

updateCart.addEventListener("click", async function () {
    waiting.classList.remove("hide");

    let items = await getItemsInCart();

    if (items.length === 0) {
        waiting.classList.add("hide");
        alert("Giỏ hàng trống, vui lòng thêm sản phẩm");
        return;
    }

    let itemsDiv = document.querySelectorAll(".itemsDiv");
    let index = 0;
    itemsDiv.forEach(i => {
        let qty = i.querySelector(".qtyItemInput").value.trim();
        if (qty === "") {
            waiting.classList.add("hide");
            alert("Vui lòng nhập số lượng sản phẩm");
            return;
        }
        items[index].quantity = qty;
        index++;
    });

    await fetch("/api/updateCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(items)
    });

    items = await getItemsInCart();
    await addItemToUI();

    waiting.classList.add("hide");

    alert("Cập nhật giỏ hàng thành công");
});

async function deleteItemCart(bookId) {
    await fetch("/api/deleteItemCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cartId: cartId,
            bookId: bookId
        })
    });

    await addItemToUI();
}

itemsInCart.addEventListener("click", async function (e) {
    if (e.target.classList.contains("delItemBtn")) {
        let bookId = e.target.dataset.bookId;
        await deleteItemCart(bookId);
    }
});

function markItem(bookIds) {
    let itemsDivs = document.querySelectorAll(".itemsDiv");
    itemsDivs.forEach(itemsDiv => {
        if (bookIds.includes(itemsDiv.dataset.bookId)) {
            itemsDiv.style.backgroundColor = "coral";
        }
    });
}

function originalForm(total) {
    let arr = total.split(".");
    return arr.join('');
}

payBtn.addEventListener("click", async function () {
    waiting.classList.remove("hide");

    let items = await getItemsInCart();

    if (items.length === 0) {
        waiting.classList.add("hide");
        alert("Giỏ hàng đang trống, vui lòng thêm sản phẩm");
        return;
    }

    let totalAmount = originalForm((totalLabel.innerText.split(" "))[2]);

    if (role === "clone" && hasInfor === "no") {
        inforCloneDiv.classList.remove("hide");
        backdrop.classList.remove("hide");
        waiting.classList.add("hide");
        return;
    }

    let res = await fetch("/api/payCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            totalAmount: totalAmount,
            cartDetail: items
        })
    });

    let mess = await res.json();

    if (mess.result === "false") {
        alert("Không đủ sản phẩm");
        waiting.classList.add("hide");
        markItem(mess.bookIds);
        return;
    }

    await fetch("/api/deleteCart", {
        method: "POST"
    });
    cartId = null;

    if (role === "clone") {
        await fetch("/api/user/deleteCloneUser", {
            method: "POST"
        });
    }
    hasInfor = "no";

    waiting.classList.add("hide");

    alert("Thanh toán thành công");

    cart.classList.add("hide");
    itemsInCart.innerHTML = "";
    totalLabel.innerText = "Tổng tiền: 0 VND";
});