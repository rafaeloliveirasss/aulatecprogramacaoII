const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

//carrregando o cabeçalho do HTML em outras páginas
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rota principal
app.get('/', function (req, res) {
    //o then passa os posts para nossa view
    Post.findAll().then(function (posts) {
        //var posts =JSON.parse(JSON.stringify(posts))
        //res.render('home', {posts:nposts})
        posts = posts.map((post) => { return post.toJSON() });
        res.render('home', { posts: posts });

    });

});





//Rota para cadastro
app.get('/cad', function (req, res) {
    res.render('formulario');
});

//Fazendo a inserção no banco
app.post('/add', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        //redirecionamento para home com o barra
        res.redirect('/')
    }).catch(function (erro) {
        res.send('"Houve um erro: "' + erro);
    });
});

//exclusao de dados 
app.get('/deletar/:id', function (req, res) {
    Post.destroy({ where: { 'id': req.params.id } }).
        then(function () {
            res.redirect('/');
        }).catch(function (erro) {
            res.send("Esta postagem não existe");
        });

});
//rota para alterar
app.get('/alterar/:id', function (req, res){
    Post.findAll({ where: { 'id': req.params.id } }).then(function (posts) {
        //var nposts = JSON.Parse(JSON.stringify(posts))
        //res.render('home', {post: nposts})
    posts=posts.map((post)=>{return post.toJSON()});
    res.render('alterar', {posts: posts})
    });
});

//fazendo a alteracao no banco
app.post('/update', function (req, res){
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo},
        {where: { id: req.body.id}
        }).then(function(){
            res.redirect('/');
        }).catch(function(erro){
            res.send("Esta postagem não existe" +erro);
        });
});
app.listen(8081, function () {
    console.log("Servidor Rodando");
});
