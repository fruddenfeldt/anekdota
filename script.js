document.addEventListener("DOMContentLoaded", function() {
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

    // AJAX-style content loading (using Fetch API)
    let links = document.querySelectorAll(".menu-content a");
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            fetch(this.href)
                .then(response => response.text())
                .then(data => {
                    // Assuming you have a content container to display the article
                    document.querySelector('#contentContainer').innerHTML = data;
                });
        });
    });
});

document.querySelectorAll('.menu-content a').forEach(link => {
    link.addEventListener('click', async function(e) {
        e.preventDefault();

        const href = this.getAttribute('href');
        
        const response = await fetch(href);
        const content = await response.text();

        document.getElementById('contentContainer').innerHTML = content;
    });
});

