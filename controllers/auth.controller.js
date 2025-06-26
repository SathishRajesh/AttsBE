const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const generateToken = (user) => {
  return jwt.sign(
    { userName: user?.name, id: user?._id || "user" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userName: user?.name, id: user?._id || "user" },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

exports.registerUser = async (req, res) => {
  try {
    const { name = "", email = "", password = "" } = req.body || {};

    if ((!name.trim() || "", !email.trim() || "", !password || "")) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in present try another email" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      password: hashpassword,
    };

    console.log("Creating user account:", data);
    const user = await Users?.create(data);
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body || {};

    const user = await Users.findOne({ email: email }).lean();

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user);

    const refreshToken = generateRefreshToken(user);

    await Users.updateOne({ _id: user._id }, { $set: { refreshToken } });
    return res

      .status(200)

      .cookie("refreshToken", refreshToken, {
        httpOnly: true,

        secure: false,

        sameSite: "Lax",

        path: "/",

        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      .json({ message: "success", token: token, user: user });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({ message: error.message });
  }
};

exports.getNewToken = async (req, res) => {
  try {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Invalid or expired refresh token" });
        }

        const user = await Users.findById(decoded?.id).lean();
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const accessToken = generateToken(user);

        return res.status(200).json({
          message: "success",
          token: accessToken,
          user: user,
        });
      }
    );
  } catch (error) {
    console.error("Refresh token error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: "No refresh token found in cookies" });
    }

    const result = await Users.updateOne(
      { refreshToken: refreshToken },
      { $unset: { refreshToken: "" } }
    );

    if (result.modifiedCount === 0) {
      console.warn("No user found with the given refresh token");
    }

    res.clearCookie("refreshToken", {
      path: "/api/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Error logging out" });
  }
};
