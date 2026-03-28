// https://stackoverflow.com/questions/814564/inserting-html-elements-with-javascript

function link(href, text) {
    return '<a href="' + href + '">' + text + "</a>";
}

let header = document.createElement("header");
header.className = "banner";
header.role = "banner";
header.innerHTML = "<nav>" + link("index.html", "Home Page") + link("portfolio.html", "Portfolio") + link("resume.html", "Resume") + "</nav>";
document.body.insertBefore(header, document.body.childNodes[0]);

let footer = document.createElement("footer");
footer.className = "banner";
footer.innerHTML = "<nav>" + link("https://github.com/the-alex-g", "GitHub") + link("https://the-alex-g.itch.io", "Itch") + link("https://rose-hulman.joinhandshake.com/profiles/the-alex-g", "Handshake") + "</nav>";
document.body.appendChild(footer);