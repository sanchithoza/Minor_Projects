import { Link } from "react-router-dom";
function Home(props) {
  return (
    <>
      <div className="container-fluied bg-warning">
        <div className="row">
          <div className="col-12 text-center">
            <h3>Welcome to</h3>
            <h1>Student Assignment Portal</h1>
            <hr />
            <h6>
              This Portal lets you maintain Students Assignment Submission data.
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-center bg-primary p-3">
            <h3 className="display-3">
              To Accept an Assignment
              <br /> From Student
              <br /> Click the Button Bellow
            </h3>
            <Link
              role="button"
              to="/AddAssignment"
              className="btn btn-warning btn-lg"
            >
              Accept Assignment
            </Link>
          </div>
          <div className="col-6 text-center bg-success p-3">
            <h3 className="display-3">
              To View Assignments Submitted
              <br /> By Student
              <br /> Click this Button
            </h3>
            <Link
              role="button"
              to="/AssignmentDetails"
              className="btn btn-warning btn-lg"
            >
              View Submitted Assignments
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
