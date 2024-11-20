// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Express 앱 설정
const app = express();
const port = 3000;

// Middleware 설정
app.use(bodyParser.json());  

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB 연결 성공');
}).catch((err) => {
  console.log('MongoDB 연결 실패:', err);
});

// MongoDB 모델 설정 (User 모델)
const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true }
}));

// 사용자 목록 조회 (GET)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: '사용자 목록 조회 실패', error: err });
  }
});

// 사용자 생성 (POST)
app.post('/users', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const user = new User({ name, age, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: '사용자 생성 실패', error: err });
  }
});

// 사용자 정보 수정 (PUT)
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, age, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: '사용자 찾을 수 없음' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: '사용자 수정 실패', error: err });
  }
});

// 사용자 삭제 (DELETE)
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: '사용자 찾을 수 없음' });
    }
    res.status(200).json({ message: '사용자 삭제 성공' });
  } catch (err) {
    res.status(500).json({ message: '사용자 삭제 실패', error: err });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
