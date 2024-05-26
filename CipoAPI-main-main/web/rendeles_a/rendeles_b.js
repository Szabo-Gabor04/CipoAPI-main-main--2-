
var apiurl =  window.location.origin;
$.ajax({
    type: "GET",
    url: apiurl+"/getAllProduct",
    success: function (response) {
        response.forEach(i=> {
            document.getElementById("cipok").innerHTML += kartya(i.pName, i.pDescr, i.price, i.banner, i.linkId);
        });
    },
});    

function kartya(name, des, price, banner, lid){
return `
<div class="bg-light text-light col-md ms-3 mb-3 product col-sm" onclick="teszt('${lid}')" >
    <img src="${banner}"/> 
    <p>${name}</p>
    <p>${des}</p>
    <p>${price}</p>
    <button class="btn-dark btn  form-control">Kosárba</button>
<div>
`;
}
function teszt(lid){
window.location.href  =`/termek?product=${lid}`;
}
