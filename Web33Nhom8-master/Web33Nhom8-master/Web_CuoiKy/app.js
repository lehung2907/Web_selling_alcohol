var express = require('express');
var exphbs = require('express-handlebars');
var exphbs_section = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var wnumb = require('wnumb');
var session = require('express-session');
var handleLayoutMDW = require('./middle-wares/handleLayout');

var handle404MDW = require('./middle-wares/handle404');
var restrict = require('./middle-wares/restrict');
var trict = require('./middle-wares/restrict');

var adminController=require('./controllers/adminController');
var homeController= require('./controllers/homeController');
var productController = require('./controllers/productController');
var accountController = require('./controllers/accountController');
var cartController = require('./controllers/cartController');
var searchController = require('./controllers/searchController');
var orderController = require('./controllers/orderController');



var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    helpers: {
        section: exphbs_section(),
        number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
    }
}));
app.use('/admin', express.static(__dirname + '/public'));
app.use('/admin/quanlysanpham', express.static(__dirname + '/public'));
app.use('/admin/quanlydonhang', express.static(__dirname + '/public'));
app.use('/admin/quanlysanpham/quanlytheonhasx',express.static(__dirname + '/public'));
app.use('/admin/quanlysanpham/quanlytheoloaisp', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

app.use(express.static(
    path.resolve(__dirname, 'public')
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}))
app.use(handleLayoutMDW);
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use(handleLayoutMDW);
app.use('/home', homeController);
app.get('/admin',(req,res)=>{
	res.redirect('/admin/index');
});

app.use('/home', homeController);
app.use('/admin',adminController);

app.use('/product', productController);
app.use('/account', accountController);
app.use('/search', searchController);
app.use('/cart', restrict, cartController);
app.use('/order', orderController);


app.use(handle404MDW);



app.listen(3000, () => {
    console.log('server running on port 3000');
});
