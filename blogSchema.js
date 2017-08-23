var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

	title 		: {type:String,default:'',unique:true,required:true},
	subTitle 	: {type:String,default:''},
	blogBody 	: {type:String,default:''},
	tags		: [],
	created		: {type:Date,default:Date.now()},
	lastModified : {type:Date},
	authorInfo  :  {
					fullName :{type:String,default:'',required:true},
					email    :{type:String,default:'',unique:true}
					}, 
	likes		:{type :Number,default:''},
	comments    :{
					name        :{type:String,default:''},
					likes       :{type :Number,default:''},
					date        :{type:Date,default:Date.now()},
					commentbody :{type:String,default:''}
				}
});
mongoose.model('blog',blogSchema);