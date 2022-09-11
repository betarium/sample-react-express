import React, { MouseEvent, useCallback } from 'react'
import { useNavigate, useParams } from "react-router";
import { testUserList } from '../models/UserModel'
import "./Users.css"

function UsersDetailPage() {
  const navigate = useNavigate()

  const params = useParams()
  const userId = parseInt(params["id"]!!)

  const user = testUserList.filter(p => p.id === userId)[0]

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
