var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//app level middleware
app.use(function (req, res, next) {
  
  console.log('Time of request:', Date.now());
  console.log("request url is ",req.originalUrl);
  console.log("request ip address is",req.ip)
  next();
});

// error handling middleware 
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// configuration of database 

var dbPath  = "mongodb://localhost/mynewblog";

// command to connect with database
db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {

	console.log("database connection open success");

});

// include the model file 

var Blog = require('./blogSchema.js');

var blogModel = mongoose.model('blog');

//  route to GET all blogs
app.get('/blogs',function(req, res) {

	blogModel.find(function(err,result){
		if(err){
			res.send(err)
		}
		else{
			res.send(result)
		}
	});
});
// route to get a particular blog
app.get('/blogs/:id',function(req, res) {

	blogModel.findOne({'_id':req.params.id},function(err,result){
		if(err){
			console.log("some error");
			res.send(err);
		}
		else{
			res.send(result)
		}
	});
});
// route to Create a BLOG
	app.post('/blog/create',function(req, res) {

		var newBlog = new blogModel({

			title 		: req.body.title,
			subTitle 	: req.body.subTitle,
			blogBody 	: req.body.blogBody,
			likes       : req.body.likes
			}); 
		newBlog.authorInfo.fullName =req.body.authorFullName;
		newBlog.authorInfo.email=req.body.authorEmail;
		newBlog.comments.commentbody=req.body.commentbody;
		newBlog.comments.name=req.body.commentlikes;
		newBlog.comments.commentbody=req.body.commentbody;


		var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):''
		newBlog.tags = allTags;

		newBlog.save(function(error){
			if(error){
				console.log(error);
				res.send(error);

			}
			else{
				console.log(newBlog);
				res.send(newBlog);
			}
		}); 
	});
	// route to edit the blog
app.put('/blogs/:id/edit',function(req, res) {

	var update = req.body;

	blogModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}
	});
  });
// route to delete a blog 
app.post('/blogs/:id/delete',function(req, res) {

	blogModel.remove({'_id':req.params.id},function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}
	});
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});