const {argv} =require('process');


const fs = require('fs');
	if(argv.length < 4){
		console.log('argv!!!9');
		process.exit();
	};
const data = fs.readFileSync(argv[2],{encoding:'utf8',flag:'r'});
var output = fs.openSync(argv[3],'w');
var obj = JSON.parse(data);
fs.writeSync(output,'<!DOCTYPE html>');
fs.writeSync(output,'<html>');
fs.writeSync(output,'<head>');
fs.writeSync(output,'<meta charset="utf-8">');
fs.writeSync(output,'<link rel="stylesheet" type="text/css" href="style.css">');//這裡還要丟一個外部CSS連結

fs.writeSync(output,'</head>');
fs.writeSync(output,'<body>');
for(block of obj.blocks){
	
	if(block.type == "paragraph"){
		fs.writeSync(output,'<div class="Paragraph">');
		fs.writeSync(output,block.data.text);
		fs.writeSync(output,'</div>');
	}else if(block.type == "image"){	
		fs.writeSync(output,'<div class="Image">');
		fs.writeSync(output,'<img src="');
		fs.writeSync(output,block.data.file.url);
		fs.writeSync(output,'">');
		fs.writeSync(output,'</div>');
	}else if(block.type == "AnyButton"){
		fs.writeSync(output,'<div class="AnyButton">');
		fs.writeSync(output,'<button type="button" onclick="window.location.href=\''+block.data.link+'\'">');
		fs.writeSync(output,block.data.text);
		fs.writeSync(output,'</button>');
		
		fs.writeSync(output,'</div>');
	}else if(block.type == "header"){
		fs.writeSync(output,'<div class="Header">');
		if(block.data.level==2){
			fs.writeSync(output,'<h2>');
			fs.writeSync(output,block.data.text);
			fs.writeSync(output,'</h2>');
		}else if(block.data.level==3){
			fs.writeSync(output,'<h3>');
			fs.writeSync(output,block.data.text);
			fs.writeSync(output,'</h3>');
		}else{
			fs.writeSync(output,'<h4>');
			fs.writeSync(output,block.data.text);
			fs.writeSync(output,'</h4>');
		}
		fs.writeSync(output,'</div>');
	}
}
fs.writeSync(output,'</body>');
fs.writeSync(output,'</html>');
fs.close(output);