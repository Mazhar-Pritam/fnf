import React from 'react';
import { Link, useParams } from 'react-router';
import Layout from '../Layout.jsx';
import axios from '../../Lib/axios.js';

const emptySupplier = {
  supplier_name: '',
  company_name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  opening_balance: '0.00',
};

function SupplierEdit() {
  const { id } = useParams();
  const [supplier, setSupplier] = React.useState(emptySupplier);
  const [loading, setLoading] = React.useState(true);
  const [supplierLoaded, setSupplierLoaded] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    async function fetchSupplier() {
      setLoading(true);
      setError('');

      try {
        const res = await axios.get(`/suppliers/read_one.php?id=${encodeURIComponent(id)}`);
        const record = res.data.data?.[0];

        if (!res.data.status || !record) {
          setError(res.data.message || 'Supplier not found.');
          return;
        }

        setSupplier({
          supplier_name: record.supplier_name || '',
          company_name: record.company_name || '',
          phone: record.phone || '',
          email: record.email || '',
          address: record.address || '',
          city: record.city || '',
          opening_balance: record.opening_balance ?? '0.00',
        });
        setSupplierLoaded(true);
      } catch (requestError) {
        setError(requestError.response?.data?.message || requestError.message || 'Unable to load supplier.');
      } finally {
        setLoading(false);
      }
    }

    fetchSupplier();
  }, [id]);

  function handleChange(e) {
    setSupplier((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const formData = new FormData(e.target);
      const res = await axios.post(`/suppliers/update.php?id=${encodeURIComponent(id)}`, formData);

      if (res.data.status) {
        window.location.href = '/suppliers';
      } else {
        setError(res.data.message || 'Unable to update supplier.');
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Unable to update supplier.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <div className="page-header">
            <h3 className="fw-bold mb-3">Edit Supplier</h3>
            <ul className="breadcrumbs mb-3">
              <li className="nav-home"><Link to="/"><i className="icon-home"></i></Link></li>
              <li className="separator"><i className="icon-arrow-right"></i></li>
              <li className="nav-item"><Link to="/suppliers">Suppliers</Link></li>
              <li className="separator"><i className="icon-arrow-right"></i></li>
              <li className="nav-item"><span>Edit</span></li>
            </ul>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  {loading ? (
                    <p>Loading supplier...</p>
                  ) : supplierLoaded ? (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="supplierName">Supplier Name</label>
                        <input type="text" name="supplier_name" className="form-control" id="supplierName" value={supplier.supplier_name} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" name="company_name" className="form-control" id="companyName" value={supplier.company_name} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="supplierPhone">Phone</label>
                        <input type="tel" name="phone" className="form-control" id="supplierPhone" value={supplier.phone} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="supplierEmail">Email</label>
                        <input type="email" name="email" className="form-control" id="supplierEmail" value={supplier.email} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="supplierAddress">Address</label>
                        <textarea name="address" className="form-control" id="supplierAddress" rows="3" value={supplier.address} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="supplierCity">City</label>
                        <input type="text" name="city" className="form-control" id="supplierCity" value={supplier.city} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="openingBalance">Opening Balance</label>
                        <input type="number" name="opening_balance" className="form-control" id="openingBalance" min="0" step="0.01" value={supplier.opening_balance} onChange={handleChange} />
                      </div>
                      {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                      <button type="submit" className="btn btn-primary mt-3" disabled={saving}>
                        {saving ? 'Saving...' : 'Update Supplier'}
                      </button>
                      <Link to="/suppliers" className="btn btn-light mt-3 ms-2">Cancel</Link>
                    </form>
                  ) : (
                    <>
                      <div className="alert alert-danger" role="alert">{error}</div>
                      <Link to="/suppliers" className="btn btn-light">Back to Suppliers</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SupplierEdit;
