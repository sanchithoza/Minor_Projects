import React from 'react'
import { useState } from 'react';
import axios from "axios";
function ContactUs() {

  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();

  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Message, setMessage] = useState();


  const handlesubmit = (event) => {
      event.preventDefault();
      const student_contact_Us = {

          FirstName,
          LastName,

          Email,
          Phone,
          Message,


      }

      axios.post('http://127.0.0.1:5000/_contactus',  student_contact_Us)
        .then(function (response) {
          alert("Listed Successfully")
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

  }





  return (
    <div>


      <section>
        <div className="login-box pt-5">
          <div className="row">
            <div className="col-12 col-sm-8 col-md-6 m-auto">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <div className="row">
                    <h2 className="text-center mb-3 fst-italic">ContactUs Form</h2>
                    <form action="#" method="post" onSubmit={handlesubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            {/* <label htmlFor="firstName" className="form-label">
                        First Name
                      </label> */}
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder="First Name"
                              required=""
                              value={FirstName} onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            {/* <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label> */}
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder="Last Name"
                              required=""
                              value={LastName} onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        {/* <label htmlFor="email" className="form-label">
                    Email
                  </label> */}
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          required=""
                          value={Email} onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        {/* <label htmlFor="contactNumber" className="form-label">
                    Contact Number
                  </label> */}
                        <input
                          type="tel"
                          className="form-control"
                          id="contactNumber"
                          placeholder="Contact Number"
                          required=""
                          value={Phone} onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        {/* <label htmlFor="message" className="form-label">
                    Message
                  </label> */}
                        <textarea
                          className="form-control"
                          id="message"
                          rows={4}
                          placeholder="Enter your message here..."
                          required=""
                          defaultValue={""}
                          value={Message} onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                      <div className="text-center mt-3">
                        <button
                          type="submit"
                          name="submit"
                          value="submit"
                          className="btn btn-primary"
                        >
                          submit
                        </button>
                        {/* <a href="reg.html" className="nav-link">Are you new user?</a> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default ContactUs