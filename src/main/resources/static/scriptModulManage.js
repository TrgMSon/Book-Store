// Tim kiem chi ap dung cho module sach.
searchFormManage.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!viewingBook) return;

    const target = searchInputManage.value.trim();

    // Neu xoa tu khoa thi quay lai danh sach sach mac dinh.
    if (target === "") {
        listItem.innerHTML = "";
        clearSelectedItems();
        resetBookListState();
        await loadBook();
        return;
    }

    const response = await fetch("/api/book/searchBookManage?name=" + encodeURIComponent(target));
    const books = await response.json();

    listItem.innerHTML = "";
    clearSelectedItems();
    hasMore = false;
    isLoading = false;

    if (books.length === 0) {
        alert("Không có kết quả phù hợp");
        return;
    }

    for (let i = 0; i < books.length; i++) {
        addBookToUI(books[i]);
    }
});

function formatDate(date) {
    const arr = date.split("T")[0].split("-");
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
}

// Popup chi tiet hoa don: nguoi mua, danh sach san pham, tong tien.
async function loadDetailInvoice(invoice) {
    const invoiceId = invoice.dataset.invoiceId;
    const response = await fetch("/api/manage/viewInvoiceDetail?invoiceId=" + invoiceId);
    const invoiceData = await response.json();

    const inforDiv = document.createElement("div");
    inforDiv.classList.add("infor-div");

    const userName = document.createElement("p");
    userName.innerText = "Người mua: " + invoiceData.userName;
    userName.classList.add("header");

    const email = document.createElement("p");
    email.innerText = "Email: " + invoiceData.email;

    const lbDetail = document.createElement("p");
    lbDetail.innerText = "Danh sách sản phẩm:";
    lbDetail.classList.add("header");

    inforDiv.appendChild(userName);
    inforDiv.appendChild(email);
    inforDiv.appendChild(lbDetail);

    const details = invoiceData.invoiceDetails;
    const detailElement = document.createElement("table");
    const titleRow = document.createElement("tr");
    titleRow.classList.add("header");

    const title1 = document.createElement("th");
    title1.innerText = "Tên sách";
    const title2 = document.createElement("th");
    title2.innerText = "Số lượng";
    const title3 = document.createElement("th");
    title3.innerText = "Đơn giá (VND)";

    titleRow.appendChild(title1);
    titleRow.appendChild(title2);
    titleRow.appendChild(title3);
    detailElement.appendChild(titleRow);

    for (let i = 0; i < details.length; i++) {
        const row = document.createElement("tr");

        const bookName = document.createElement("th");
        bookName.innerText = details[i].bookName;
        const quantity = document.createElement("th");
        quantity.innerText = details[i].quantity;
        const price = document.createElement("th");
        price.innerText = formatTotal(details[i].price + "");

        row.appendChild(bookName);
        row.appendChild(quantity);
        row.appendChild(price);
        detailElement.appendChild(row);
    }

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Đóng";
    closeBtn.classList.add("closeBtn");
    closeBtn.addEventListener("click", function () {
        closeInforPanel(inforDiv);
    });

    const total = document.createElement("p");
    total.innerText = "Tổng tiền: " + formatTotal(invoiceData.totalAmount + "") + " VND";
    total.classList.add("header");

    inforDiv.appendChild(detailElement);
    inforDiv.appendChild(total);
    inforDiv.appendChild(closeBtn);
    mainView.appendChild(inforDiv);
}

// Moi dong trong danh sach hoa don tuong ung voi mot hoa don.
function addInvoiceToUI(invoice) {
    const liElement = document.createElement("li");
    liElement.dataset.invoiceId = invoice.invoiceId;
    liElement.classList.add("item");

    const invoiceId = document.createElement("p");
    invoiceId.innerText = "ID: " + invoice.invoiceId;

    const createdAt = document.createElement("p");
    createdAt.innerText = formatDate(invoice.createdAt);

    liElement.appendChild(invoiceId);
    liElement.appendChild(createdAt);

    listItem.appendChild(liElement);

    liElement.addEventListener("click", function () {
        if (document.querySelector(".infor-div") === null) {
            setSelectedItem(liElement);
            loadDetailInvoice(liElement);
        }
    });
}

// Chuyen sang module hoa don: an nut them sach va nap danh sach hoa don.
manageInvoiceBtn.addEventListener("click", async function () {
    addBtn.classList.add("hide");

    viewingBook = false;
    viewingInvoice = true;

    listItem.innerHTML = "";
    clearSelectedItems();
    setActiveTab(manageInvoiceBtn);
    setSearchAvailability(false, "Tìm kiếm chỉ hỗ trợ ở mục đầu sách");

    const response = await fetch("/api/manage/getAllInvoice");
    const invoices = await response.json();

    for (let i = 0; i < invoices.length; i++) {
        addInvoiceToUI(invoices[i]);
    }
});
