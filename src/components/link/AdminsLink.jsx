import React from 'react'
import { Link } from 'react-router-dom'
export default function AdminsLink() {
  return (
    <div>
        <Link className="navbar-brand" to={'/sellers'}>Users</Link>
    </div>
  )
}
