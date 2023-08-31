import { Outlet, Link} from "react-router-dom";
export default function Layout() {
    return (
      <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-society" className="nav-link">Add Society</Link>
              </li>
              <li className="nav-item">
                <Link to="/view-society" className="nav-link">View Society</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-resident" className="nav-link">Add Resident</Link>
              </li>
              <li className="nav-item">
                <Link to="/view-resident" className="nav-link">View Resident</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-maintenance" className="nav-link">Add Maintenance</Link>
              </li>
              <li className="nav-item">
                <Link to="/nothing-here" className="nav-link">Nothing Here</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
      <hr />
    
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
    
    );
  }
  