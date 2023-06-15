const express = require('express');
const app = express();
const port = 3000;
const postRouter = require("./routes/post.js");
const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/api", [postRouter]);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(port, () =>{
    console.log(port, '포트 ON !');
});