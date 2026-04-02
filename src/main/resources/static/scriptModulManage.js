const searchInputManage = document.getElementById("searchInputManage");
const searchFormManage = document.getElementById("searchFormManage");

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
        console.log(books[i]);
        addBookToUI(books[i]);
    }
});