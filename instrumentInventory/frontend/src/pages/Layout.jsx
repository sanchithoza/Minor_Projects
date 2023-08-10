import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
function Layout(props) {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <h1 className="fs-2 alert alert-success p-2">{props.name}</h1>
            <hr />
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link align-middle px-0">
                  <h5 className="text-white">Home</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Addinventory" className="nav-link align-middle px-0">
                  <h5 className="text-white">Add Inventory</h5>
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  to="/Viewinventory"
                  className="nav-link align-middle px-0"
                >
                  <h5 className="text-white">View Inventory</h5>
                </Link>
              </li>
            </ul>
            <hr />
          </div>
        </div>
        <div className="col py-3 alert alert-success">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
