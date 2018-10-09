	const { createServer } = require('https');
	const { readFileSync, readFile } = require('fs');
	const express = require('express');
	const helmet = require('helmet');
	const bodyParser = require('body-parser');
	const session = require('express-session');
	const crypto = require('crypto');
	const csrf = require('csurf');
	const cookieParser = require('cookie-parser');
	const fileUploader = require('express-fileupload');
	const auth = require('basic-auth')
	const fs = require('fs');
	const walk    = require('walk');
	const files = [];

	const multer  = require('multer')
	const { fileUpload } = require('./file_upload');

	const uuidv1 = require('uuid/v1');

const walker  = walk.walk('./image', { followLinks: false });
	const app = express();
	app.use(fileUploader({
	  limits: { fileSize: 4 * 1000 * 1000 },
	}));
	app.use(
	  helmet.contentSecurityPolicy({
	    directives: {
	      defaultSrc: ["'self'"],
	      imgSrc: ['*'],
	      upgradeInsecureRequests: true,
	    },
	  })
	);
	app.use(helmet.frameguard({ action: 'deny' }));
	app.use(helmet.noSniff());
	app.use(
	  helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true })
	);
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Content-Type", "text/html")
	  next();
	});
	app.use(helmet.ieNoOpen());
	app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(csrf({ cookie: true }));
	walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    	console.log(stat.name);
    	files.push(__dirname+'/image/' + stat.name);
    	next();
	});
		
	walker.on('end', function() {
    	
    	
	});

	app.get('/', function(req, res) {
	     res.send(
	       fileUpload({csrfToken: req.csrfToken()})
	      );
	});

	app.get(`/images`, function (req, res) {
  if (!auth(req)) {
    res.set('WWW-Authenticate', 'Basic realm="image access"')
    return res.status(401).send()
  }
  let { name, pass } = auth(req)
  name = escape(name)
  pass = escape(pass)
  if (name === process.env.USER && pass === process.env.PASS) {
    const pathImage = `${__dirname}/image/${req.query.image}`
    fs.readFile(pathImage, function (err, data) {
      if (err) throw err
      res.header('Content-Type', 'image/jpg')
      res.send(data)
    })
  } else {
    return res.status(401).send('bad creds')
  }
})

	app.post('/fileupload', function (req, res){
		console.log(req.files.file);
	 try{
	 	const filename = uuidv1();
	 	switch(req.files.file.mimetype) {
	    case 'image/jpeg':
	        // Use the mv() method to place the file somewhere on your server
	  console.log('jpeg')
	  req.files.file.mv('./image/'+filename+'.jpg', function(err) {
	    if (err)
	      console.log(err);
	  fs.chmodSync(`${__dirname}/image/${filename}.jpg`, '666')
	  });
	  	  
	        break;
	    case 'image/jpg':
	    console.log('jpg')
	        // Use the mv() method to place the file somewhere on your server
	  req.files.file.mv('./image/'+filename+'.jpg', function(err) {
	    if (err)
	      console.log(err);
	  fs.chmodSync(`${__dirname}/image/${filename}.jpg`, '666')
	  });
	        break;
	    case 'image/png':
	    console.log('png')
	    // Use the mv() method to place the file somewhere on your server
	  req.files.file.mv('./image/'+filename+'.png', function(err) {
	    if (err)
	      console.log(err);
	  fs.chmodSync(`${__dirname}/image/${filename}.png`, '666')
	  });
	  
    
	        break;
	    default:
	        console.log('data no accept')
	}
	
	}
	 catch(err){
	 	console.log(err)
	 } 
	res.redirect('/');
		
	})

	createServer(
	  {
	    key: readFileSync(process.env.SSL_KEY),
	    cert: readFileSync(process.env.SSL_CERT),
	  },
	  app
	).listen(process.env.PORT);
