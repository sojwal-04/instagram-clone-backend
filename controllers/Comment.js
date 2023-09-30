import Comment from "../models/Comment.js";

const postComment = async (req, res) => {
  try {
    const { postId, userId, text } = req.body; 

    const newComment = new Comment({
      post: postId,
      user: userId,
      text: text,
    });

    await newComment.save();

    res.status(200).json({ message: "Comment posted successfully" });
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


/*
//Future

const editComment = async(req, res, next) => {
 try{
    
  }catch(err) {
    console.log("Error: " + err);
  }
};

*/

const deleteComment = async (req, res, next) => {
  try {
  } catch (err) {
    console.log("Error: " + err);
  }
};

export { postComment, deleteComment };
