const subreddits = require('express').Router();

const { getAllSubreddits, getSubredditByName, getSubreddit, addSubreddit, deleteSubreddit } = require('../../queries/subreddits/subreddits');

subreddits.get("/", getAllSubreddits);

subreddits.get("/:subname", getSubredditByName);

subreddits.get("/search/:id", getSubreddit);

subreddits.post("/", addSubreddit);

subreddits.delete("/:id", deleteSubreddit);

module.exports = subreddits;