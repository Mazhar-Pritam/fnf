import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function SupplierCreate() {
  const [errorMessage, setErrorMessage] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    try {
      const res = await axios.post('/suppliers/create.php', formData);

      if (res.data.status) {
        window.location.href = '/suppliers';
      } else {
        setErrorMessage(res.data.message || 'Failed to create supplier.');
      }
    } catch (error) {
      console.error('Supplier create error:', error);
      setErrorMessage(
        error.response?.data?.message ||
        'Unable to create supplier. Please try again.'
      );
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
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
                <span>Add New</span>
              </li>
            </ul>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="name">Supplier Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Enter supplier name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact_person">Contact Person</label>
                      <input
                        type="text"
                        name="contact_person"
                        className="form-control"
                        id="contact_person"
                        placeholder="Enter contact person"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <textarea
                        name="address"
                        className="form-control"
                        id="address"
                        placeholder="Enter supplier address"
                        rows="3"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                    >
                      Add Supplier
                    </button>
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
