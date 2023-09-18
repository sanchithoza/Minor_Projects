import { Outlet, Link } from "react-router-dom";

function Header(props) {
  return (
    <>
      <div className="container-fluid bg-dark text-white">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-6">Student Assignment Portal</h1>
          </div>
          <hr/>
        </div>
        <div className="row">
          <nav className="nav  justify-content-center">
            <Link  to="/"  className="nav-link text-white border border-white" aria-current="page">
              Home
            </Link>
            <Link to="/AddAssignment" className="nav-link text-white border border-white" aria-current="page">
              Accept Submission
            </Link>
            <Link  to="/AssignmentDetails" className="nav-link text-white border border-white" aria-current="page">
              View Submission
            </Link>
            {/* <Link to="/login" className="nav-link active" aria-current="page">
              Login
            </Link> */}
          </nav>
        </div>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
export default Header;
