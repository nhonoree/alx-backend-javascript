import express from 'express';
import router from './routes';

const app = express();
app.use('/', router);

app.listen(1245);

export default app;
