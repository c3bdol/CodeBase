document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".btn");
    const hiddenCards = document.querySelectorAll(".cardformat");
    button.addEventListener("click", function () {
        hiddenCards.forEach(hedeen => {
            hedeen.classList.add("show");
        });
        button.style.display = "none";
    });
});
