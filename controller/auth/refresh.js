import User from "../../model/userModel.js";

export const refreshController = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
