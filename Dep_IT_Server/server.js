var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var subjects = ["USO", "Mate 1", "Mate 2", "Metode Numerice"];
var entries = [
    {
        id: '1',
        subject: "USO",
        title: "Tema 2 ajutor"
    },
    {
        id: '2',
        subject: "Mate 1",
        title: "Face vreunu o integrala?"
    },
    {
        id: '3',
        subject: "Mate 2",
        title: "Face vreunu o matrice?"
    }
];

var id = 4;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/subjects', function(req, res) {
    res.send({ subjects: subjects});
});

app.get('/entries', function(req, res) {
    res.send({ entries: entries.slice(0, 5)});
});

app.post('/entries', function(req, res) {
    entries.unshift(
        {
            id: id++,
            subject: req.body.subject,
            title: req.body.title
        }
    );
    res.send({ entries: entries.slice(0, 5)});
});

app.delete('/entries/:id', function(req, res) {
    var id = req.params.id;
    for(let i = 0; i < entries.length; i++) {
        if(entries[i].id == id) {
            entries.splice(i, 1);
            break;
        }
    }
    res.send({ entries: entries.slice(0, 5), id: id });
});

app.post('/email', function(req, res) {
    var data = req.body;

    const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
    user: "testdepartament@gmail.com",
    pass: "Test!234"
    }});

    let message = {
        from: data.email,
        to: 'testdepartament@gmail.com',
        subject: 'Feedback de la ' + data.name,
        text: '\
            Email trimis de' + data.email + '\
            \
            ' + data.feedback + '\
        '
    };

    transporter.sendMail(message, function(error, info) {
        if(error) {
            console.log(error);
        }
        transporter.close();
    });

    res.send("succes");
});

app.listen(PORT, function() {
    console.log('start');
});