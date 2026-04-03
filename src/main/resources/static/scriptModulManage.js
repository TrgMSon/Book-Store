const searchInputManage = document.getElementById("searchInputManage");
const searchFormManage = document.getElementById("searchFormManage");
const manageInvoiceBtn = document.getElementById("manageInvoiceBtn");

searchFormManage.addEventListener("submit", async function (e) {
    e.preventDefault();

    let target = searchInputManage.value.trim();

    if (target === "") return;

    let response = await fetch("/api/book/searchBookManage?name=" + target);
    let books = await response.json();

    if (books.length === 0) {
        alert("Không có kết quả phù hợp")
        return;
    }

    listItem.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        addBookToUI(books[i]);
    }
});

function formatDate(date) {
    let arr = date.split("T")[0].split("-");
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
}

async function loadDetailInvoice(invoice) {
    let invoiceId = invoice.dataset.invoiceId;
    let response = await fetch("/api/manage/viewInvoiceDetail?invoiceId=" + invoiceId);
    let invoiceData = await response.json();

    let inforDiv = document.createElement("div");
    inforDiv.classList.add("infor-div");

    let userName = document.createElement("p");
    userName.innerText = "Người mua: " + invoiceData.userName;

    let email = document.createElement("p");
    email.innerText = "Email: " + invoiceData.email;

    let lbDetail = document.createElement("p");
    lbDetail.innerText = "Danh sách sản phẩm: ";

    inforDiv.appendChild(userName);
    inforDiv.appendChild(email);
    inforDiv.appendChild(lbDetail);

    let details = invoiceData.invoiceDetails;
    let detailElement = document.createElement("table");
    let titleRow = document.createElement("tr");
    titleRow.classList.add("header");

    let title1 = document.createElement("th");
    title1.innerText = "Tên sách";
    let title2 = document.createElement("th");
    title2.innerText = "Số lượng";
    let title3 = document.createElement("th");
    title3.innerText = "Đơn giá (VND)";

    titleRow.appendChild(title1);
    titleRow.appendChild(title2);
    titleRow.appendChild(title3);
    detailElement.appendChild(titleRow);

    for (let i = 0; i < details.length; i++) {
        let row = document.createElement("tr");

        let bookName = document.createElement("th");
        bookName.innerText = details[i].bookName;
        let quantity = document.createElement("th");
        quantity.innerText = details[i].quantity;
        let price = document.createElement("th");
        price.innerText = formatTotal(details[i].price + "");

        row.appendChild(bookName);
        row.appendChild(quantity);
        row.appendChild(price);
        detailElement.appendChild(row);
    }

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

    let total = document.createElement("p");
    total.innerText = "Tổng tiền: " + formatTotal(invoiceData.totalAmount + "") + " VND";

    inforDiv.appendChild(detailElement);
    inforDiv.appendChild(total);
    inforDiv.appendChild(closeBtn);
    mainView.appendChild(inforDiv);
}

function addInvoiceToUI(invoice) {
    let liElement = document.createElement("li");
    liElement.dataset.invoiceId = invoice.invoiceId;
    liElement.classList.add("item");

    let invoiceId = document.createElement("p");
    invoiceId.innerText = "ID: " + invoice.invoiceId;

    let createdAt = document.createElement("p");
    createdAt.innerText = "(Ngày tạo: " + formatDate(invoice.createdAt) + ")";

    liElement.appendChild(invoiceId);
    liElement.appendChild(createdAt);

    listItem.appendChild(liElement);

    liElement.addEventListener("click", function () {
        if (document.querySelector(".infor-div") === null) {
            liElement.style.backgroundColor = "#A9A9A9";

            let liElements = document.querySelectorAll(".item");
            liElements.forEach(li => {
                if (li.dataset.invoiceId != liElement.dataset.invoiceId) li.style.backgroundColor = "";
            });

            loadDetailInvoice(liElement);
        }
    });
}

manageInvoiceBtn.addEventListener("click", async function () {
    addBtn.classList.add("hide");

    viewingBook = false;
    viewingInvoice = true;

    manageBookBtn.style.backgroundColor = "";
    manageInvoiceBtn.style.backgroundColor = "#A9A9A9";

    let response = await fetch("/api/manage/getAllInvoice");
    let invoices = await response.json();

    listItem.innerHTML = "";
    for (let i = 0; i < invoices.length; i++) {
        addInvoiceToUI(invoices[i]);
    }
});