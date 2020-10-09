var express = require("express");

var servidor = express();

const port = 3000;

servidor.use(express.urlencoded({ extended: true }))

servidor.set("view engine", "ejs");

function home(req, resp){
    resp.render("home");
}

function curriculo(req, resp){
    resp.render("curriculo");
}

function contato(req, resp){
    resp.render("contato");
}

function controle(req, resp){
    resp.render("controle")
}

var mensagens = [];

function envia(request, response) {
    var nome = request.body.nome;
    var email = request.body.email;
    var texto = request.body.texto;
    mensagens.push({nome:nome, email:email, texto:texto});
    Map(mensagens);
    response.render("contato");
}

servidor.post("/enviaMensagem", envia);

function validar (request, response){
    var usuario = request.body.usuario;
    var senha = request.body.senha;

    if (usuario == "admin" && senha == "admin"){
        response.render("info", {mensagens: mensagens});
    }
    else {
        response.render("controle")
    }
}

servidor.post("/info", validar);

servidor.get("/", home);

servidor.get("/curriculo", curriculo);

servidor.get("/contato", contato);

servidor.get("/controle", controle);

servidor.use("/estatico" ,express.static("static/"));

servidor.listen(port, () => {
    console.log('server started on port 3000')
})
