const apiKey = "o96h6qEVzKYg4GXY3sZr8TWndrIvgd474IwkfGOA"; 
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

const statusDiv = document.getElementById("status");
const contentDiv = document.getElementById("content");

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch data. Please check your API key or internet connection.");
        }
        return response.json();
    })
    .then(data => {
        statusDiv.style.display = "none";
        contentDiv.classList.remove("hidden");

        document.getElementById("title").textContent = data.title;
        document.getElementById("date").textContent = `Date: ${data.date}`;
        document.getElementById("explanation").textContent = data.explanation;

        const mediaDiv = document.getElementById("media");

        if (data.media_type === "image") {
            const img = document.createElement("img");
            img.src = data.url;
            img.alt = data.title;
            mediaDiv.appendChild(img);
        } else if (data.media_type === "video") {
            const iframe = document.createElement("iframe");
            iframe.src = data.url;
            iframe.width = "100%";
            iframe.height = "500";
            iframe.allowFullscreen = true;
            mediaDiv.appendChild(iframe);
        }
    })
    .catch(error => {
        statusDiv.innerHTML = `<div id="error">${error.message}</div>`;
    });