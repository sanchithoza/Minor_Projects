import { Link } from "react-router-dom";
function Home(props) {
  return (
    <>
      <div className="container mt-3">
        <div className="row">
        
          <div className="col-6">
            <div className="card bg-success border-white text-white">
              <div className="card-header border-white">
                <h5 className="card-title">Accept Journals</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  To Accept an Journal from Student
                  <br /> Click the Button Bellow
                </p>
              </div>
              <div className="card-footer border-white">
                <Link
                  role="button"
                  to="/AddJournal"
                  className="btn btn-dark"
                >
                  Accept Journal
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card bg-primary border-white text-white">
              <div className="card-header border-white">
                <h5 className="card-title">Check Journals</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                To View Journals Submitted By Student
              <br /> Click this Button
                </p>
              </div>
              <div className="card-footer border-white">
              <Link
              role="button"
              to="/JournalDetails"
              className="btn btn-dark"
            >
              Check Journals
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
