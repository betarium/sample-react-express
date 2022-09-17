import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router";
import UserModel from '../models/UserModel'
import "./Users.css"

function UsersDetailPage() {
  const navigate = useNavigate()

  const params = useParams()
  // const userId = parseInt(params["id"]!!)
  const userId = parseInt(params["id"] ?? "-1")

  // const user = testUserList.filter(p => p.id === userId)[0]

  const [user, setUser] = useState<UserModel>({ id: userId, account: "", password: "" } as UserModel)

  const loadUserDetail = useCallback(async () => {
    // const apiPath = "/api/users/detail/" + user.id
    const apiPath = "/api/users/" + user.id
    const res = await fetch(apiPath)
    const data = await res.json() as UserModel
    setUser(data)
  }, [setUser])

  useEffect(() => {
    if (userId != -1) {
      loadUserDetail()
    }
  }, [loadUserDetail, userId])

  const onClickUserListLink = useCallback((e: MouseEvent) => {
    e.preventDefault()
    navigate("/users")
  }, [navigate])

  const createUser = useCallback(async () => {
    const req = {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    } as RequestInit
    const res = await fetch("/api/users", req)
    if (res.status >= 400) {
      alert("save error")
      return
    }
    const data = await res.json() as UserModel
    setUser(data)
    alert("save complete!!")
  }, [user, setUser])

  const updateUser = useCallback(async () => {
    const req = {
      method: "put",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    } as RequestInit
    const res = await fetch("/api/users/" + user.id, req)
    if (res.status >= 400) {
      alert("save error")
      return
    }
    navigate("/users")
  }, [user, navigate])

  const onSave = useCallback((e: MouseEvent) => {
    e.preventDefault()
    // alert("save!!")
    if (user.id === -1) {
      createUser()
    }
    else {
      updateUser()
    }
  }, [createUser, updateUser, user])

  const onChangeAccount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newUser = { ...user, account: e.target.value }
    setUser(newUser)
  }, [user, setUser])

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newUser = { ...user, password: e.target.value }
    setUser(newUser)
  }, [user, setUser])

  return (
    <>
      <h1>User Detail</h1>
      <div style={{ textAlign: "left" }}>
        <a href="/users" onClick={onClickUserListLink}>list...</a>
      </div>
      <section style={{ minWidth: "400px" }}>
        <dl>
          <dt>ID</dt>
          <dd>
            {user.id !== -1 &&
              <>{user.id}</>
            }
            <br />
          </dd>
          <dt>Account</dt>
          <dd>
            <input type="text" value={user.account} onChange={onChangeAccount} autoComplete="off" />
          </dd>
          <dt>Password</dt>
          <dd>
            <input type="password" value={user.password} onChange={onChangePassword} autoComplete="new-password" />
          </dd>
        </dl>
        <div>
          <input type="submit" value="Save" onClick={onSave} />
        </div>
      </section>
    </>
  )
}

export default UsersDetailPage
