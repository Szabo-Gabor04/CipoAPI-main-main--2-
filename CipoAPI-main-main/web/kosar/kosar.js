
var apiurl =  window.location.origin;

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  if(getCookie("kosartartalom")!=null)
  {
 document.getElementById("db").innerHTML=getCount();

  }

function kiiras() {
  try{
    getAll().forEach(element => {
      $.ajax({
        type: "GET",
        url: apiurl+"/getProductByLInkId/"+element.linkid,
        success: function (response) {
            document.getElementById("tartalom").innerHTML+=kartyakos(response, element);
           
        },  
      });
      
    });
  }catch(err){

  }


}
kiiras();


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function getCount(){
  var list = getCookie("kosartartalom") != null ? JSON.parse(getCookie("kosartartalom")) : [];
  return list.length;
}

function kartyakos(adat, el){
  console.log(el);
  return `
  <div class="kosark">
      <div class="row">
          <div class="col-sm-2">
              <img src='${adat[0].banner}' style="width: 78%;">
          </div>
       <div class="col-sm">
            <p class="fw-bold" style="margin-top: 9vh;">${adat[0].pName}n</p>
        </div>
        <div class="col-sm" style="margin-top: 9vh;">
            <div>
              <div class="row g-0">
                 <div class="col-1">
                   <input type="button" class="form-control" value="+">
                </div>
                <div class="col-2">
                    <input type="text" class="form-control" value="${el.amount}">
                </div>
                 <div class="col-1">
                      <input type="button" class="form-control" value="-">
                  </div>
                  <div class="col-2 mx-2">
                  <button class="btn btn-danger" onClick="removeByLinkId('${el.linkId}')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
                  
              </div>
              </div>
         </div>
        </div>
        <div class="col-sm" style="margin-top: 9vh;">
        <p>${adat[0].price} FT</p>
        </div>
  </div>
  `;

  
}

/*
 <div class="product d-flex  p-2  mb-3 kosar">
  <img src="${adat[0].banner}" alt="${adat[0].pName}" style= "width:100px" class=" kosarimg" >
  <h2>${adat[0].pName}</h2>
  <p>${adat[0].pDescr}</p>
  <p class="price fs-4 fw-bold">${adat[0].price}Ft</p> 
*/

function func(){
if (getCount() > 0) 
  alert("Sikeres vásárlás!")
else
  alert("A kosara üres!")
}


function osszes(){
  return `
  <div class="product d-flex  p-2  mb-3 kosar">
  
  <h2>${adat[0].pName}</h2>
 
  <p class="price fs-4 fw-bold">${adat[0].price}Ft</p>
 
</div>
  `;
}


function meghiv(){

  kiiras();
  osszes();

}