const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('./')));
app.get('/',function(req,res){
    res.sendFile(path.resolve('./three.html'));
})
app.listen(port,function(){
    console.log('Server Started');
})