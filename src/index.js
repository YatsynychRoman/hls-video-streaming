const fs = require('fs');
const express = require('express');
const cors = require('cors');

const upload = require('./upload');
const processVideo = require('./processVideo');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/videos/process', upload, (req, res) => {
  try {
    processVideo(req.file.filename);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'There was an error processing video' });
  }
});

app.get('/videos', (req, res) => {
  const files = fs.readdirSync('videos').filter(file => file.includes('.m3u8'));
  res.status(200).send(files);
});

app.use('/videos', express.static('videos'));

app.listen(3000, () => console.log('Listening on port 3000'));
