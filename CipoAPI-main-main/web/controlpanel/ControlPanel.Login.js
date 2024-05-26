class AlertText {
    constructor(type, message){
        this.type = type.toUpperCase();
        switch(type){
            case "DANGER" : this.message= `<p class='text-danger'>${message}</p>`;
            break;
            case "WARNING" : this.message= `<p class='text-warning'>${message}</p>`;
            break;
            default: case "PRIMARY" :this. message= `<p class='text-primary'>${message}</p>`;
            break
        }
    }
}
function setAlert(type, message, element){
    if(element == null) return window.alert(message);
    if(element.innerHTML = new AlertText(type, message).message) return true;
    return false;   
}
function login(){
    const usernameInput = document.getElementById("loginUsername");
    const passwordInput = document.getElementById("loginPassword");

    const AlertElement = document.getElementById("alertMessage");

    var _username = usernameInput.value;
    var _password = passwordInput.value;

    if(_username.split('').length == 0 || _password.split('').length == 0){
        return setAlert("WARNING", "Üres mezők találhatóak", AlertElement);
    }
    AlertElement.innerHTML = ""; //reset error

    try{
        $.ajax({
            type: "POST",
            data: {username: _username, password: _password}, //mivel a jó adatok a szerver oldalon vannak ahoz a felhasználó nem fér hozzá. Ide az adatokat egy inputból vedd ki 
            url: "http://127.0.0.1:3001/adminlogin",
            success: function (response) {
                console.log(response);
            },
            error: function(){
                return setAlert("DANGER", "Hibása felhasználónév vagy jeslzó !", AlertElement);
                // érdemes Sütiket használni, ha ControlPanel több oldalból áll. Ha nincs Süti, hogy az admin belépett, akkor ne nyissa meg az oldalt.
            }
        });
    }catch(Err){
        console.error(Err);
        alert("Hiba lépett fel a bejelentkezés során. Próbáld újra később.")
    }
}