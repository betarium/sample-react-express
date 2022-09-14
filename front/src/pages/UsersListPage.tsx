import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import UserModel from '../models/UserModel'
import "./Users.css"

function UsersListPage() {
  const navigate = useNavigate()

  const onClickTopLink = useCallback((e: MouseEvent) => {
    e.preventDefault()
    navigate("/")
  }, [navigate])

  //const userList = testUserList

  const [userList, setUserList] = useState<UserModel[]>([])

  const loadUserList = useCallback(async () => {
    const apiPath = "/api/users/list"
    const res = await fetch(apiPath)
    const data = await res.json() as UserModel[]
    setUserList(data)
  }, [setUserList])

  useEffect(() => {
    loadUserList()
  }, [loadUserList])

  const onClickUserDetailLink = useCallback((e: MouseEvent, user: UserModel) => {
    e.preventDefault()
    navigate("/users/" + user.id)
  }, [navigate])

  const onClickUserCreateLink = useCallback((e: MouseEvent) => {
    e.preventDefault()
    alert("create!!")
  }, [])

  const onClickUserDelete = useCallback((e: MouseEvent, user: UserModel) => {
    e.preventDefault()
    alert(`${user.account} delete!!`)
  }, [])

  return (
    <>
      <h1>User List</h1>
      <div style={{ textAlign: "left" }}>
        <a href="/" onClick={onClickTopLink}>top...</a>
      </div>
      <div style={{ textAlign: "left" }}>
        <a href="/users/new" onClick={onClickUserCreateLink}>create...</a>
      </div>
      <section style={{ minWidth: "400px" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Account</th>
              <th>Detail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(item =>
              <tr key={`user-${item.id}`}>
                <td>{item.id}</td>
                <td>{item.account}</td>
                <td><a href={`/users/${item.id}`} onClick={e => onClickUserDetailLink(e, item)}>[Detail]</a></td>
                <td><a href={`/users/${item.id}`} onClick={e => onClickUserDelete(e, item)}>[Delete]</a></td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default UsersListPage
