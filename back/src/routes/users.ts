import express from 'express';
import UserModel, { testUserList } from 'models/UserModel';
var router = express.Router();

router.get('/list', function (req, res, next) {
  res.json(testUserList)
})

router.get('/detail/:id', function (req, res, next) {
  const id = parseInt(req.params.id)

  const user = testUserList.find(p => p.id === id)

  if (user === undefined) {
    res.sendStatus(404)
    return
  }

  res.json(user)
})

router.get('/create', function (req, res, next) {
  const account = req.query.account
  const password = req.query.password

  const oldId = testUserList.map(p => p.id).reduce((a, b) => Math.max(a, b), 0)

  const id = oldId + 1
  const user = { id, account, password } as UserModel

  testUserList.push(user)

  res.json(user)
});

module.exports = router;
