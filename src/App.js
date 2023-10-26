import logo from "./logo.svg";
import "./App.css";
import Insert from "./components/Insert";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/link/HomeLink";
import View from "./components/View";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/items/Menu";
import HomeLink from "./components/link/HomeLink";
import FormLink from "./components/link/FormLink";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import Error from './components/404'
import ForgotPassword from "./components/ForgotPassword";
import OtpEnter from "./components/OtpEnter";
import ChangePassword from "./components/ChangePassword";
import ViewProduct from "./components/ViewProduct";
import SuperLogin from "./components/SuperLogin";
import AdminsLink from "./components/link/AdminsLink";
import Sellers from "./components/Sellers";
import CategoryLink from "./components/link/CategoryLink";
import Categories from "./components/Categories";
function App() {
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState();
  const [isAlive, setIsAlive] = useState(1);
  const [token, seToken]=useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(search);
  // const handleCLick = (e) => {
  //   e.preventDefault();
  // };
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem('User'));
    seToken(JSON.parse(localStorage.getItem("Auth-token")))
    setProfile(userInfo);
    console.log(isAlive);
  },[isAlive]);
  console.log(profile);
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {profile?.role == "seller" ? (
            <>
              <nav style={{width:'100%',top:0}}
                className="navbar navbar-expand-lg bg-dark border-bottom border-body"
                data-bs-theme="dark"
              >
                <div className="container-fluid">
                  <FormLink />
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <HomeLink />
                      </li>
                      {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li> */}
                    </ul>
                    {/* <form className="d-flex w-100" role="search"> */}
                    <input
                      className="form-control me-2 "
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={handleSearch}
                    />
                    {/* <button
                    onClick={handleCLick}
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    Search
                  </button>
                </form> */}
                    <Menu token={token} profile={profile} setIsAlive={setIsAlive}/>
                  </div>
                </div>
              </nav>
            </>
          ) : profile?.role == "buyer" ? (
            <>
            <nav style={{width:'100%',top:0}}
                className="navbar navbar-expand-lg bg-dark border-bottom border-body"
                data-bs-theme="dark"
              >
                <div className="container-fluid">
                  <FormLink />
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {/* <li className="nav-item">
                        <HomeLink />
                      </li> */}
                      {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li> */}
                    </ul>
                    {/* <form className="d-flex w-100" role="search"> */}
                    <input
                      className="form-control me-2 "
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={handleSearch}
                    />
                    {/* <button
                    onClick={handleCLick}
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    Search
                  </button>
                </form> */}
                    <Menu token={token} profile={profile} setIsAlive={setIsAlive}/>
                  </div>
                </div>
              </nav></>
          ): profile?.role == "super" ? (
            <>
            <nav style={{width:'100%',top:0}}
                className="navbar navbar-expand-lg bg-dark border-bottom border-body"
                data-bs-theme="dark"
              >
                <div className="container-fluid">
                  <FormLink />
                  <AdminsLink />
                  <CategoryLink/>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {/* <li className="nav-item">
                        <HomeLink />
                      </li> */}
                      {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li> */}
                    </ul>
                    {/* <form className="d-flex w-100" role="search"> */}
                    <input
                      className="form-control me-2 "
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={handleSearch}
                    />
                    {/* <button
                    onClick={handleCLick}
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    Search
                  </button>
                </form> */}
                    <Menu profile={profile} token={token} setIsAlive={setIsAlive}/>
                  </div>
                </div>
              </nav></>
          )
          :<></>}
        </div>

        <Routes>
          <Route exact path="/" element={<Home search={search} profile={profile}/>} />
          <Route exact path="/Admin" element={<SuperLogin setIsAlive={setIsAlive}/>} />
          <Route exact path="/sellers" element={<Sellers search={search} setIsAlive={setIsAlive}/>} />
          <Route exact path="/categories" element={<Categories search={search} setIsAlive={setIsAlive}/>} />
          <Route exact path="/viewProduct/:id" element={<ViewProduct/>} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login setIsAlive={setIsAlive}/>} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/insert" element={<Insert />} />
          <Route exact path="/view/:id" element={<View />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/otp-enter" element={<OtpEnter />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
