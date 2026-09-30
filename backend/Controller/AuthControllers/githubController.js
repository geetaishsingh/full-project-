import jwt from "jsonwebtoken";

const githubCallback = (req, res) => {
  try {
    const admin = req.user;

    if (!admin) {
      return res.status(401).json({
        message: "GitHub authentication failed",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/home");
  } catch (error) {
    console.log("GitHub Callback Error:", error);

    res.status(500).json({
      message: "GitHub login failed",
    });
  }
};

export { githubCallback };
