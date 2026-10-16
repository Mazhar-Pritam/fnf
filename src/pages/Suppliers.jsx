import React from 'react';
import { Link } from 'react-router';
import Layout from './Layout.jsx';
import axios from '../Lib/axios.js';

function Suppliers() {
  const [suppliers, setSuppliers] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    async function fetchSuppliers() {
      setLoading(true);
      setError('');

      try {
        const res = await axios.get('/suppliers/index.php');
        if (res.data.status) {
          setSuppliers(res.data.data);
        } else if (res.data.message === 'No records found') {
          setSuppliers([]);
        } else {
          setError(res.data.message || 'Unable to load suppliers.');
        }
      } catch (requestError) {
        setError(requestError.response?.data?.message || requestError.message || 'Unable to load suppliers.');
      } finally {
        setLoading(false);
      }
    }

    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) =>
    [supplier.supplier_name, supplier.company_name, supplier.phone, supplier.email, supplier.address, supplier.city]
      .some((value) => value?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <div className="page-header">
            <h3 className="fw-bold mb-3">Suppliers</h3>
            <ul className="breadcrumbs mb-3">
              <li className="nav-home"><Link to="/"><i className="icon-home"></i></Link></li>
              <li className="separator"><i className="icon-arrow-right"></i></li>
              <li className="nav-item"><span>Suppliers</span></li>
            </ul>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-header">
                  <div className="d-flex align-items-center">
                    <h4 className="card-title">Supplier List</h4>
                    <Link to="/suppliers/create" className="btn btn-primary btn-round ms-auto">
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Supplier
                    </Link>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="input-icon">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search supplier..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="input-icon-addon"><i className="fa fa-search"></i></span>
                      </div>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                  {loading ? (
                    <p>Loading suppliers...</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Supplier Name</th>
                            <th>Company Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSuppliers.map((supplier, index) => (
                            <tr key={supplier.supplier_id}>
                              <td>{index + 1}</td>
                              <td><strong>{supplier.supplier_name}</strong></td>
                              <td>{supplier.company_name}</td>
                              <td>{supplier.phone}</td>
                              <td>{supplier.email}</td>
                              <td>{supplier.address}</td>
                              <td>{supplier.city}</td>
                              <td>
                                <div className="form-button-action">
                                  <Link
                                    to={`/suppliers/edit/${supplier.supplier_id}`}
                                    className="btn btn-link btn-primary"
                                    title="Edit Supplier"
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {filteredSuppliers.length === 0 && (
                            <tr>
                              <td colSpan="8" className="text-center">
                                {search ? 'No suppliers match your search.' : 'No suppliers found.'}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
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

export default Suppliers;
