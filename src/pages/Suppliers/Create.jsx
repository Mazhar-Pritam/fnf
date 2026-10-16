import React from 'react';
import { Link } from 'react-router';
import Layout from '../Layout.jsx';
import axios from '../../Lib/axios.js';

function SupplierCreate() {
  const [error, setError] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const formData = new FormData(e.target);
      const res = await axios.post('/suppliers/create.php', formData);

      if (res.data.status) {
        window.location.href = '/suppliers';
      } else {
        setError(res.data.message || 'Unable to create supplier.');
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Unable to create supplier.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <div className="page-header">
            <h3 className="fw-bold mb-3">Add New Supplier</h3>
            <ul className="breadcrumbs mb-3">
              <li className="nav-home"><Link to="/"><i className="icon-home"></i></Link></li>
              <li className="separator"><i className="icon-arrow-right"></i></li>
              <li className="nav-item"><Link to="/suppliers">Suppliers</Link></li>
              <li className="separator"><i className="icon-arrow-right"></i></li>
              <li className="nav-item"><span>Add New</span></li>
            </ul>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="supplierName">Supplier Name</label>
                      <input type="text" name="name" className="form-control" id="supplierName" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactPerson">Contact Person</label>
                      <input type="text" name="contact_person" className="form-control" id="contactPerson" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="supplierPhone">Phone</label>
                      <input type="tel" name="phone" className="form-control" id="supplierPhone" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="supplierEmail">Email</label>
                      <input type="email" name="email" className="form-control" id="supplierEmail" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="supplierAddress">Address</label>
                      <textarea name="address" className="form-control" id="supplierAddress" rows="3" />
                    </div>
                    {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                    <button type="submit" className="btn btn-primary mt-3" disabled={saving}>
                      {saving ? 'Saving...' : 'Add Supplier'}
                    </button>
                    <Link to="/suppliers" className="btn btn-light mt-3 ms-2">Cancel</Link>
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
