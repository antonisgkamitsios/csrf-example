import express from 'express';
import { index } from './views/index.js';

const PORT = 6969;

const app = express();

app.get('/', (req, res) => {
  res.send(index());
});


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
