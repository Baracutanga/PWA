import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoute from '../backend/routes/posts.js';

const port = 3000;

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect("link mongoDB");

app.use('/posts', postRoute);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });