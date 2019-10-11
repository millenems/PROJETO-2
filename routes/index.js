const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/views/aids', (req, res) => {
  res.render('aids');
});

router.get('/views/ansiedade', (req, res) => {
  res.render('ansiedade');
});

router.get('/views/avc', (req, res) => {
  res.render('avc');
});

router.get('/views/depressao', (req, res) => {
  res.render('depressao');
});

router.get('/views/diabetes', (req, res) => {
  res.render('diabetes');
});

router.get('/views/mama', (req, res) => {
  res.render('mama');
});

router.get('/views/obesidade', (req, res) => {
  res.render('obesidade');
});

router.get('/views/toc', (req, res) => {
  res.render('toc');
});

router.get('/views/chats', (req, res) => {
  res.render('chats')
})

module.exports = router;
