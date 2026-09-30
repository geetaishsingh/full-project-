import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../../model/adminModel.js";

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    console.log("identifier:", identifier);
    console.log("identifier type:", typeof identifier);
    const admin = await Admin.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!admin) {
      return res.status(404).json({
        message: "Email or phone number not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export { login };
