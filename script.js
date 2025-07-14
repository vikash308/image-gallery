let item = document.getElementsByClassName("item");

async function getImage(index) {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();

        const container = item[index];
        const loader = container.querySelector(".load");

        const img = new Image();
        img.src = data.message;

        img.onload = () => {
            if (loader) loader.remove();
            img.style.display = "block";
        };

        container.appendChild(img);

        container.onclick = function () {
            openFullscreen(data.message);
        };
    } catch (err) {
        console.error("Image load failed:", err);
    }
}

function openFullscreen(imgSrc) {
    const overlay = document.createElement("div");
    overlay.classList.add("fullscreen-overlay");

    overlay.innerHTML = `
        <div class="fullscreen-image-container">
            <div class="spinner"></div>
            <img id="fullscreen-img" src="${imgSrc}" />
        </div>
    `;
    document.body.appendChild(overlay);

    const img = overlay.querySelector("#fullscreen-img");
    const spinner = overlay.querySelector(".spinner");

    img.style.display = "none";
    img.onload = () => {
        spinner.remove();
        img.style.display = "block";
    };

    overlay.onclick = () => overlay.remove();
}

for (let i = 0; i < item.length; i++) {
    getImage(i);
}
