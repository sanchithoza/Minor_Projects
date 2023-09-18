import { Link } from "react-router-dom";
function Home(props) {
  return (
    <>
      <div className="container mt-3">
        <div className="row">
        <p className="lead text-center">
              This Portal lets you maintain Students Assignment Submission
              Records.
            </p>
          <div className="col-6">
            <div className="card border-success">
              <div className="card-header border-success">
                <h5 className="card-title">Accept Assignments</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  To Accept an Assignment from Student
                  <br /> Click the Button Bellow
                </p>
              </div>
              <div className="card-footer border-success">
                <Link
                  role="button"
                  to="/AddAssignment"
                  className="btn btn-success"
                >
                  Accept Assignment
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card border-primary">
              <div className="card-header border-primary">
                <h5 className="card-title">Check Assignments</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                To View Assignments Submitted By Student
              <br /> Click this Button
                </p>
              </div>
              <div className="card-footer border-primary">
              <Link
              role="button"
              to="/AssignmentDetails"
              className="btn btn-primary"
            >
              Check Assignments
            </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
export default Home;
