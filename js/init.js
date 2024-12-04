import { Categories } from "./categories.js";
import { Products } from "./products.js";
import { cart } from "./cart.js";

/* global $ */

$.get('./templates/navigation.html',function(data){
    $('#nav-placeholder').replaceWith(data)
})

$.get('./templates/footer.html',function(data){
    $('#footer-placeholder').replaceWith(data)
})


$.get('./home.html', function (data) {
    $('#content-placeholder').replaceWith(data);
});




// shorthand for $(document).ready()
$(function () {
    loadScript('js/categories.js', categoriesFun);
    loadScript('js/products.js', productsFun);
});



var categoriesFun = function () {
    let categories = new Categories(); 
    categories.getAllCategories();
    categories.getSingleCategory()
};

var productsFun = function () {
    let products= new Products()
    products.loadProductDetails();
    cart.loadCart(); 
    cart.bindRemoveItem();
};

function loadScript(url, callback) {
    console.log("Attempting to load:", url);
    if (!url) {
        console.error("Error: URL is undefined or invalid!");
        return;
    }
    var head = document.head;
    var script = document.createElement("script");
    script.type = "module";
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    script.onerror = function () {
        console.error("Failed to load script:", url);
    };
    head.appendChild(script);
}


export function camelCase(str){
    return str.replace(/(?:^|\s)\w/g, function(match){
        return match.toUpperCase()
    })
}


