(function(){
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    fetch('route.json')
    .then(response => response.json())
    .then(data => {
        let html = data.find(i=>i.route == page || "main");
        console.log(html);
    });
})();

