const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const sharp = require('sharp');
const cors = require('cors');

const app = express();

// routes
const usersRoute = require('./components/User/userAPI');

app.use(cors());
// parsers
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.post('/api/compress-image', async (req, res) => {
  const { quality } = req.body;
  sharp(req.files.image.data)
    .toFormat('jpeg')
    .jpeg({ force: true, quality: parseInt(quality, 10) })
    .toBuffer()
    .then((data) => {
      // converting to base64 before sending to client
      let buffer = Buffer.from(data, 'base64').toString('base64');
      return res.status(200).json({ success: true, compressed: buffer, size: data.toString().length });
    })
    .catch((err) => {
      console.log(err);
    });
});

// api
app.use('/api/users', usersRoute);

module.exports = {
  app,
};
