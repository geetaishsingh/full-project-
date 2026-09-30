import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.findUser = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const home = async (req, res) => {
  try {
    res.status(200).json({
      message: "Login successfully",
      user: req.findUser,
    });
  } catch (error) {
    console.log(error);
  }
};


export{
   authUser, home
}