/*////////////////////////////////////
//                                  //
//  Modempunk NodeJs app (GPL-3.0)  //
//  (c) 2014-2018 ZacFinger.com     //
//  https://youtu.be/5tRWeWGe6EQ    //
//  https://modempunk.tumblr.com    //
//                                  //
////////////////////////////////////*/

/*//////////////////////////////////////////////////////////////////////////////
//
// DONE: moved neuromancer string to external file (confirmed working)
//
// DONE: moved tumblr authentication to external file (confirmed working)
// 
// DONE: moved list of users to external file as array (confirmed working)
//
// TODO: move technophilia blog settings to external file
//
// TODO: handle technophilia scenario so that main.old.js can be deleted
//
// TODO: clean up, comment, document, deployment guide
//
// TODO: this item is complete when the code is:
// // (1) posted to github
// // (2) cloned on some new server X
// // (3) deployed and running from server X
// // (4) bitbucket repo deprecated
//
// TODO: Experiment with adding "node_modules" to 
// .gitignore to simplify the deployment process
//
// TODO: sqlite3 database for logging followers+timestamps
//
// TODO: sqlite3 database for users requesting to be excluded
//
// TODO: sqlite3 database for blog posts to reblog / promote
//
//////////////////////////////////////////////////////////////////////////////*/

// this can be any source text from which random comments shall be derived
var neuromancer = require('./neuromancer.js'); 

var chrcount = neuromancer.length;

// Authenticate via API Key
var tumblr = require('tumblr.js');
var config = require('./config.js');
var client = tumblr.createClient(config);

var now = Math.round(new Date().getTime() / 1000);

// Make the request
client.userInfo(function (err, data) {
	console.log(now + "," + data["user"]["blogs"][0]["followers"]);
});

// tags: vhs, vaporwave, seapunk, webpunk, glitch, vaporware, n64

var tag = "";

tag = process.argv[2];

var timedif = process.argv[3];

var users = require('./users.js'); 

// Make the request
client.tagged(tag, function (err, data) {

	if(tag == "technophilia"){
client.reblog('modempunk.tumblr.com', { id: 181032820965, reblog_key: 'XJcpCpsy' }, function (err, data) {
//	console.log(err + " " + data);
});

	}
	else{	

	for (var x=0;x<data.length;x++){

		var reblog_key = data[x]["reblog_key"];
		var post_id = data[x]["id"];
		var timestamp = data[x]["timestamp"];
		var type = data[x]["type"];
		var blog_name = data[x]["blog_name"];

		if(timestamp > (now - timedif) && type != "answer"
		&& type != "text" && type != "quote" && type != "link"
		&& type != "chat" && users.indexOf(blog_name) == -1){
			client.reblog('modempunk.tumblr.com', 
				{ id: post_id,
				  reblog_key: reblog_key,
				  comment: randomComment()
				  
				}, function (err, data) {
					//console.log(err + " " + data);   
				}
			);
		} 
		
	}
	}
});


function randomComment(){

        var newstr = "";

	var nipponese = ["どうして？\nどうして来ないの？\nこっちへ来ればいいのに。",
			 "四方田千砂からのメール！",
			 "メールくらい毎日チェックしなさいよ！\nまあ、いいけどさぁ・・・ ",
			 "だから、四方田千砂からメールが来ちゃったからじゃないよ！",
			 "死んだ子からメールが来るはずがない。\nでも、来る",
			];

	if(Math.random()<0.1)
		newstr+=nipponese[Math.floor(Math.random()*nipponese.length)]+"";

	var chrcount = neuromancer.length;
	var randomNumber = Math.floor(Math.random() * chrcount);

	var dotCounts = 0;
	var char = "";


	for(var i=randomNumber;i<neuromancer.length;i++){
		char = neuromancer.charAt(i);
	
		if (dotCounts > 1 && dotCounts < 3)
			newstr += char;

		if(char=="." || char=="?" || char=="!")
			dotCounts++;

		if(dotCounts==3)
			break;
	}

	return newstr;
}
