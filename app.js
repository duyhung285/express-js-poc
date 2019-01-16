 let multer  = require('multer');
 let express = require('express');
 let app     = express();
 let upload  = multer({ storage: multer.memoryStorage() });

 app.post('/api/upload', upload.single('somefile'), (req, res) => {
   if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        var uploadStatus = 'File Uploaded Successfully';
        res.send({ result: 'success'});
    } else {
        console.log('No File Uploaded');
        res.send({ result: 'fail'});
    }
 });

 app.post('/array', upload.array('somefile'), (req, res) => {
   console.log(req.body)
   console.log(req.files);
   res.send();
 });

 app.listen(8080);
