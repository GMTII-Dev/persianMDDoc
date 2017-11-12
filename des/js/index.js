readTextFile("manual.md", injectToHtml);

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                callback(allText);
            }
        }
    }
    rawFile.send(null);
}

function injectToHtml(response) {
    var text = document.createElement('div')
    var body = document.getElementsByTagName('body')
    body = body[0]

    text.innerHTML = marked(response)
    text.id = "content"
    var titles = text.getElementsByTagName('h1')

    var list = makeList(titles)
    var content = addLinkToTitle(text)
    console.log(content);

    body.appendChild(list)
    body.appendChild(content)
}

function makeList(titles, body) {
    var ul = document.createElement('ul')
    var div = document.createElement('div')
    div.id = 'list'
    div.className = 'none'
    for (var i = 0; i < titles.length; i++) {
        var a = document.createElement('a')
        var li = document.createElement('li')

        a.text = titles[i]['textContent']
        a.href = "#part" + i
        a.onclick = toggleDrawer
        li.appendChild(a)
        ul.appendChild(li)
    }
    div.appendChild(ul)
    return div

}

function addLinkToTitle(text) {
    var x = text.getElementsByTagName('h1')
    console.log(x);
    for (var i = 0; i < x.length; i++) {
        x[i].id = "part"+ i
        console.log(x[i]);
    }
    return text
}

function toggleDrawer() {
    document.getElementById('list').classList.toggle("none")
}