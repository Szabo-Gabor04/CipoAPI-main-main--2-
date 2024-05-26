const searchParams = new URLSearchParams(window.location.search);

var apiurl =  window.location.origin;

function load(){
    var linkId = searchParams.get("product");
    if(linkId == null) return alert("Nincs ilyen termék")

    $.ajax({
        type: "GET",
        url: apiurl+"/getProductByLInkId/"+linkId,
        success: function (response) {
            document.getElementById("de").innerHTML = item(response);
        
        },
    });
}
load();


const item = (res) => {
    var gombok = "";
    JSON.parse(res[0].attr.toString()).forEach(i => {
            gombok+= `  <button class="btn-dark btn p-3 mt-4">${i.attr}</button>`;
    })

    return `
    <div class="row mt-4">
        <div class="col">
            <img src="${res[0].banner}" style="width: 55%" alt="">
        </div>
        <div class="col mt-5">
            <h3>${res[0].pName}</h3>
            <p>${res[0].pDescr}</p>
            <p class="mt-3">  
                ${res[0].discountprice == -1 
                    ? `<span class="me-2">Ár: </span>${res[0].price} FT`
                    : `<div class="d-flex">
                        <span class="me-2">Ár: </span>
                        <p class="text-decoration-line-through text-black-50 me-4">${res[0].price} FT</p>
                        <p>${res[0].discountprice} FT</p>
                      </div>`
                }
            </p>
            <p class="fw-bold fs-3">${res[0].typeName} :</p>
            <div class="d-flex justify-content-between mt-3">
              ${gombok}
            </div>
            <button class="btn-dark btn p-3 form-control mt-4" onclick="kosarba('${res[0].linkId}')">Kosárba</button>
        </div>
    </div>      
    `;
};