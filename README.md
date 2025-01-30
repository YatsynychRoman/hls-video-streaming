# Video Streaming Demo

A simple demo application that allows users to upload videos, automatically converts them to HLS (HTTP Live Streaming) format, and enables streaming playback through a web interface.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/video-streaming-demo
cd video-streaming-demo
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
hls-video-streaming/
├── public/
│   └── index.html       # Web interface
├── videos/              # Uploaded videos directory
├── raw/                 # Folder for temporary storing raw videos
├── src/
│   ├── index.js         # Express server with endpoints
│   └── upload.js        # Uploading video to temporary folder
|   └── processVideo.js  # ffmpeg processing to convert .mp4 video to .m3u8 playlist
└── package.json
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. Open `index.html` in your browser.

## API Endpoints

- `POST /videos/process`
  - Uploads and processes a video file
  - Accepts form-data with a "video" field containing the file

- `GET /videos`
  - Returns a list of available video streams
  - Returns array of strings with .m3u8 filenames

- `GET /videos/{filename}`
  - Streams the requested video
  - Filename should include .m3u8 extension

## Usage

1. Open the web interface in your browser
2. Upload a video file using drag-and-drop or file selector
3. Wait for the processing to complete
4. Select the processed video from the list to start playback
