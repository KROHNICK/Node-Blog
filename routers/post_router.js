const express = require("express");
const db = require("../data/helpers/postDb");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let posts = await db.get();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: "Please provide text for the post." });
    return;
  }

  try {
    const postFull = {
      text: req.body.text,
      user_id: req.body.user_id
    };
    let newId = await db.insert(postFull);
    let newPost = await db.getById(newId.id);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been nuked" });
    } else {
      res.status(404).json({ message: "The post could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the post"
    });
  }
});

module.exports = router;
