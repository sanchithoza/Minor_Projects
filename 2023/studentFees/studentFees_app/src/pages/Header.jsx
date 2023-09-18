import { Outlet, Link } from "react-router-dom";
import "./../App.css";
function Header(props) {
  return (
    <>
      <div className="container-fluid">
        <div className="row text-white">
          <div className="col-2 bg-primary navbar-height position-fixed">
            <h4>Student Fees Details Register</h4>
            <hr />
            <nav className="nav ">
            <li class="nav-item">
              <Link
                to="/"
                className="nav-link text-white"
                aria-current="page"
              >
                Home
              </Link>
              </li>
              <li class="nav-item">
              <Link
                to="/AddFeesDetails"
                className="nav-link text-white"
                aria-current="page"
              >
                Accept Submission
              </Link>
              </li>
              <li class="nav-item">
              <Link
                to="/FeesDetails"
                className="nav-link text-white"
                aria-current="page"
              >
                View Submissions
              </Link>
              </li>
              {/* <Link to="/login" className="nav-link active" aria-current="page">
              Login
            </Link> */}
            </nav>
          </div>
          <div className="col-10 pt-2 navbar-height">
            <div className="container container-margin">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
