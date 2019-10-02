let players = [
  ["596105289L", "Luis", "Germez Ruiz", "699874123", "amanterechoncho69@aol.com", "25/05/2000", "ES2114650100722030876293", "P"],
  ["256648793K", "Sakura", "Hinata", "655111456", "SHin27@yahoo.jp", "27/06/1990", "ES2114650100722030876293", "P"],
  ["789123456T", "Javier", "Gomez", "678982654", "badfoxy09@gmail.com", "28/03/1985", "ES2114650100722030876293", "B"],
  ["596105289L", "Paula", "Herneraz", "658214753", "wolfPaulen@outlook.com", "12/07/1996", "ES2114650100722030876293", "B"]
];

//Función para verificar la edad.
function isValidPlayer(pAnys){

  // Logica para añadir el jugador
  let dataNai = document.getElementById("DatNa").value;
  let aDate = dataNai.split("/");

  //JavaScript counts months desde 0 a 11 (1 a 12)
  let bornDate = new Date(aDate[2], aDate[1]-1, aDate[0]);

  let currentDate = new Date();
  let age = diffAnys(currentDate, bornDate);

  return (age>=pAnys);

}
//Funcion para pintar los jugadores dinamicamente
function createListPlayers(pJugadores, pContenedor, pTipo){

  for(let i=0; i < pJugadores.length; i++){
    let jugador = pJugadores[i];

    if(pTipo==jugador[7]){
      pContenedor.innerHTML+="<div class='refjug'>" +
      "<img class='imgu' src='img/M.png'>" + "<div class='infi'>" +
      "<p>" + jugador[1] + "<span> " + jugador[2] +"</span>" + "</p>" +
      "<p>" + jugador[4] +"</p>" + "</div>" + "</div>" + "<br>";
    }
  }
}

//Función para comporbar los datos del formulario. 
function checkform(){
  // Recuperar los campos del formulario.
  let camp_nom = document.getElementById("nom");
  let camp_llinatge = document.getElementById("llinatge");
  let camp_nif = document.getElementById("NIF");
  let camp_DataNaixament = document.getElementById("DatNa");
  let camp_telefon = document.getElementById("telefon");
  let camp_email = document.getElementById("email");
  let camp_quota = document.getElementById("quota");
  let camp_typ = document.getElementById("typeplayer");
  //Para recuperar los valores de los campos necesarios.
  let txtData = camp_DataNaixament.value;
  let txtTel = camp_telefon.value;
  let txtEmail = camp_email.value;

  //Para comprobar los campos.
  if( !validaData(txtData) || txtData==""){
    alert("Fecha erroneo");
    return false;
  }
  if( !validaTelefon(txtTel) || txtTel==""){
    alert("Telefono erroneo");
    return false;
  }
  if( !validaEmail(txtEmail) || txtEmail==""){
    alert("EMAIL erroneo");
    return false;
  }

  //Función de verificación obligada
  if(!isValidPlayer(16) && camp_typ.value === "Begginer"){
    alert("El jugador que estas inscribiendo, es menor de 16 años.");
    return false;
  }
  if(!isValidPlayer(18) && camp_typ.value === "Professional"){
    alert("El jugador que estas inscribiendo, es menor de 18 años.");
    return false;
  }

  //Función para que no se repita el mismo jugador en la lista del torneo. Usando el campo DNI/NIF/
  for(let i = 0; i < players.length; i++){
    if (camp_nif.value == players[i][0]){
      alert("El jugador que estas inscribiendo, ya esta en la lista del torneo. Vuelvelo a intentar.");
      return false;
    }
  }

  //Para comprobar los campos obligatorios.
  if(camp_nom.value != "" && camp_llinatge.value != "" && camp_nif.value != ""  && camp_quota.value != ""){

    //Principiantes.
    if(camp_typ.value == "Begginer"){
        players.push([camp_nif.value, camp_nom.value, camp_llinatge.value, camp_telefon.value, camp_email.value, camp_DataNaixament.value, camp_quota.value, "Begginer"]);
        let containerPlayers = document.getElementById("gridB");

        createListPlayers(players, containerPlayers, "Begginer");
    //Profesionales
    } else {
      players.push([camp_nif.value, camp_nom.value, camp_llinatge.value, camp_telefon.value, camp_email.value, camp_DataNaixament.value, camp_quota.value, "Professional"]);
      let containerPlayersPro = document.getElementById("gridP");

      createListPlayers(players, containerPlayersPro, "Professional");
    }
  }
  else{
    alert("Faltan datos obligatorios para rellenar. Vuelve a revisar");
  }
}


window.onload=function(){
  console.log("Cargado correctamente");
  //alert("Cargado correctamente");

  //div contenedor de los jugadores
  let containerPlayers= document.getElementById("gridB");

  //La llamada a la funcion
  createListPlayers(players, containerPlayers, "B");

  let containerPlayersPro= document.getElementById("gridP");
  createListPlayers(players, containerPlayersPro, "P");


}
