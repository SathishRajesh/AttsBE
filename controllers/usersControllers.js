const Users = require("../models/users");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const user = await Users?.find({}, "-password").lean();
    console.log("Gretting user Details");
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }

    const user = await Users?.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Users.findByIdAndDelete(id);

    console.log(user, "Deleted Successfully");
    res.status(200).json({ message: "User deleted successfully", data: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is misssing" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    console.log("Updating User Details");
    const user = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  editUser,
};
