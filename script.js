document.addEventListener("DOMContentLoaded", function() {

    // Fetch and inject header.html
    fetch("/header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#headerContainer").innerHTML = data;

            // Once the header is loaded, attach event listeners to the menu titles
            let menuTitles = document.querySelectorAll(".menu-title");
            menuTitles.forEach(title => {
                title.addEventListener("click", function() {
                    let content = this.nextElementSibling;
                    if (content.style.display === "none" || content.style.display === "") {
                        content.style.display = "block";
                        localStorage.setItem(this.textContent, 'open');
                    } else {
                        content.style.display = "none";
                        localStorage.removeItem(this.textContent);
                    }
                });

                // Restore menu state from local storage
                if (localStorage.getItem(title.textContent)) {
                    title.nextElementSibling.style.display = "block";
                }
            });
        });

    // Fetch and inject footer.html
    fetch("/footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#footerContainer").innerHTML = data;
        });

    // AJAX-style content loading (using Fetch API)
    document.querySelectorAll('.menu-content a').forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();

            const href = this.getAttribute('href');

            const response = await fetch(href);
            const content = await response.text();

            document.getElementById('contentContainer').innerHTML = content;
        });
    });
});
