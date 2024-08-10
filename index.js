document.addEventListener("DOMContentLoaded", function () {
    const tweetInput = document.getElementById("tweetInput");
    const agregarBtn = document.getElementById("agregarBtn");
    const tweetTableBody = document.querySelector("#tweetTable tbody");

    function renderTweets() {
        tweetTableBody.innerHTML = "";
        const tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        tweets.forEach((tweet, index) => {
            const row = document.createElement("tr");

            const tweetCell = document.createElement("td");
            tweetCell.textContent = tweet;
            row.appendChild(tweetCell);

            const actionsCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.classList.add("boton-eliminar");
            deleteButton.onclick = () => deleteTweet(index);
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);

            tweetTableBody.appendChild(row);
        });
    }

    function addTweet(tweet) {
        const tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        tweets.push(tweet);
        localStorage.setItem("tweets", JSON.stringify(tweets));
        renderTweets();
    }

    function deleteTweet(index) {
        let tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        tweets.splice(index, 1);
        localStorage.setItem("tweets", JSON.stringify(tweets));
        renderTweets();
    }

    agregarBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const tweet = tweetInput.value.trim();
        if (tweet) {
            addTweet(tweet);
            tweetInput.value = "";
        }
    });

    renderTweets();
});
