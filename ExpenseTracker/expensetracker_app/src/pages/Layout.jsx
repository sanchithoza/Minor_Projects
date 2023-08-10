import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = (props) => {
  return (
    <>
      <div className="container-fluied">
        <div className="row">
          <div className="col-12">
            <h1 className="display-1 text-center">{props.name}</h1>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary justify-content-center">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav justify-content-center">
                <li>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/Transaction" className="nav-link">
                    Transaction
                  </Link>
                </li>
                <li>
                  <Link to="/Report" className="nav-link">
                    Report
                  </Link>
                </li>
                <li>
                  <Link to="/Register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/Login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet className="pageOutlet" />
    </>
  );
};

export default Layout;
