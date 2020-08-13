const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//APP CONFIG
mongoose.connect('mongodb://localhost/blog_app', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//MONGOOSE MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: 'Pokemon',
//     image: 'https://compote.slate.com/images/18ba92e4-e39b-44a3-af3b-88f735703fa7.png?width=780&height=520&rect=1560x1040&offset=0x0',
//     body: 'Pikuchu ready to go shopping in 2020!'
// })

//RESTFUL ROUTES

app.get('/', (req,res) => {
    res.redirect('/blogs');
});

//INDEX ROUTE
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err);
            
        } else {
            res.render('index', {blogs: blogs});
        }
    })
});

//NEW ROUTE
app.get('/blogs/new', (req, res) => {
    res.render('new');
});

//CREATE ROUTE
app.post('/blogs', (req, res) => {
    //create blog
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    });
    //redirect
})

//SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    })

});

app.listen(3000, () => {
    console.log('Server running on PORT:3000.');
    
})