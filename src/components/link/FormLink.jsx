import React from "react";
import { Link } from "react-router-dom";
export default function FormLink() {
  return (
    <div>
      <Link className="navbar-brand" to={"/"}>
        Products
      </Link>
    </div>
  );
}
