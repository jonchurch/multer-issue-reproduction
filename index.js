const express = require('express');
const multer = require('multer');

const upload = multer();

const app = express();

app.use(express.static('public'));

app.post('/file', upload.single('file'), (req, res, next) => {
  console.log(req.file);
  // pretty print the response for human debugging
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(req.file, null, 2));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
