var socket = io();
$(() => {
    $("#send").click(()=>{
        sendMessage({name: $("#name").val(), message: $("#message").val()});
    })

    getMessages()
})

socket.on('message', addMessages)

function addMessages(message){
    $("#messages").append(`
    <div class="container">
    <img src="https://img.icons8.com/ios-glyphs/30/000000/person-male.png"/>
  <p>${message.message} </p>
  <span class="time-right">${message.name} </span>
</div>`)
}

function getMessages(){
  $.get('http://localhost:3000/messages', (data) => {
    data.forEach(addMessages);
  })
}

function sendMessage(message){
  $.post('http://localhost:3000/messages', message)
  
  inputName = document.querySelector('#name');
  inputName2 = document.querySelector('#message');
  var divAlert = document.querySelector('#alerta');

  if((document.querySelector('#name').value == null || document.querySelector('#name').value.trim() == '') || 
  (document.querySelector('#message').value == null || document.querySelector('#message').value.trim() == '')){
    divAlert.innerHTML = '<br> <p style="color:red">Preencha todos os campos!</p>';
  } else {

  divAlert.innerHTML = '<br> Mensagem enviada com sucesso!';

  var divHour = document.querySelector('#hora');
  now = new Date
  divHour.innerHTML = `${now.getHours()}:${now.getMinutes()}`;
  }
  clearInput();  
  
}

 function clearInput() {
    inputName.value = '';
    inputName2.value = '';
    inputName.focus();
}

function clearInputMessage() {
    msg = document.querySelector('#alertaS');
    mgs.value = '';
}






$(".heading-compose").click(function() {
    $(".side-two").css({
      "left": "0"
    });
  });

  $(".newMessage-back").click(function() {
    $(".side-two").css({
      "left": "-100%"
    });
  });