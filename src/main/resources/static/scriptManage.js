// Gom cac phan tu DOM chinh cua trang quan ly.
const logoutBtn = document.getElementById("logoutBtn");
const goHomeBtn = document.getElementById("goHomeBtn");
const manageBookBtn = document.getElementById("manageBookBtn");
const manageInvoiceBtn = document.getElementById("manageInvoiceBtn");
const searchInputManage = document.getElementById("searchInputManage");
const searchFormManage = document.getElementById("searchFormManage");
const searchSubmitBtn = searchFormManage.querySelector("button");
const viewTitle = document.getElementById("viewTitle");
const listItem = document.querySelector(".listItem");
const mainView = document.querySelector(".main-view");
const addBtn = document.getElementById("addBtn");

let isLoading = false;
let hasMore = true;
let pageIndex = 0;

// Trang /manage mac dinh mo vao module dau sach.
let viewingInvoice = false;
let viewingBook = true;

goHomeBtn.addEventListener("click", function () {
    window.location.href = "/manage";
});

logoutBtn.addEventListener("click", function () {
    window.location.href = "/logout";
});

// Tieu de hien tai cua module dang xem.
function setViewTitle(title) {
    if (viewTitle) viewTitle.innerText = title;
}

// Danh dau tab dang duoc chon trong sidebar.
function setActiveTab(activeButton) {
    [manageBookBtn, manageInvoiceBtn].forEach(button => {
        button.classList.toggle("is-active", button === activeButton);
    });
}

function clearSelectedItems() {
    document.querySelectorAll(".item.is-selected").forEach(item => {
        item.classList.remove("is-selected");
    });
}

function setSelectedItem(activeItem) {
    document.querySelectorAll(".item").forEach(item => {
        item.classList.toggle("is-selected", item === activeItem);
    });
}

// Dong popup chi tiet hoặc form dang mo.
function closeInforPanel(inforDiv) {
    if (!inforDiv || !inforDiv.parentElement) return;

    clearSelectedItems();
    inforDiv.parentElement.removeChild(inforDiv);
}

// Reset phan trang khi quay lai module sach.
function resetBookListState() {
    isLoading = false;
    hasMore = true;
    pageIndex = 0;
}

// O tim kiem chi phuc vu module sach. Sang module hoa don se bi khoa.
function setSearchAvailability(isEnabled, placeholder) {
    searchInputManage.disabled = !isEnabled;
    searchSubmitBtn.disabled = !isEnabled;
    searchInputManage.placeholder = placeholder;

    if (!isEnabled) {
        searchInputManage.value = "";
    }
}

// Tai dau sach theo tung trang de tranh nap qua nhieu du lieu cung luc.
async function loadBook() {
    if (isLoading || !hasMore) return;

    isLoading = true;

    try {
        const res = await fetch("/api/book/pagingBook?index=" + pageIndex);
        const books = await res.json();

        if (books.length === 0) {
            hasMore = false;
            return;
        }

        for (const book of books) {
            addBookToUI(book);
        }

        pageIndex++;
    } finally {
        isLoading = false;
    }
}

function formatTotal(total) {
    let ans = "";
    const arr = total.split("");
    arr.reverse();

    for (let i = 0; i < arr.length; i++) {
        ans = arr[i] + ans;
        if ((i + 1) % 3 === 0 && i > 0 && (i + 1) < arr.length) ans = "." + ans;
    }

    return ans;
}

// Popup chi tiet sach: xem thong tin, sua so luong, xoa dau sach.
async function loadDetailBook(bookItem) {
    const res = await fetch("/api/book/viewBook?bookId=" + bookItem.dataset.bookId);
    const bookInfor = await res.json();

    const inforDiv = document.createElement("div");
    inforDiv.classList.add("infor-div");

    const bookName = document.createElement("p");
    bookName.innerText = "Tên sách: " + bookInfor.name;
    bookName.classList.add("header");

    const author = document.createElement("p");
    author.innerText = "Tác giả: " + bookInfor.author;
    author.classList.add("header");

    const publish = document.createElement("p");
    publish.innerText = "Năm xuất bản: " + bookInfor.publish;
    publish.classList.add("header");

    const lbDes = document.createElement("p");
    lbDes.innerText = "Mô tả:";
    lbDes.classList.add("header");

    const description = document.createElement("p");
    description.innerText = bookInfor.description;

    const qty = document.createElement("p");
    qty.innerText = "Số lượng trong kho: " + bookInfor.quantity;
    qty.classList.add("qtyElement", "header");

    const price = document.createElement("p");
    price.innerText = "Giá: " + formatTotal(bookInfor.price + "") + " VND";
    price.classList.add("header");

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Đóng";
    closeBtn.classList.add("closeBtn");
    closeBtn.addEventListener("click", function () {
        closeInforPanel(inforDiv);
    });

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Sửa";
    editBtn.dataset.bookId = bookInfor.bookId;

    const delBtn = document.createElement("button");
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

// Form them dau sach moi vao kho.
function loadAddBookForm() {
    const inforDiv = document.createElement("div");
    inforDiv.classList.add("infor-div");

    const bookName = document.createElement("input");
    bookName.id = "bookName";
    const lbName = document.createElement("p");
    lbName.innerText = "Tên sách:";

    const author = document.createElement("input");
    author.id = "author";
    const lbAuthor = document.createElement("p");
    lbAuthor.innerText = "Tác giả:";

    const publish = document.createElement("input");
    publish.id = "publish";
    const lbPublish = document.createElement("p");
    lbPublish.innerText = "Năm xuất bản:";

    const type = document.createElement("input");
    type.id = "type";
    const lbType = document.createElement("p");
    lbType.innerText = "Thể loại:";

    const desc = document.createElement("textarea");
    desc.id = "desc";
    desc.rows = 4;
    desc.style.resize = "vertical";
    const lbDesc = document.createElement("p");
    lbDesc.innerText = "Mô tả:";

    const price = document.createElement("input");
    price.id = "price";
    const lbPrice = document.createElement("p");
    lbPrice.innerText = "Giá (VND):";

    const qty = document.createElement("input");
    qty.id = "qty";
    const lbQty = document.createElement("p");
    lbQty.innerText = "Số lượng:";

    const imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.accept = "image/*";
    imgInput.id = "imgInput";
    const lbImgInput = document.createElement("p");
    lbImgInput.innerText = "Chọn ảnh:";

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Đóng";
    closeBtn.classList.add("closeBtn");
    closeBtn.addEventListener("click", function () {
        closeInforPanel(inforDiv);
    });

    const acptBtn = document.createElement("button");
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

// Moi dong trong danh sach tuong ung voi mot dau sach.
function addBookToUI(book) {
    const liElement = document.createElement("li");
    liElement.dataset.bookId = book.bookId;
    liElement.classList.add("item");

    const bookName = document.createElement("p");
    bookName.innerText = book.name;

    const type = document.createElement("p");
    type.innerText = book.type;

    liElement.appendChild(bookName);
    liElement.appendChild(type);

    listItem.appendChild(liElement);

    liElement.addEventListener("click", function () {
        if (document.querySelector(".infor-div") === null) {
            setSelectedItem(liElement);
            loadDetailBook(liElement);
        }
    });
}

// Quay lai module sach va tai lai danh sach tu trang dau tien.
manageBookBtn.addEventListener("click", async function () {
    addBtn.classList.remove("hide");
    addBtn.innerText = "+ Thêm sách";

    viewingBook = true;
    viewingInvoice = false;

    listItem.innerHTML = "";
    clearSelectedItems();
    setActiveTab(manageBookBtn);
    setViewTitle("Quản lý đầu sách");
    setSearchAvailability(true, "Tìm theo tên sách...");
    resetBookListState();

    await loadBook();
});

// Infinite scroll cho danh sach sach.
listItem.addEventListener("scroll", async function () {
    if (listItem.scrollTop + listItem.clientHeight >= listItem.scrollHeight - 20) {
        if (viewingBook) await loadBook();
    }
});

// Cum xu ly cac thao tac trong popup sach: cap nhat so luong, them, xoa.
mainView.addEventListener("click", async function (e) {
    if (e.target.classList.contains("editBtn")) {
        const qtyElement = document.querySelector(".qtyElement");
        const qtyInput = document.createElement("input");
        const updateBtn = document.createElement("button");

        updateBtn.innerText = "Cập nhật";
        updateBtn.classList.add("updateBtn");
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

            const inforDiv = document.querySelector(".infor-div");
            closeInforPanel(inforDiv);
        });

        qtyInput.value = qtyElement.innerText.split(": ").pop();
        qtyElement.replaceWith(qtyInput);
        e.target.replaceWith(updateBtn);
    }

    else if (e.target.classList.contains("acptBtn")) {
        const bookName = document.querySelector("#bookName");
        const author = document.querySelector("#author");
        const publish = document.querySelector("#publish");
        const type = document.querySelector("#type");
        const desc = document.querySelector("#desc");
        const price = document.querySelector("#price");
        const qty = document.querySelector("#qty");
        const imgInput = document.querySelector("#imgInput");

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

        if (imgInput.value !== "") {
            const formData = new FormData();
            const image = imgInput.files[0];
            formData.append("image", image);

            const response = await fetch("/api/book/upload-image", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                alert(errorMessage || "Ảnh gửi lên quá 20MB, vui lòng thử lại");
                return;
            }

            const urlImg = await response.text();

            const bookData = {
                name: bookName.value.trim(),
                author: author.value.trim(),
                publish: publish.value.trim(),
                type: type.value.trim(),
                description: desc.value.trim(),
                price: price.value.trim(),
                urlImg: urlImg,
                quantity: qty.value.trim()
            };

            await fetch("/api/book/addBook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookData)
            });

            alert("Thêm đầu sách thành công");

            const inforDiv = document.querySelector(".infor-div");
            closeInforPanel(inforDiv);

            listItem.innerHTML = "";
            resetBookListState();
            await loadBook();
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

        const deletedItem = document.querySelector(`.item[data-book-id="${e.target.dataset.bookId}"]`);
        const inforDiv = document.querySelector(".infor-div");

        if (deletedItem) deletedItem.remove();
        closeInforPanel(inforDiv);
    }
});

// Trang thai mac dinh khi vao man hinh quan ly.
setActiveTab(manageBookBtn);
setViewTitle("Quản lý đầu sách");
setSearchAvailability(true, "Tìm theo tên sách...");
loadBook();
