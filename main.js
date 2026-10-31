
const app = document.getElementById("app");
const page = app.dataset.page;

const navLinks = [
    { name: "HOME", page: "home", icon: "⌂", url: "index.html" },
    { name: "TECHNOLOGY", page: "technology", icon: "📺", url: "technology.html" },
    { name: "CARS", page: "cars", icon: "🚘", url: "cars.html" },
    { name: "INVENTIONS", page: "inventions", icon: "💡", url: "inventions.html" },
    { name: "HISTORY", page: "history", icon: "📜", url: "history.html" },
    { name: "ABOUT", page: "about", icon: "ⓘ", url: "about.html" }
];

function header() {
    return `
        <header class="masthead">
            <div class="top-line">
                <span>THE PAST BUILDS THE FUTURE</span>
                <span>EST. 1980</span>
            </div>

            <div class="masthead-title">
                <div class="side-logo">🌍</div>

                <div class="title-center">
                    <h1>RETRO HISTORY</h1>
                    <p>HISTORY • TECHNOLOGY • INVENTIONS</p>
                </div>

                <div class="side-logo">🌍</div>
            </div>

            <div class="archive-line">
                <span>THE VINTAGE ARCHIVE</span>
                <span>1950 — 1980</span>
                <span>VOL. 01 — NO. 001</span>
            </div>

            <nav class="navigation">
                ${navLinks.map(link => `
                    <a href="${link.url}"
                       class="nav-link ${page === link.page ? "active" : ""}">
                        <span class="nav-icon">${link.icon}</span>
                        <span>${link.name}</span>
                    </a>
                `).join("")}
            </nav>
        </header>
    `;
}

function articleCard(article) {
    return `
        <article class="story-card" data-article="${article.id}">
            <div class="story-photo">
                <img src="${article.image}" alt="${article.title}"
                     onerror="this.src='https://placehold.co/600x400/e9e1ce/211d17?text=Vintage+Archive'">
            </div>

            <div class="story-info">
                <span class="category">${article.category} • ${article.year}</span>
                <h2>${article.title}</h2>
                <p>${article.short}</p>
                <button class="read-more">READ ARTICLE →</button>
            </div>
        </article>
    `;
}

function homePage() {
    const featured = articles[0];

    return `
        <main class="page-content">
            <div class="breaking-news">
                <strong>ARCHIVE NEWS</strong>
                <span>DISCOVER THE TECHNOLOGY, CARS AND INVENTIONS OF THE PAST</span>
            </div>

            <section class="welcome-section">
                <div class="welcome-text">
                    <span class="category">WELCOME TO THE ARCHIVE</span>
                    <h2>THE WORLD<br>OF YESTERDAY</h2>
                    <p>
                        Travel back in time and discover the machines,
                        inventions and moments that changed our world.
                    </p>
                </div>

                <div class="welcome-image">
                    <img src="${featured.image}" alt="${featured.title}">
                </div>
            </section>

            <div class="section-heading">
                <h2>FEATURED STORIES</h2>
                <span>FROM THE VINTAGE ARCHIVE</span>
            </div>

            <section class="stories-grid">
                ${articles.slice(0, 6).map(articleCard).join("")}
            </section>
        </main>
    `;
}

const pageInfo = {
    technology: {
        title: "TECHNOLOGY",
        subtitle: "THE MACHINES THAT CHANGED THE WORLD",
        category: "TECHNOLOGY"
    },
    cars: {
        title: "CLASSIC CARS",
        subtitle: "LEGENDS OF THE ROAD",
        category: "CARS"
    },
    inventions: {
        title: "GREAT INVENTIONS",
        subtitle: "IDEAS THAT CHANGED HUMANITY",
        category: "INVENTIONS"
    },
    history: {
        title: "HISTORY",
        subtitle: "IMPORTANT MOMENTS FROM THE PAST",
        category: "HISTORY"
    }
};

function categoryPage() {
    const info = pageInfo[page];
    const filtered = articles.filter(
        article => article.category === info.category
    );

    return `
        <main class="page-content">
            <div class="category-header">
                <span>THE VINTAGE ARCHIVE</span>
                <h2>${info.title}</h2>
                <p>${info.subtitle}</p>
            </div>

            <section class="stories-grid">
                ${filtered.length
                    ? filtered.map(articleCard).join("")
                    : "<p>No articles available yet.</p>"
                }
            </section>
        </main>
    `;
}

function aboutPage() {
    return `
        <main class="page-content about-page">
            <div class="category-header">
                <span>ESTABLISHED 1980</span>
                <h2>ABOUT THE ARCHIVE</h2>
                <p>THE STORY BEHIND RETRO HISTORY</p>
            </div>

            <div class="about-content">
                <h2>WELCOME TO RETRO HISTORY</h2>
                <p>
                    Retro History is a vintage archive dedicated to
                    the technology, automobiles, inventions and history
                    of the past.
                </p>
                <p>
                    Our goal is to introduce important objects and events
                    from earlier decades and explain who created them
                    and why they became memorable.
                </p>
                <div class="about-stamp">THE VINTAGE ARCHIVE</div>
            </div>
        </main>
    `;
}

function openArticle(id) {
    const article = articles.find(item => item.id === id);
    if (!article) return;

    const modal = document.getElementById("articleModal");

    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Close">×</button>
            <span class="category">${article.category} • ${article.year}</span>
            <h2>${article.title}</h2>
            <img src="${article.image}" alt="${article.title}">
            <p>${article.description}</p>
            <div class="creator">
                <strong>CREATOR / MANUFACTURER:</strong>
                <span>${article.creator}</span>
            </div>
        </div>
    `;

    modal.classList.add("show");
}

function footer() {
    return `
        <footer class="site-footer">
            <h2>RETRO HISTORY</h2>
            <p>THE PAST BUILDS THE FUTURE</p>
            <span>© 1980 — 2026 THE VINTAGE ARCHIVE</span>
        </footer>
    `;
}

function renderPage() {
    let content;

    if (page === "home") {
        content = homePage();
    } else if (page === "about") {
        content = aboutPage();
    } else {
        content = categoryPage();
    }

    app.innerHTML = `
        <div class="newspaper">
            ${header()}
            ${content}
            ${footer()}
            <div id="articleModal" class="article-modal"></div>
        </div>
    `;

    app.addEventListener("click", event => {
        const card = event.target.closest("[data-article]");

        if (card) {
            openArticle(card.dataset.article);
        }

        if (
            event.target.classList.contains("modal-close") ||
            event.target.classList.contains("article-modal")
        ) {
            document.getElementById("articleModal").classList.remove("show");
        }
    });
}

renderPage();
