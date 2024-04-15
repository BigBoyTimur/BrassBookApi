import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export const getAudio = async (req, res) => {
  const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../compositions/audio', 'Lyudvig_van_Betkhoven_Minuet.mp3')

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg'
    });

    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg'
    });

    fs.createReadStream(filePath).pipe(res);
  }
}


