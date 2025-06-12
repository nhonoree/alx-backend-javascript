// index.js (or 0-console.js)
import express from 'express';

const app = express();
const PORT = 1245;

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
