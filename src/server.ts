import express from 'express';
import db from './config/database.config';
import todoRouter from './routes';

db.sync().then(() => {
  console.log('connect to db');
});

const app = express();
const PORT = 5555;

app.use(express.json());
app.use('/api/v1', todoRouter);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
