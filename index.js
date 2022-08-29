import express from 'express';
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

const users = []
const tweets = []

server.post('/sign-up', (req, res) => {
  const {username, avatar} = req.body;
  const id = users.length + 1;


  const login = {
    username: username,
    avatar: avatar,
    id: id
  }

 if(!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios");
    return;
 }
 else{
  users.push(login)
  res.status(201).send('Ok')
 }
})

server.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;
    const tweetUser = users.find(user => user.username === username)
    const id = tweets.length + 1;
    const post = {
        username: username,
        avatar: tweetUser.avatar,
        tweet: tweet,
        id: id
    }

    if(!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios");
        return;
    }
    else {
    tweets.push(post);
    res.status(201).send('Ok')
    }
})

server.get('/sign-up', (req, res) => {
    res.send(users);
})

server.get('/tweets', (req, res) => {
    res.send(tweets);
})



server.listen(5000, () => {
    console.log('Rodando na porta 5000');
})