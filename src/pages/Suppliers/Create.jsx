
import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from "../../Lib/axios.js";

function SupplierCreate() {
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    setErrorMessage("");

    try {
      const res = await axios.post(
        "/supplier/create.php",
        formData
      );

      if (res.data.status) {
        window.location.href = "/suppliers";
      } else {
        setErrorMessage(
          res.data.message || "Failed to create supplier."
        );
      }
    } catch (error) {
      console.error("Supplier create error:", error);

      setErrorMessage(
        error.response?.data?.message ||
        "Unable to create supplier. Please try again."
      );
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">
              Add New Supplier
            </h3>

            <ul className="breadcrumbs mb-3">
              <li className="nav-home">
                <a href="#">
                  <i className="icon-home"></i>
                </a>
              </li>

              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>

              <li className="nav-item">
                <Link to="/suppliers">
                  Suppliers
                </Link>
              </li>

              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>

              <li className="nav-item">
                <a href="#">
                  Add New
                </a>
              </li>
            </ul>
          </div>

          {/* Supplier Form Card */}
          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">

                <div className="card-body">
                  <form onSubmit={handleSubmit}>

                    {/* Error Message */}
                    {errorMessage && (
                      <div
                        className="alert alert-danger"
                        role="alert"
                      >
                        {errorMessage}
                      </div>
                    )}

                    {/* Supplier Name */}
                    <div className="form-group">
                      <label htmlFor="supplierName">
                        Supplier Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="supplierName"
                        placeholder="Enter supplier name"
                        required
                      />
                    </div>

                    {/* Contact Person */}
                    <div className="form-group">
                      <label htmlFor="supplierContact">
                        Contact Person
                      </label>

                      <input
                        type="text"
                        name="contact_person"
                        className="form-control"
                        id="supplierContact"
                        placeholder="Enter contact person"
                      />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                      <label htmlFor="supplierPhone">
                        Phone
                      </label>

                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        id="supplierPhone"
                        placeholder="Enter phone number"
                      />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="supplierEmail">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="supplierEmail"
                        placeholder="Enter email address"
                      />
                    </div>

                    {/* Address */}
                    <div className="form-group">
                      <label htmlFor="supplierAddress">
                        Address
                      </label>

                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        id="supplierAddress"
                        placeholder="Enter address"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                    >
                      Add Supplier
                    </button>

                    <Link
                      to="/suppliers"
                      className="btn btn-secondary mt-3 ms-2"
                    >
                      Cancel
                    </Link>

                  </form>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default SupplierCreate;
