const router = require("express").Router();
const conversation = require("../models/conversation.js");
const messageModel = require("../models/message.js");

router.post("/send/:id", async (req, res) => {
  const senderId = req.id;
  const reciverId = req.params.id;
  const message = req.body;

  try {
    let getConversation = await conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });
    const notExist = getConversation ? false : true;
    if (!getConversation) {
      getConversation = await conversation.create({
        participants: [senderId, reciverId],
      });
    }

    const newMessage = await messageModel.create({
      senderId,
      reciverId,
      message: message.message,
    });

    if (newMessage) {
      getConversation.messages.push(newMessage._id);
    }
    await getConversation.save();
    if (notExist) {
      return res.status(200).json({ isNew: true, success: true, newMessage });
    }
    return res.status(200).json({ success: true, newMessage });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Error to send message" });
  }
});

router.get("/reciveall", async (req, res) => {
  const senderId = req.id;
  try {
    const getConversation = await conversation
      .find({
        participants: { $all: [senderId] },
      })
      .sort({ updatedAt: -1 });
    return res.status(200).json({ success: true, getConversation });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Error to recived all chat" });
  }
});

router.get("/recive/:id", async (req, res) => {
  const senderId = req.id;
  const reciverId = req.params.id;
  try {
    const getConversation = await conversation
      .findOne({
        participants: { $all: [senderId, reciverId] },
      })
      .populate("messages");
    return res.status(200).json({ success: true, getConversation });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Error to recived message" });
  }
});

module.exports = router;
