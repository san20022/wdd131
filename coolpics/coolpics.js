const menu_button = document.getElementById("menu");

menu_button.addEventListener("click", function () {
    document.getElementById("nav-links").classList.toggle("hide");
});

function handleResize() {
    if (window.innerWidth > 1000) {
        document.getElementById("menu").classList.add("hide");
        document.getElementById("nav-links").classList.remove("hide");
    }
    else {
        document.getElementById("menu").classList.remove("hide");
        document.getElementById("nav-links").classList.add("hide");
    }
}

window.addEventListener("resize", handleResize);

function viewerTemplate(pic, alt) {
    return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${pic}" alt="${alt}">
      </div>`;
}

function viewHandler(event) {
    if (event.target.nodeName === "IMG") {
        let pic = event.target.src;
        let newpic = pic.replace("sm", "full"); //replace small image with full size image
        const alt = event.target.alt;
        document.querySelector("body").insertAdjacentHTML("afterbegin", viewerTemplate(newpic, alt));

        const closeViewer = document.querySelector(".close-viewer");
        closeViewer.addEventListener("click", function () { document.querySelector(".viewer").remove(); });
    }
}

const gallery = document.querySelector(".gallery")
gallery.addEventListener("click", viewHandler);