import React from 'react'

function P_Login() {
    return (
        <div>

            <section>
                <div className="login-box mt-5 pt-5">
                    <div className="row">
                        <div className="col-12 col-sm-8 col-md-6 m-auto">
                            <div className="card border-0 shadow">
                                <div className="card-body">
                                    <center>
                                        <svg
                                            className="mx-auto my-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                            />
                                        </svg>
                                    </center>
                                    <form action="" method="post">
                                        <div className="uname">
                                            
                                            <input
                                                type="text"
                                                className="text form-control my-4 py2"
                                                name="username"
                                                id="username"
                                                placeholder="principal email"
                                            />
                                        </div>
                                        <div className="pwd">
                                            
                                            <input
                                                type="password"
                                                className="text form-control my-4 py2 "
                                                name="password"
                                                id="password"
                                                placeholder="password"
                                            />
                                        </div>
                                        <div className="text-center mt-3">
                                            <button
                                                type="submit"
                                                name="submit"
                                                value="submit"
                                                className="btn btn-primary"
                                            >
                                                Login
                                            </button>
                                            {/* <a href="reg.html" className="nav-link">Are you new user?</a> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default P_Login