const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){

    let weekDay = date.getDate();
    res.render('list', {listTitle: weekDay, newListItems: items});

});

app.post('/', (req, res) =>  {
    
    let item = req.body.newItem;

    if (req.body.list === 'Work') {
        if (item != ''){
            workItems.push(item);
            res.redirect('/work')
        };

    } else {
        if (item != '') {
            items.push(item);

            res.redirect('/');
        };
    };
    
});

app.get('/work', (req,res) => {
    res.render('list', {listTitle: 'Work List', newListItems: workItems});
});


app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});