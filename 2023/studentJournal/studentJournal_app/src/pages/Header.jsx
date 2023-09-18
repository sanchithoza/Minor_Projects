import { Outlet, Link } from "react-router-dom";
import "./../App.css";
function Header(props) {
  return (
    <>
      <div className="container-fluid bg-white fixed-top">
        <div className="row">
          <div className="col-6">
            <h1>Student Journal Tracker</h1>
          </div>
          <div className="col-6 pt-2">
            <nav className="nav  justify-content-center">
              <Link
                to="/"
                className="nav-link text-black border-bottom border-black"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/AddJournal"
                className="nav-link text-black border-bottom border-black"
                aria-current="page"
              >
                Accept Submission
              </Link>
              <Link
                to="/JournalDetails"
                className="nav-link text-black border-bottom border-black"
                aria-current="page"
              >
                View Submissions
              </Link>
              {/* <Link to="/login" className="nav-link active" aria-current="page">
              Login
            </Link> */}
            </nav>
          </div>
        </div>
      </div>
      <div className="container container-top-margin">
        <Outlet />
      </div>
      <div className="fixed-bottom bg-white p-3">
        <h6 className="">
          This Portal lets you maintain Students Journal Submission Records.
        </h6>
      </div>
    </>
  );
}
export default Header;
