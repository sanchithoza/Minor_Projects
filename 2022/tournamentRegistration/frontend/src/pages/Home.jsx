import { Link } from "react-router-dom";
function Home(props) {
  return (
    <>
      <div className="container-fluied bg-dark text-white">
        <div className="row">
          <div className="col-12 text-center ">
            <h1 className="display-1">Cricket Tournament Registration</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center bg-secondary p-3">
            <h3 className="display-4">
              To Register Your Team <br />
              for The Upcomming Cricket Tournament <br />
              At Navsari
              <br /> Click the Button Bellow
            </h3>
            <Link
              role="button"
              to="/Addregistration"
              className="btn btn-dark text-white btn-lg"
            >
              Register Your Team Now
            </Link>
          </div>
          <hr />
          <div className="col-12 text-center  bg-white p-3">
            <h3 className="display-4 text-dark">
              To Check Already Registered Teams for The Tournament
              <br /> Click this Button
            </h3>
            <Link
              role="button"
              to="/Viewregistration"
              className="btn btn-dark text-white btn-lg"
            >
              Already Registered Teams
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
