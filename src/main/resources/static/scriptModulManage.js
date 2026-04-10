const searchInputManage = document.getElementById("searchInputManage");
const searchFormManage = document.getElementById("searchFormManage");
const manageInvoiceBtn = document.getElementById("manageInvoiceBtn");
const overViewBtn = document.getElementById("overView");

let ctx = null;
let myChart = null;
let firstTime = true;

function loadChartFirst() {
    ctx = chart.getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}

searchFormManage.addEventListener("submit", async function (e) {
    e.preventDefault();

    let target = searchInputManage.value.trim();

    if (target === "") return;

    if (viewingBook) {
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
    }

    else if (!viewingBook && !viewingInvoice) {
        let date = new Date();
        if (Number(target) > date.getFullYear()) {
            alert("Yêu cầu không được chấp nhận");
            return;
        }

        let incomes = await fetch("/api/manage/getTotalYear?date=" + target).then(res => res.json());

        myChart.data.datasets[0].data = incomes;
        myChart.data.datasets[0].label = 'Doanh thu năm ' + target + ' (VND)';
        myChart.update();
    }
});

function formatDate(date) {
    let arr = date.split("T")[0].split("-");
    return `${arr[2]}/${arr[1]}/${arr[0]} ${date.split("T")[1]}`;
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

    let checkDiscount = await fetch("/api/manage/checkDiscount?invoiceId=" + invoice.dataset.invoiceId).then(res => res.text());

    if (checkDiscount === "discount") {
        let note = document.createElement("p");
        note.innerText = "*Chiết khấu 10%";
        note.style.fontStyle = "italic";
        inforDiv.appendChild(note);
    }

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
    searchFormManage.style.display = "none";
    viewTitle.innerText = "Quản lý hóa đơn";

    addBtn.classList.add("hide");
    chart.style.display = "none";

    viewingBook = false;
    viewingInvoice = true;

    manageBookBtn.style.backgroundColor = "";
    manageInvoiceBtn.style.backgroundColor = "#A9A9A9";
    overViewBtn.style.backgroundColor = "";

    let response = await fetch("/api/manage/getAllInvoice");
    let invoices = await response.json();

    listItem.innerHTML = "";
    for (let i = 0; i < invoices.length; i++) {
        addInvoiceToUI(invoices[i]);
    }
});

overViewBtn.addEventListener("click", async function () {
    viewTitle.innerText = "Thống kê doanh thu";
    searchFormManage.style.display = "flex";
    searchInputManage.placeholder = "Tìm theo năm...";
    searchInputManage.value = "";

    addBtn.classList.add("hide");

    viewingBook = false;
    viewingInvoice = false;

    if (firstTime) {
        loadChartFirst();
        firstTime = false;
    }

    manageBookBtn.style.backgroundColor = "";
    manageInvoiceBtn.style.backgroundColor = "";
    overViewBtn.style.backgroundColor = "#A9A9A9";

    listItem.innerHTML = "";
    chart.style.display = "block";

    let date = new Date();
    let target = `${date.getFullYear()}`;

    let incomes = await fetch("/api/manage/getTotalYear?date=" + target).then(res => res.json());

    myChart.data.datasets[0].data = incomes;
    myChart.data.datasets[0].label = 'Doanh thu năm ' + target + ' (VND)';
    myChart.update();
});