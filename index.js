const express = require('express');
const multer = require('multer');
const getStream = require('get-stream');
const axios = require('axios');
const FormData = require('form-data');

const CLIENT_ID = process.env.IMGUR_ID;
// console.log('Imgur id:', CLIENT_ID);

const upload = multer();

const app = express();

app.use(express.static('public'));

app.post('/file', upload.single('file'), async (req, res, next) => {
  try {
    const imgurForm = new FormData();
    imgurForm.append('image', req.file.stream);
    const result = await axios.post(
      'https://api.imgur.com/3/upload',
      imgurForm,
      {
        headers: {
          Authorization: `Client-ID ${CLIENT_ID}`,
          ...imgurForm.getHeaders(),
        },
      }
    );

    console.log(result.data);
    //

    res.send(result.data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`App is listening on http://localhost:${PORT}`)
);
