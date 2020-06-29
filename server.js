var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message',{
  name : String,
  message : String
})


//MONGODB COM MANGOOSE
var dbUrl = 'mongodb+srv://teste:teste@cluster0simple-chat.1oh7o.mongodb.net/<dbname>?retryWrites=true&w=majority';

//BUSCANDO TODAS MENSAGENS NO BANCO DE DADOS
app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })
  

  //publicará novas mensagens criadas pelo usuário no banco de dados
  app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({name: user},(err, messages)=> {
      res.send(messages);
    })
  })
  
  
  app.post('/messages', async (req, res) => {
    try{
      var message = new Message(req.body);
  
      var savedMessage = await message.save()
        console.log('Salvo');
  
      var censored = await Message.findOne({message:'badword'});
        if(censored)
          await Message.remove({_id: censored.id})
        else
          io.emit('message', req.body);
        res.sendStatus(200);
    }
    catch (error){
      res.sendStatus(500);
      return console.log('error',error);
    }
    finally{
      console.log('Mensagem postada.')
    }
  
  })
  
  
  
  io.on('connection', () =>{
    console.log('Um usuário está conectado.')
  })
  
  mongoose.connect(dbUrl ,{ useNewUrlParser: true } ,(err) => {
    console.log('Banco de dados Mongodb conectado com sucesso.',err);
  })
  
  var server = http.listen(3000, () => {
    console.log('Servidor rodando na porta: ', server.address().port);
  });
