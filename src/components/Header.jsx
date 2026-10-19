import { useState } from "react";
import { Link } from "react-router";
function Header() {
  // Logged-in user, read once from localStorage. If it is missing or broken,
  // the header still shows instead of crashing the page.
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userdata")) || {};
    } catch (error) {
      return {};
    }
  });
  const [open, setOpen] = useState(false);
return (
    <div className="main-header">
          <div className="main-header-logo">
            <div className="logo-header" data-background-color="dark">
              <a href="index.html" className="logo">
                <img
                  src="assets/img/kaiadmin/logo_light.svg"
                  alt="navbar brand"
                  className="navbar-brand"
                  height="20"
                />
              </a>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right"></i>
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left"></i>
                </button>
              </div>
              <button className="topbar-toggler more">
                <i className="gg-more-vertical-alt"></i>
              </button>
            </div>
          </div>
          <nav
            className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"
          >
            <div className="container-fluid">
              <nav
                className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex"
              >
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button type="submit" className="btn btn-search pe-1">
                      <i className="fa fa-search search-icon"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Search ..."
                    className="form-control"
                  />
                </div>
              </nav>

              <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                <li
                  className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none"
                >
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <i className="fa fa-search"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-search animated fadeIn">
                    <form className="navbar-left navbar-form nav-search">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Search ..."
                          className="form-control"
                        />
                      </div>
                    </form>
                  </ul>
                </li>
              <li className="nav-item topbar-user dropdown hidden-caret">
                  <a
                    className="dropdown-toggle profile-pic"
                    href="#"
                    aria-expanded={open}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(!open);
                    }}
                  >
                    <div className="avatar-sm">
                      <img
                        src="assets/img/profile.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <span className="profile-username">
                      <span className="op-7">Hi,</span>
                      <span className="fw-bold">
                        {user.name}
                      </span>
                    </span>
                  </a>
                  <ul
                    className={"dropdown-menu dropdown-user animated fadeIn" + (open ? " show" : "")}
                    style={{ right: 0, left: "auto" }}
                  >
                    <div className="dropdown-user-scroll scrollbar-outer">
                      <li>
                        <div className="user-box">
                          <div className="avatar-lg">
                            <img
                              src="assets/img/profile.jpg"
                              alt="image profile"
                              className="avatar-img rounded"
                            />
                          </div>
                          <div className="u-text">
                            <h4>Hello Admin!</h4>
                            <p className="text-muted">carparts@gmail.com</p>
                            <a
                              href="profile.html"
                              className="btn btn-xs btn-secondary btn-sm"
                              >View Profile</a
                            >
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">My Profile</a>
                        <a className="dropdown-item" href="#">My Balance</a>
                        <a className="dropdown-item" href="#">Inbox</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Account Setting</a>
                        <div className="dropdown-divider"></div>
                        <Link
                          className="dropdown-item text-danger"
                          to="/logout"
                          onClick={() => setOpen(false)}
                        >
                          <i className="fa fa-sign-out-alt"></i>
                          &nbsp; Logout
                        </Link>
                      </li>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
  );
}
export default Header;

