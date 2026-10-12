
import React from 'react';
import { Link, useNavigate } from 'react-router';
import Layout from "../Layout.jsx";

function SupplierCreate() {

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login token not found. Please login again.");
      return;
    }

    try {
      const res = await fetch(
        'http://localhost/fnf_api/suppliers/create.php',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();

      if (res.ok && result.status) {
        alert("Supplier created successfully!");
        navigate('/suppliers');
      } else {
        alert(result.message || "Failed to create supplier.");
      }
    } catch (error) {
      console.error("Supplier create error:", error);
      alert("Server connection failed.");
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Add New Supplier</h3>

            <ul className="breadcrumbs mb-3">
              <li className="nav-home">
                <Link to="/">
                  <i className="icon-home"></i>
                </Link>
              </li>

              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>

              <li className="nav-item">
                <Link to="/suppliers">Suppliers</Link>
              </li>

              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>

              <li className="nav-item">
                <a href="#">Add New</a>
              </li>
            </ul>
          </div>

          {/* Supplier Form */}
          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">

                <div className="card-body">
                  <form onSubmit={handleSubmit}>

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

                    <div className="form-group">
                      <label htmlFor="contactPerson">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        name="contact_person"
                        className="form-control"
                        id="contactPerson"
                        placeholder="Enter contact person name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="supplierPhone">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        id="supplierPhone"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>

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

                    <div className="form-group">
                      <label htmlFor="supplierAddress">
                        Address
                      </label>
                      <textarea
                        name="address"
                        className="form-control"
                        id="supplierAddress"
                        rows="3"
                        placeholder="Enter supplier address"
                      ></textarea>
                    </div>

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