import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  // Đọc JWT từ cookie 'jwt'
  token = req.cookies.jwt;

  if (token) {
    try {
      // Giải mã token để lấy thông tin userId
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user trong database theo userId đã được giải mã và loại bỏ trường password
      req.user = await User.findById(decoded.userId).select("-password");

      // Gọi next() để chuyển sang middleware hoặc route handler tiếp theo
      next();
    } catch (error) {
      // Nếu token không hợp lệ hoặc không thể xác minh, trả về lỗi 401 Unauthorized
      res.status(401);
      throw new Error("Invalid token");
    }
  } else {
    // Nếu không có token, trả về lỗi 401 Unauthorized
    res.status(401);
    throw new Error("No token");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };
