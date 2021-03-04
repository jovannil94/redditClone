const db = require("../../db/index");

const getAllSubreddits = async (req, res, next) => {
    try {
        let subreddits = await db.any(`SELECT * FROM subreddits`);
        res.status(200).json({
            status: "Success",
            message: "all subreddits",
            payload: subreddits
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get all subreddits",
            payload: err
        })
        next()
    }
}

const getSubredditByName = async (req, res, next) => {
    try {
        let subreddit = await db.one(`SELECT * FROM subreddits WHERE subname=$/subname/`, {
            subname: req.params.subname
        });
        res.status(200).json({
          status: "Success",
          message: "subbreddit was retrieved by id",
          payload: subreddit
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get subreddit by id",
            payload: err
        })
        next(err);
      }
}

const getSubreddit = async (req, res, next) => {
    try {
        let subreddit = await db.one(`SELECT * FROM subreddits WHERE id=${sub_id}`, {
            sub_id:req.params.id
        });
        res.status(200).json({
          status: "Success",
          message: "subbreddit was retrieved by id",
          payload: subreddit
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get subreddit by id",
            payload: err
        })
        next(err);
      }
}

const addSubreddit = async (req, res, next) => {
    try {
        let subreddit = await db.one(
            `INSERT INTO subreddits (user_id, subname) 
            VALUES($/user_id/, $/subname/) 
            RETURNING *`, {
                user_id: req.body.user_id,
                subname: req.body.subname
            })
        res.status(200).json({
            subreddit,
            status: "Success",
            message: "Added subreddit"
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Subreddit not added",
            payload: err
        })
        next()
    }
}

const deleteSubreddit = async (req, res, next) => {
    try {
        await db.none(`DELETE from subreddits WHERE id = ${sub.id}`);
        res.status(200).json({
          status: "Success",
          message: "Subreddit Has Been Deleted"
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Subreddit not deleted",
            payload: err
        })
        next(err);
      }
}



module.exports = { getAllSubreddits, getSubredditByName, getSubreddit, addSubreddit, deleteSubreddit };
