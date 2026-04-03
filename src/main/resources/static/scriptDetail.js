const goBackBtn = document.getElementById("goBackBtn");
const price = document.getElementById("price");

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

let total = price.innerText
price.innerText = formatTotal(total);

goBackBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.history.back();
});