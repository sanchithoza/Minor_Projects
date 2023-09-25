import { Link } from "react-router-dom";
function Home(props) {
  return (
    <>
      <div className="container-fluied bg-danger text-white ">
        <div className="row">
          <div className="col-12 text-center ">
            <h1 className="display-1">Maintenance Register</h1>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-8 text-center alert alert-danger p-3">
            <h3 className="display-4">
              To Add a New Maintenance <br />
              Request Click the Link
            </h3>
          </div>
          <div className="col-4 text-center alert alert-danger bg-danger p-3">
            <Link
              role="button"
              to="/Addrequest"
              className="display-6 text-white"
            >
              Add <br /> Maintenance Request
            </Link>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8 text-center  alert alert-danger p-3">
            <h3 className="display-4">
              To View Maintenence Requests
              <br /> Click this Link
            </h3>
          </div>
          <div className="col-4 text-center  alert alert-danger bg-danger p-3">
            <Link
              role="button"
              to="/Viewrequest"
              className="display-6 text-white"
            >
              View <br /> Maintenance Request
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
