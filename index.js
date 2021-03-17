import cors from 'cors';
import express from 'express';

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, error => {
  if (error) return console.log(`Cannot listen on PORT: ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
