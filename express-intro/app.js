import express from 'express';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

function greeting() {
  console.log('Hello World!');
};

greeting();

app.get('/api/v1/cat', (req, res) => {
  const myData = {
    cat_id: 1,
    name: 'Murka',
    birthdate: '2025-11-01',
    weight: 25,
    owner: 'Nikita',
    image: 'https://loremflickr.com/320/240/cat'
  };
  res.json(myData);
});

app.use('/public', express.static('public'))

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
