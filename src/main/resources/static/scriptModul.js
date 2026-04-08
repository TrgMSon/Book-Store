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

    let response = await fetch("/api/book/searchBook?type=" + bookType + "&name=" + target);
    let books = await response.json();

    if (books.length === 0) {
        alert("Không có kết quả phù hợp")
        return;
    }

    mainView.innerHTML = "";

    for (let i = 0; i < books.length; i++) {
        addBookToUI(books[i]);
    }
});

inforCloneDiv.addEventListener("click", async function (e) {
    let nameInput = document.getElementById("nameInput");
    let mailInput = document.getElementById("mailInput");

    if (e.target.classList.contains("goBackInforClone")) {
        nameInput.value = "";
        mailInput.value = "";
        inforCloneDiv.classList.add("hide");
        backdrop.classList.add("hide");
    }

    else if (e.target.classList.contains("acptInforClone")) {
        let name = nameInput.value.trim();
        let email = mailInput.value.trim();

        if (name === "" || email === "") {
            alert("Vui lòng nhập đủ thông tin");
            return;
        }

        await fetch("/api/user/updateCloneInfor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        });

        hasInfor = "yes";

        alert("Lưu thông tin thành công");

        nameInput.value = "";
        mailInput.value = "";

        inforCloneDiv.classList.add("hide");
        backdrop.classList.add("hide");
    }
});

signupBtn.addEventListener("click", function () {
    window.location.href = "/signup";
});