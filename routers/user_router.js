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

module.exports = router;
