// Get DOM elements
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

// Initialize variables
const country = ["us", "cn", "uk", "gb", "br"];
const options = ["entertainment"];
let requestURL;

// Function to generate the user interface based on fetched articles
const generateUI = (articles) => {
    container.innerHTML = "";
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
        <div class="news-image-container">
            <img src="${item.urlToImage || 'https://fwmedia.fandomwire.com/wp-content/uploads/2023/07/14230831/Call-of-Duty-2024.jpg'}" alt="News Image"/>
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
                ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank" class="view-button">Read More</a>
        </div>`;
        container.appendChild(card);
    }
};

// Function to fetch news data from the API
const getNews = async () => {
    container.innerHTML = "";
    try {
        let response = await fetch(requestURL);
        if (!response.ok) {
            alert("Data unavailable at the moment. Please try again later.");
            return false;
        }
        let data = await response.json();
        console.log(data); // Log the entire response to inspect it
        generateUI(data.results || data.articles || []); // Adjust according to the actual API response structure
    } catch (error) {
        console.error("Error fetching the news data:", error);
        alert("An error occurred while fetching the news data. Please try again later.");
    }
};

// Initialize options and fetch news on page load
const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
};

// Set request URL and initialize on page load
window.onload = () => {
    requestURL = `https://newsdata.io/api/1/news?apikey=pub_45383d428ac1fbcd851fb29fb14535fd6184b&q=call%20of%20duty%20games&country=br,cn,de,gb,us&category=entertainment`;
    init();
};
