(function(){
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    fetch('route.json')
    .then(response => response.json())
    .then(data => console.log(data));
})();

