const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post.js");

//게시글 리스트 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({})
  const plist = posts.map((post) => {
    postsId = String(post._id)
    return {
      "postsId": postsId,
      "user": post.user,
      "title": post.title,
      "content": post.content,
      "dat": post.createdAt,

    }
  })
  res.send({ plist });
});


//게시물 등록
router.post("/posts", async (req, res) => {
  //req.body  바디에서 받기
  const { user, password, title, content } = req.body;
  const createdAt = new Date();

  //중복아이디 확인
  const overlapPost = await Posts.find({ user });
  if (overlapPost.length === 0) {
    await Posts.create({ user, password, title, content, createdAt });
    res.json({ message: "등록 완료!" });
  } else {
    return res.status(400).json({ message: "등록실패" });
  }
});


//게시물 수정//
router.put("/posts/:id", async (req, res) => {
  id = req.params.id;
  const { content, password } = req.body;
  const [overlapPost] = await Posts.find({ _id: Object(id) });

  if (overlapPost) {
    if (content) {
      if (overlapPost.password != password) {
        return res.status(400).json({ message: "데이터형식을 확인해주세요" })
      } else {
        await Posts.updateOne({ _id: Object(id) }, { $set: { content } })
      }
    } else { return res.status(400).json({ message: "데이터형식을 확인해주세요" }) }
  } else { return res.status(400).json({ message: "게시글 조회에 실패했습니다." }) }
  res.json({ message: "게시글을 수정하였습니다." })
})

//게시글 삭제//
router.delete("/posts/:id", async (req, res) => {
  id = req.params.id;
  const { password } = req.body;
  const [overlapPost] = await Posts.find({ _id: Object(id) });

  if (overlapPost) {
    if (overlapPost.password != password) {
      return res.status(400).json({ message: "데이터형식을 확인해주세요" })
    } else { await Post.deleteOne({ _id: Object(id) }) }
  } else { return res.status(400).json({ message: "게시글 조회에 실패." }) }
  res.json({ message: "게시글을 삭제." });
})



module.exports = router;