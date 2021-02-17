var mysql = require('mysql');
const express = require('express')
const app = express ();
const dontenv = require('dotenv').config()


var connection = mysql.createConnection ({
    host     : process.env.DB_HOST,
    port    : process.env.DB_PORTA, //SEM DEFINIR A PORTA DAVA O ERRO 'connect ETIMEDOUT'
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

connection.connect (function(err) 
{
    if (err) 
    {
        console.error ('Erro ao conectar:' + err.stack);
        
        //SINALIZAR NO NAVEGADOR QUE OCORREU ERROS AO CONECATAR COM O BANCO DE DADOS
        app.get ('/', (req, res) => 
        {
            res.send ('Conexao com o banco de dados não estabelecida');
        });
        return;
    }
    console.log ('Conectado a ID: ' + connection.threadId);
    
    //SINALIZAR NO NAVEGADOR QUE EXISTE CONEXÃO COM O BANCO DE DADOS
    app.get ('/', (req, res) => 
    {
        res.send ('Existe uma conexão com o banco de dados');
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});