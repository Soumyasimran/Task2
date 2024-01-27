const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find();
  let postHTML = '';
  posts.forEach(post => {
    postHTML += `<div class="post">
                  <h2>${post.title}</h2>
                  <p>${post.content}</p>
                </div>`;
  });
  res.send(<h2>Latest Posts</h2>${postHTML});
});

app.get('/new', (req, res) => {
  res.sendFile(__dirname + '/new.html');
});

app.post('/new', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });

  await newPost.save();
  res.redirect('/');
});

// Start server
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});
