import { Link } from "react-router-dom";
function Home(props) {
  return (
    <>
      <div className="container mt-3">
        <div className="row">
        
          <div className="col-6">
            <div className="card border border-primary">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title">Accept FeesDetailss</h5>
              </div>
              <div className="card-body bg-transparent">
                <p className="card-text">
                  To Accept an FeesDetails from Student
                  <br /> Click the Button Bellow
                </p>
              </div>
              <div className="card-footer bg-primary">
                <Link
                  role="button"
                  to="/AddFeesDetails"
                  className="btn btn-sm btn-dark"
                >
                  Accept FeesDetails
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6"></div>
          <div className="col-6 mt-5">
            <div className="card border-primary">
              <div className="card-header bg-primary  text-white">
                <h5 className="card-title">Check FeesDetailss</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                To View FeesDetailss Submitted By Student
              <br /> Click this Button
                </p>
              </div>
              <div className="card-footer bg-primary">
              <Link
              role="button"
              to="/FeesDetails"
              className="btn btn-sm btn-dark"
            >
              Check FeesDetailss
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
