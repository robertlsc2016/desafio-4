var mysql = require('mysql');
const express = require('express')
const app = express ();

var connection = mysql.createConnection ({
    host     : 'mysql742.umbler.com',
    port     : '41890', //SEM DEFINIR A PORTA DAVA O ERRO 'connect ETIMEDOUT'
    user     : 'robertdb',
    password : 'QWERT3751956842qwert?',
    database : 'robertdb'
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