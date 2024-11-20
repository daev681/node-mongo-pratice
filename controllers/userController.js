// controllers/userController.js
const userService = require('../services/userService');

// 사용자 목록 조회
const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: '사용자 목록 조회 실패', error: err.message });
  }
};

// 사용자 생성
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: '사용자 생성 실패', error: err.message });
  }
};

// 사용자 정보 수정
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: '사용자 찾을 수 없음' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: '사용자 수정 실패', error: err.message });
  }
};

// 사용자 삭제
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: '사용자 찾을 수 없음' });
    }
    res.status(200).json({ message: '사용자 삭제 성공' });
  } catch (err) {
    res.status(500).json({ message: '사용자 삭제 실패', error: err.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
