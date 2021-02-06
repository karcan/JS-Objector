(function(){
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    fetch('route.json', {

    })
    .then(response => response.json())
    .then(data => {
        let html = data.find(i=>i.route == page || "main");

        fetch("pages/" + html.html)
        .then(response => {
            document.querySelector("#main").innerHTML(response);
        });

    });
})();

