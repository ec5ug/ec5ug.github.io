document.addEventListener("DOMContentLoaded", function() {
var navbarPlaceholder = document.getElementById("navbar-placeholder");
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    navbarPlaceholder.innerHTML = this.responseText;
    }
};
xhttp.open("GET", "./navbar.html", true);
xhttp.send();
});