import React, { MouseEvent, useCallback } from 'react'
import { useNavigate } from 'react-router'

function UsersListPage() {
  const navigate = useNavigate()

  const onClickTopLink = useCallback((e: MouseEvent) => {
    e.preventDefault()
    navigate("/")
  }, [navigate])

  return (
    <>
      <h1>User List</h1>
      <div style={{ textAlign: "left" }}>
        <a href="/" onClick={onClickTopLink}>top...</a>
      </div>
    </>
  )
}

export default UsersListPage
