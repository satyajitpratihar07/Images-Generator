const accesskey = "P2ccdgb2SqSTUW2Mm1FPT4ernrZobzHw1SnhbiU3z-A";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let page = 1;

async function searchImages() {
  const keyword = searchBox.value.trim(); // always read fresh from input
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
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
