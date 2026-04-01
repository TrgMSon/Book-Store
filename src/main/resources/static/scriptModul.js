const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const goHomeBtn = document.getElementById("goHomeBtn");

goHomeBtn.addEventListener("click", function () {
    bookType = "IT";
    window.location.href = "/home";
});

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let target = searchInput.value.trim();

    if (target === "") return;

    mainView.innerHTML = "";

    let response = await fetch("/api/book/searchBook?type=" + bookType + "&name=" + target);
    let books = await response.json();
    for (let i = 0; i < books.length; i++) {
        console.log(books[i]);
        addBookToUI(books[i]);
    }
});