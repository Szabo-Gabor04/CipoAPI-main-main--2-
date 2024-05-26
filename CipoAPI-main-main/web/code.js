
var apiurl = window.location.origin;

$.ajax({
    type: "GET",
    url: `${apiurl}/getNews`,
    success: function (response) {
        response.forEach(i=> {
           try{
            document.getElementById("termekek").innerHTML += kartya(i.pName, i.pDescr, i.price, i.banner,i.linkId);
           }catch(err){

           }
           try{
            document.getElementById("d").innerHTML += kartya(i.pName, i.pDescr, i.price, i.banner,i.linkId);
           }catch(err){

           }
        });
    },
});


function kartya(name, des, price, banner, linkId){
    return `
    <div class="product" onclick="teszt('${linkId}')">
    <img src="${banner}" alt="${name}" >
    <h2>${name}</h2>
    <p>${des}</p>
    <p class="price fs-4 fw-bold">${price}Ft</p>
    <button class="btn btn-dark p-1 form-control" onclick="kosarba("${linkId}")">Részletek</button>
</div>
    `;

    
}


function teszt(lid){
window.location.href  =`/termek?product=${lid}`;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
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
  
  class KosarItem {
    constructor(linkid, amount, size){
        this.linkid = linkid;
        this.amount = amount;
        this.size = size;
    }
  }
  function kosarba(linkid){
    var list = getCookie("kosartartalom") != null ? JSON.parse(getCookie("kosartartalom")) : [];
    var itemIf = list.filter(i => i.linkid == linkid);
    if(itemIf.length > 0){
        list[list.indexOf(itemIf[0])].amount++;
    } else {
      list.push(new KosarItem(linkid, 1, 0));
    }
    setCookie("kosartartalom", JSON.stringify(list), 10);
    document.getElementById("db").innerHTML=getCount();
    
    return list;
   
  }
  function removeAll(){
    setCookie("kosartartalom", "", -1);
    return true;
  }
  
  function getAll(){
    var list = getCookie("kosartartalom") != null ? JSON.parse(getCookie("kosartartalom")) : [];
    return list;
  }
  
  function getCount(){
    var list = getCookie("kosartartalom") != null ? JSON.parse(getCookie("kosartartalom")) : [];
    return list.length;
  }
  function removeByLinkId(linkid){
    var list = getCookie("kosartartalom") != null ? JSON.parse(getCookie("kosartartalom")) : [];
    var itemindex = list.indexOf(list.filter(i => i.linkid == linkid)[0]);
    list.splice(itemindex, 1);
    setCookie("kosartartalom", JSON.stringify(list), 10);
    return list;
  }