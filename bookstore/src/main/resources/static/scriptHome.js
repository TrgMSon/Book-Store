const itBooks = document.getElementById("itBook");
const viewDetailBtns = document.querySelectorAll(".viewDetailBtn");
const cart = document.getElementById("cart");
const cartBtn = document.getElementById("cartBtn");
const logoutBtn = document.getElementById("logoutBtn");
const addToCartBtns = document.querySelectorAll(".addToCart");
const itemsInCart = document.getElementById("itemsInCart");
const totalLabel = document.getElementById("totalLabel");
const updateCart = document.getElementById("updateCart");
const payBtn = document.getElementById("payBtn");

let cartId = null;

itBooks.style.backgroundColor = "#A9A9A9";
cart.classList.add("hide");

viewDetailBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        let bookId = this.dataset.bookId;
        window.location.href = "/viewDetail?bookId=" + bookId;
    })
});

async function getItemsInCart() {
    let items = await fetch("/api/viewCart");
    return items.json();
}

function formatTotal(total) {
    let ans = "";
    let arr = total.split('');
    arr.reverse();
    for (let i = 0; i < arr.length; i++) {
        if ((i - 1) % 2 === 0) ans += '.'; // format total
        ans += arr[i];
    }
    arr = ans.split('');
    return arr.join('');
}

async function addItemToUI() {
    let items = await getItemsInCart();

    itemsInCart.innerHTML = "";
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        let itemsDiv = document.createElement("div");
        itemsDiv.classList.add("itemsDiv");

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

    console.log(formatTotal(total + ""));
    totalLabel.innerText = "Tổng tiền: " + total + " VND";
}

cartBtn.addEventListener("click", async function () {
    cart.classList.toggle("hide");

    if (cartId != null) await addItemToUI();
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

addToCartBtns.forEach(addToCartBtn => {
    addToCartBtn.addEventListener("click", async function () {
        if (cartId === null) {
            await fetch("/api/createCart", {
                method: "POST"
            });

            let res = await getcartId();
            cartId = res.cartId;
        }

        res = await fetch("/api/checkExistItem?cartId=" + cartId + "&bookId=" + addToCartBtn.dataset.bookId);
        let result = await res.text();

        if (result === "true") {
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
                bookId: addToCartBtn.dataset.bookId
            })
        });
    });
});

updateCart.addEventListener("click", async function () {
    let items = await getItemsInCart();

    if (items.length === 0) {
        alert("Giỏ hàng trống, vui lòng thêm sản phẩm");
        return;
    }

    let itemsDiv = document.querySelectorAll(".itemsDiv");
    let index = 0;
    itemsDiv.forEach(i => {
        let qty = i.querySelector(".qtyItemInput").value.trim();
        if (qty === "") {
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

    alert("Cập nhật giỏ hàng thành công");

    items = await getItemsInCart();
    await addItemToUI();
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

async function markItem(bookIds) {
    let items = await getItemsInCart();


}

payBtn.addEventListener("click", async function () {
    let items = await getItemsInCart();
    let totalAmount = (totalLabel.innerText.split(" "))[2];

    if (items.length === 0) {
        alert("Giỏ hàng đang trống, vui lòng thêm sản phẩm");
        return;
    }

    console.log(items);

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
        markItem(mess.bookIds);
        return;
    }

    await fetch("/api/deleteCart", {
        method: "POST"
    });
    cartId = null;

    alert("Thanh toán thành công");

    cart.classList.add("hide");
    itemsInCart.innerHTML = "";
    totalLabel.innerText = "Tổng tiền: 0 VND";
});