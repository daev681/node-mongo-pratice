// services/userService.js
const User = require('../models/userModel');

// 사용자 목록 조회
const getAllUsers = async () => {
  return await User.find();
};

// 사용자 생성
const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

// 사용자 정보 수정
const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

// 사용자 삭제
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
