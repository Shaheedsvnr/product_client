import React from 'react'
import { Link } from 'react-router-dom'
export default function CategoryLink() {
  return (
    <div>
        <Link className="navbar-brand" to={'/categories'}>Categories</Link>
    </div>
  )
}
