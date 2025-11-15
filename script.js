const accesskey = "P2ccdgb2SqSTUW2Mm1FPT4ernrZobzHw1SnhbiU3z-A";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let page = 1;


window.addEventListener('load', () => {
    searchBox.value = '';
});


window.addEventListener('beforeunload', () => {
    searchBox.value = '';
});


function showLoading() {
    showMoreBtn.classList.add('loading');
    showMoreBtn.disabled = true;
    showMoreBtn.innerHTML = '<span class="loading-spinner"></span><span class="btn-text">Loading...</span>';
}


function hideLoading() {
    showMoreBtn.classList.remove('loading');
    showMoreBtn.disabled = false;
    showMoreBtn.innerHTML = '<span class="btn-text">Show More</span>';
}

async function searchImages() {
    const keyword = searchBox.value.trim();
    if (!keyword) return;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(
        keyword
    )}&client_id=${accesskey}&per_page=30`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        showMoreBtn.style.display = results.length > 0 ? "block" : "none";
        
      
        hideLoading();
        
    } catch (error) {
        console.error("Error fetching images:", error);
        hideLoading();
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    showLoading(); 
    page++;
    searchImages();
});

;
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
    });
}

function animateStars() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00faff";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        if(star.y < 0) star.y = canvas.height;
    });

    requestAnimationFrame(animateStars);
}

animateStars();
