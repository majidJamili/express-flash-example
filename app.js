

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const hbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
path = require('path'); 
const ejs = require('ejs');



// configure Express
const app = express();
//app.set('views', __dirname + '/views');

app.engine('.hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs');

// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(session({ secret: 'myflashmessagesession',
                            resave:false, 
                            saveUninitialized:true,
                            cookie: { maxAge: 60000 }}
                                           ));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success') || null
    res.locals.error = req.flash('error') || null
    next();
})


app.get('/',  (req,res) =>{
    req.flash('success', 'You have successfully logged in...!')
    res.redirect('/home')
})

app.get('/home', (req,res)=>{    
    res.render('index')
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
})

