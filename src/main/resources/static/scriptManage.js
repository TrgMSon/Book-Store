const logoutBtn = document.getElementById("logoutBtn");
const manageBookBtn = document.getElementById("manageBookBtn");
const listItem = document.querySelector(".listItem");
const mainView = document.querySelector(".main-view");
const addBtn = document.getElementById("addBtn");

let isLoading = false;
let hasMore = true;
let pageIndex = 0;

logoutBtn.addEventListener("click", function () {
    window.location.href = "/logout";
});

async function loadBook() {
    if (isLoading || !hasMore) return;

    isLoading = true;

    let res = await fetch("/api/book/pagingBook?index=" + pageIndex);
    let books = await res.json();

    if (books.length === 0) {
        hasMore = false;
        return;
    }

    for (let book of books) {
        addBookToUI(book);
    }

    isLoading = false;
    pageIndex++;
}

let viewingInvoice = false;
let viewingBook = true;

manageBookBtn.style.backgroundColor = "#A9A9A9";
loadBook();

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

async function loadDetailBook(bookItem) {
    let res = await fetch("/api/book/viewBook?bookId=" + bookItem.dataset.bookId);
    let bookInfor = await res.json();

    let inforDiv = document.createElement("div");
    inforDiv.classList.add("infor-div");

    let bookName = document.createElement("p");
    bookName.innerText = "Tên sách: " + bookInfor.name;
    bookName.classList.add("header");

    let author = document.createElement("p");
    author.innerText = "Tác giả: " + bookInfor.author;
    author.classList.add("header");

    let publish = document.createElement("p");
    publish.innerText = "Năm xuất bản: " + bookInfor.publish;
    publish.classList.add("header");

    let description = document.createElement("p");
    let lbDes = document.createElement("p");
    lbDes.innerText = "Mô tả:";
    lbDes.classList.add("header");
    description.innerText = bookInfor.description;

    let qty = document.createElement("p");
    qty.innerText = "Số lượng trong kho: " + bookInfor.quantity;
    qty.classList.add("qtyElement");
    qty.classList.add("header");

    let price = document.createElement("p");
    price.innerText = "Giá: " + formatTotal(bookInfor.price + "") + " VND";
    price.classList.add("header");

    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Đóng";
    closeBtn.classList.add("closeBtn");
    closeBtn.addEventListener("click", function () {
        let liElements = document.querySelectorAll(".item");
        liElements.forEach(li => {
            li.style.backgroundColor = "";
        });

        inforDiv.classList.remove("infor-div");
        mainView.removeChild(inforDiv);
    });

    let editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Sửa";
    editBtn.dataset.bookId = bookInfor.bookId;

    let delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.innerText = "Xóa";
    delBtn.dataset.bookId = bookInfor.bookId;

    inforDiv.appendChild(bookName);
    inforDiv.appendChild(author);
    inforDiv.appendChild(publish);
    inforDiv.appendChild(lbDes);
    inforDiv.appendChild(description);
    inforDiv.appendChild(qty);
    inforDiv.appendChild(price);
    inforDiv.appendChild(closeBtn);
    inforDiv.appendChild(editBtn);
    inforDiv.appendChild(delBtn);

    mainView.appendChild(inforDiv);
}

function loadAddBookForm() {
    let inforDiv = document.createElement("div");
    inforDiv.classList.add("infor-div");

    let bookName = document.createElement("input");
    bookName.id = "bookName";
    let lbName = document.createElement("p");
    lbName.innerText = "Tên sách:";

    let author = document.createElement("input");
    author.id = "author";
    let lbAuthor = document.createElement("p");
    lbAuthor.innerText = "Tác giả:";

    let publish = document.createElement("input");
    publish.id = "publish";
    let lbPublish = document.createElement("p");
    lbPublish.innerText = "Năm xuất bản:";

    let type = document.createElement("input");
    type.id = "type";
    let lbType = document.createElement("p");
    lbType.innerText = "Thể loại:";

    let desc = document.createElement("textarea");
    desc.id = "desc";
    desc.style.minHeight = "80px";
    desc.style.resize = "none";
    let lbDesc = document.createElement("p");
    lbDesc.innerText = "Mô tả:";

    let price = document.createElement("input");
    price.id = "price";
    let lbPrice = document.createElement("p");
    lbPrice.innerText = "Giá (VND):";

    let qty = document.createElement("input");
    qty.id = "qty";
    let lbQty = document.createElement("p");
    lbQty.innerText = "Số lượng:";

    let imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.accept = "image/*";
    imgInput.id = "imgInput";
    let lbImgInput = document.createElement("p");
    lbImgInput.innerText = "Chọn ảnh:";

    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Đóng";
    closeBtn.classList.add("closeBtn");
    closeBtn.addEventListener("click", function () {
        inforDiv.classList.remove("infor-div");
        mainView.removeChild(inforDiv);
    });

    let acptBtn = document.createElement("button");
    acptBtn.id = "acptBtn";
    acptBtn.innerText = "Xác nhận";
    acptBtn.classList.add("acptBtn");

    inforDiv.appendChild(lbName);
    inforDiv.appendChild(bookName);
    inforDiv.appendChild(lbAuthor);
    inforDiv.appendChild(author);
    inforDiv.appendChild(lbPublish);
    inforDiv.appendChild(publish);
    inforDiv.appendChild(lbType);
    inforDiv.appendChild(type);
    inforDiv.appendChild(lbDesc);
    inforDiv.appendChild(desc);
    inforDiv.appendChild(lbPrice);
    inforDiv.appendChild(price);
    inforDiv.appendChild(lbQty);
    inforDiv.appendChild(qty);
    inforDiv.appendChild(lbImgInput);
    inforDiv.appendChild(imgInput);
    inforDiv.appendChild(closeBtn);
    inforDiv.appendChild(acptBtn);

    mainView.appendChild(inforDiv);
}

addBtn.addEventListener("click", function () {
    if (document.querySelector(".infor-div") === null) loadAddBookForm();
});

function addBookToUI(book) {
    let liElement = document.createElement("li");
    liElement.dataset.bookId = book.bookId;
    liElement.classList.add("item");

    let bookName = document.createElement("p");
    bookName.innerText = book.name;

    let type = document.createElement("p");
    type.innerText = "(" + book.type + ")";

    liElement.appendChild(bookName);
    liElement.appendChild(type);

    listItem.appendChild(liElement);

    liElement.addEventListener("click", function () {
        if (document.querySelector(".infor-div") === null) {
            liElement.style.backgroundColor = "#A9A9A9";
            
            let liElements = document.querySelectorAll(".item");
            liElements.forEach(li => {
                if (li.dataset.bookId != liElement.dataset.bookId) li.style.backgroundColor = "";
            });

            loadDetailBook(liElement);
        }
    });
}

manageBookBtn.addEventListener("click", async function () {
    addBtn.classList.remove("hide");

    viewingBook = true;
    viewingInvoice = false;

    manageBookBtn.style.backgroundColor = "#A9A9A9";
    manageInvoiceBtn.style.backgroundColor = "";

    pageIndex = 0;
    await loadBook();
});

listItem.addEventListener("scroll", async function () {
    if (listItem.scrollTop + listItem.clientHeight >= listItem.scrollHeight - 20) {
        if (viewingBook) await loadBook();
    }
});

mainView.addEventListener("click", async function (e) {
    if (e.target.classList.contains("editBtn")) {
        let qtyElement = document.querySelector(".qtyElement");
        let qtyInput = document.createElement("input");
        let updateBtn = document.createElement("button");

        updateBtn.innerText = "Cập nhật";
        updateBtn.style.marginTop = "10px";
        updateBtn.style.width = "40%";
        updateBtn.style.alignSelf = "center";
        updateBtn.addEventListener("click", async function () {
            await fetch("/api/book/addQtyBook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bookId: e.target.dataset.bookId,
                    quantity: qtyInput.value
                })
            });
            alert("Cập nhật số lượng thành công");

            let inforDiv = document.querySelector(".infor-div");
            mainView.removeChild(inforDiv);
        });

        qtyInput.value = qtyElement.innerText.split(" ")[4];
        qtyElement.replaceWith(qtyInput);
        e.target.replaceWith(updateBtn);
    }

    else if (e.target.classList.contains("acptBtn")) {
        let bookName = document.querySelector("#bookName");
        let author = document.querySelector("#author");
        let publish = document.querySelector("#publish");
        let type = document.querySelector("#type");
        let desc = document.querySelector("#desc");
        let price = document.querySelector("#price");
        let qty = document.querySelector("#qty");
        let imgInput = document.querySelector("#imgInput");

        if (bookName.value.trim() === "") {
            bookName.focus();
            return;
        }

        if (author.value.trim() === "") {
            author.focus();
            return;
        }

        if (publish.value.trim() === "") {
            publish.focus();
            return;
        }

        if (type.value.trim() === "") {
            type.focus();
            return;
        }

        if (desc.value.trim() === "") {
            desc.focus();
            return;
        }

        if (price.value.trim() === "") {
            price.focus();
            return;
        }

        if (qty.value.trim() === "") {
            qty.focus();
            return;
        }

        if (imgInput.value != "") {
            let formData = new FormData();
            let image = imgInput.files[0];
            formData.append("image", image);
            let response = await fetch("/api/book/upload-image", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                alert("Ảnh gửi lên quá 20MB, vui lòng thử lại");
                return;
            }

            let urlImg = await response.text();

            let bookData = {
                name: bookName.value.trim(),
                author: author.value.trim(),
                publish: publish.value.trim(),
                type: type.value.trim(),
                description: desc.value.trim(),
                price: price.value.trim(),
                urlImg: urlImg,
                quantity: qty.value.trim()
            }

            await fetch("/api/book/addBook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookData)
            });

            alert("Thêm đầu sách thành công");

            let inforDiv = document.querySelector(".infor-div");
            mainView.removeChild(inforDiv);
        }

        else imgInput.focus();
    }

    else if (e.target.classList.contains("delBtn")) {
        await fetch("/api/book/deleteBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId: e.target.dataset.bookId
            })
        });

        alert("Xóa đầu sách thành công");

        window.location.href = "/manage";
    }
});