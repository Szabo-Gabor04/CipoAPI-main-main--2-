$.ajax({
    type: "GET",
    url: "http://127.0.0.1:3001/getproductsByCategory/1",
    success: function (response) {
        document.getElementById("d").innerHTML = item(response);
        console.log(response)
    },
    
});
const item = (res) => {
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
            <p>${res[0].typeName} :</p>
            <div class="d-flex mt-3">
                ${JSON.parse(res[0].attr).map(i => `
                    <button class="ms-2 bg-black p-2 text-light rounded-pill border-none">${i.attr}</button>
                `).join('')}
            </div>
            <button class="btn-dark btn p-3 form-control mt-4">Kosárba</button>
        </div>
    </div>      
    `;
};

$.ajax({
    type: "GET",
    url: "http://127.0.0.1:3001/getNews",
    success: function (response) {
        response.forEach(i=> {
            document.getElementById("kartyak").innerHTML += kartya(i.pName, i.pDescr, i.price, i.banner);
        });
    },
});


function kartya(name, des, price, banner){
    return `
    <div class="product" >
    <img src="${banner}" alt="${name}" >
    <h2>${name}</h2>
    <p>${des}</p>
    <p class="price">${price}</p>
</div>
    `;
}
