let multer = require('multer');
let express = require('express');
let app = express();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload")
    },
    filename: (req, file, cb) => {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-2' + '.' + fileFormat[fileFormat.length - 1])
    }
});

var upload2 = multer({storage: storage});

let upload = multer({storage: multer.memoryStorage()});

app.post('/api/upload', upload.single('sample'), (req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.originalname;
        console.log('get file ' + filename);
        res.send({result: 'success'});
    } else {
        console.log('No File Uploaded');
        res.send({result: 'fail'});
    }
});

app.post('/api/upload2', upload2.single('sample'), (req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        console.log('get file ' + filename);
        res.send({result: 'success'});
    } else {
        console.log('No File Uploaded');
        res.send({result: 'fail'});
    }
});

app.post('/array', upload.array('sample'), (req, res) => {
    console.log(req.body)
    console.log(req.files);
    res.send();
});

app.get('/api/download', function(req, res){
    var file = __dirname + '/upload/sample.mp4';
    res.download(file); // Set disposition and send it.
});

app.get('/', (req, res) => {
    res.send("Server is running at 2019 port");
});

app.listen(2019);
