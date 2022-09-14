import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router";
import UserModel from '../models/UserModel'
import "./Users.css"

function UsersDetailPage() {
  const navigate = useNavigate()

  const params = useParams()
  const userId = parseInt(params["id"]!!)

  // const user = testUserList.filter(p => p.id === userId)[0]

  const [user, setUser] = useState<UserModel>({ id: userId, account: "", password: "" } as UserModel)

  const loadUserDetail = useCallback(async () => {
    const apiPath = "/api/users/detail/" + user.id
    const res = await fetch(apiPath)
    const data = await res.json() as UserModel
    setUser(data)
  }, [setUser])

  useEffect(() => {
    loadUserDetail()
  }, [loadUserDetail])

  const onClickUserListLink = useCallback((e: MouseEvent) => {
    e.preventDefault()
    navigate("/users")
  }, [navigate])

  const onSave = useCallback(async () => {
    alert("save!!")
  }, [])

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
            {user.id}
          </dd>
          <dt>Account</dt>
          <dd>
            <input type="text" value={user.account} />
          </dd>
          <dt>Password</dt>
          <dd>
            <input type="text" value={user.password} />
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
