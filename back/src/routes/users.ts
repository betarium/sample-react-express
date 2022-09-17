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

function getUserOutput(user: UserModel): UserModel {
  const output = { id: user.id, account: user.account } as UserModel
  return output
}

router.get('/', function (req, res, next) {
  const destList = testUserList.map(user => getUserOutput(user))
  res.json(destList)
})

router.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id)

  const user = testUserList.find(p => p.id === id)

  if (user === undefined) {
    res.sendStatus(404)
    return
  }

  const dest = getUserOutput(user)

  res.json(dest)
})

router.post('/', function (req, res, next) {
  const user = req.body as UserModel

  const oldId = testUserList.map(p => p.id).reduce((a, b) => Math.max(a, b), 0)

  user.id = oldId + 1

  testUserList.push(user)

  const dest = getUserOutput(user)

  res.json(dest);
});

router.put('/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  const userInput = req.body as UserModel

  const user = testUserList.find(p => p.id === id)

  if (user === undefined) {
    res.sendStatus(404)
    return
  }

  user.account = userInput.account
  if (userInput.password !== undefined && userInput.password.length > 0) {
    user.password = userInput.password
  }

  res.json({ success: true });
});

router.delete('/:id', function (req, res, next) {
  const id = parseInt(req.params.id)

  const index = testUserList.findIndex(p => p.id === id)
  if (index < 0) {
    res.sendStatus(404)
    return
  }

  testUserList.splice(index, 1)

  res.json({ success: true });
});

module.exports = router;
