import express from 'express';

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 8081, () => {
  console.log('Started server');
  console.log(db)
});
