(function(){
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    console.log("page " , page);
    fetch('route.json')
    .then(response => response.json())
    .then(data => {
        let html = data.find(i=>i.route == page);
        console.log("html " , html);
        fetch("pages/" + html.html || "main" + "?v=" + Math.random())
        .then(response => {
            console.log("response " , response);
            document.querySelector("#main").innerHTML = response;
        });

    });
})();

