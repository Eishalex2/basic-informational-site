import path from 'path';
import * as url from 'url';
import express from 'express'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = 8080;

app.use(express.static("public", { extensions: ['html'] }));

app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));