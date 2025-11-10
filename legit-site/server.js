import express from 'express';
import morgan from 'morgan';
import { index, login } from './views/index.js';
import { db } from './db/index.js';
import { parseCookieHeader } from './utils.js';

const PORT = 42069;

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const cookies = parseCookieHeader(req);

  const loggedInUser = db.users.find((u) => u.id == cookies.user_id);
  const userPosts = db.posts.filter((p) => p.user_id === loggedInUser.id);

  res.send(index(loggedInUser, userPosts));
});

app.get('/login', (req, res) => {
  res.send(login());
});

app.post('/login', (req, res) => {
  // Simulate user logging in and setting in a session cookie with the user id
  // VERY BAD for production, only demonstration purposes
  res.cookie('user_id', 1, { secure: true, httpOnly: true });
  // Similar
  // res.setHeader('Set-Cookie', 'user_id=1; HttpOnly; Path=/; Secure');
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/');
});

app.post('/posts', (req, res) => {
  const cookies = parseCookieHeader(req);

  const loggedInUser = db.users.find((u) => u.id == cookies.user_id);
  if (!loggedInUser) {
    res.status(401).send('Unauthorized');
  }

  const post = {
    id: db.posts.length + 1,
    user_id: loggedInUser.id,
    title: req.body.title,
  };

  db.posts.push(post);

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
