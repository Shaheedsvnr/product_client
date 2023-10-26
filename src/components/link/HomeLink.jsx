import React from "react";
import { Link } from "react-router-dom";
export default function HomeLink() {
  return (
    <div>
      <Link className="nav-link active" aria-current="page" to="/insert">
        Form
      </Link>
    </div>
  );
}
