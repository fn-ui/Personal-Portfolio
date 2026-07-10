const Message = require("../models/Message");

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

exports.createMessage = async (req, res, next) => {
  try {
    const saved = await Message.create({
      name: req.body.name.trim(),
      email: req.body.email.trim().toLowerCase(),
      message: req.body.message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Message received successfully",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMessageStatus = async (req, res, next) => {
  try {
    const validStatuses = ["New", "Replied", "Closed"];

    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be New, Replied, or Closed",
      });
    }

    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

exports.addReply = async (req, res, next) => {
  try {
    const subject = req.body.subject?.trim();
    const replyMessage = req.body.message?.trim();

    if (!subject || !replyMessage) {
      return res.status(400).json({
        success: false,
        message: "Subject and message required",
      });
    }

    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          replies: {
            subject,
            message: replyMessage,
          },
        },
        status: "Replied",
      },
      { new: true, runValidators: true }
    );

    if (!msg) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Reply added successfully",
      data: msg,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const total = await Message.countDocuments();
    const byStatus = await Message.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = { New: 0, Replied: 0, Closed: 0 };

    byStatus.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    res.json({
      success: true,
      stats: {
        total,
        byStatus: statusCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};
