const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const processVideo = (videoName) => {
  ffmpeg('raw/' + videoName).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls',
  ]).output('videos/' + videoName.split('.')[0] + '.m3u8').on('end', () => {
    fs.rm('raw/' + videoName, (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log(videoName, 'processing is finished');
  }).run();
}

module.exports = processVideo;
