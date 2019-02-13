const express = require("express");
const db = require("../data/helpers/userDb");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let users = await db.get();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ err: "The users information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.getById(req.params.id);
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: "The user information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Please provide a name for the user." });
    return;
  }
  try {
    const newUser = {
      name: req.body.name
    };
    let insUser = await db.insert(newUser);
    let theUser = await db.getById(insUser.id);
    res.status(201).json(theUser);
  } catch (err) {
    res.status(500).json({
      err: "There was an error while saving the user to the database"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The user has been nuked" });
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error removing the user"
    });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    let posts = await db.getUserPosts(req.params.id);
    if (posts.length) {
      res.status(200).json(posts);
    } else {
      res
        .status(404)
        .json({ err: true, message: "No posts found for this user" });
    }
  } catch (err) {
    res.status(500).json({
      err: true,
      message: "We are unable to find any posts at this time."
    });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "The user must have a name" });
    return;
  }

  try {
    const user = await db.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating the user"
    });
  }
});

module.exports = router;
