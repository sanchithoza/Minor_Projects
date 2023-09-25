function Home(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="card bg-dark text-white">
              <img
                src="./image/homepage.jpg"
                className="img-responsive"
                alt="..."
              />
              <div className="card-img-overlay">
                <h3 className="card-title display-4">
                  <strong>Track Your Expenses on a Web App</strong>
                </h3>
                <hr />
                <h3 className="card-text">
                  This web application lets you track all your day to day
                  expenses on the go,
                  <br />
                  And that too without installing any additional application to
                  your device.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
