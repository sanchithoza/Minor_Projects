import { Link } from "react-router-dom";
function Home(props) {
  return (
    <>
      <div className="container-fluied bg-primary text-white">
        <div className="row">
          <div className="col-12 text-center">
            <h3>Welcome to</h3>
            <h1>Student journal Portal</h1>
            <hr />
            <h6>
              This Portal lets you maintain Students journal Submission data.
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-center bg-warning p-3">
            <h3 className="display-3">
              To Accept an journal
              <br /> From Student
              <br /> Click the Button Bellow
            </h3>
            <Link
              role="button"
              to="/Addjournal"
              className="btn btn-primary text-white btn-lg"
            >
              Accept journal
            </Link>
          </div>
          <div className="col-6 text-center bg-success p-3">
            <h3 className="display-3">
              To View journals Submitted
              <br /> By Student
              <br /> Click this Button
            </h3>
            <Link
              role="button"
              to="/Viewjournal"
              className="btn btn-primary text-white btn-lg"
            >
              View Submitted journals
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
