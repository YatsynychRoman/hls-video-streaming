const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const resolutions = [
  {
    resolution: '320x180',
    videoBitrate: '500k',
    audioBitrate: '64k',
    bandwidth: '676800',
  },
  {
    resolution: '854x480',
    videoBitrate: '1000k',
    audioBitrate: '128k',
    bandwidth: '1353600',
  },
  {
    resolution: '1280x720',
    videoBitrate: '2500k',
    audioBitrate: '192k',
    bandwidth: '3230400',
  },
];

const processVideo = (videoName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let encodedResCount = 0;
      const masterPlaylist = ['#EXTM3U'];

      for (const { resolution, videoBitrate, audioBitrate, bandwidth} of resolutions) {
        const outputFile = videoName.split('.')[0] + '_' + resolution + '_' + '.m3u8';
        ffmpeg('raw/' + videoName)
        .addOptions([
          '-c:v h264',
          `-b:v ${videoBitrate}`,
          '-c:a aac',
          `-b:a ${audioBitrate}`,
          '-ac 2',
          `-vf scale=${resolution}`,
          '-start_number 0',
          '-hls_flags split_by_time',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output('videos/' + outputFile)
        .on('end', () => {
          encodedResCount++;
          if (encodedResCount === 3) {
            fs.rm('raw/' + videoName, (err) => {
              if (err) {
                console.log(err);
              }
            });
            resolve(true);
          };
        })
        .run();

        masterPlaylist.push(
          `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${outputFile}`
        );

        fs.writeFileSync('videos/' + videoName.split('.')[0] + '_' + 'master' + '.m3u8', masterPlaylist.join('\n'));
      }
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = processVideo;
