import React from 'react';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
import { getStockStatus } from '../../Lib/stockStatus.js';

function Inventory() {
  const [items, setItems] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchInventory() {
    try {
      const res = await axios.get('inventory/index.php');
      if (res.data.status) {
        setItems(res.data.data || []);
      } else {
        setErrorMessage(res.data.message || 'Unable to load inventory.');
      }
    } catch (error) {
      console.error('Inventory load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load inventory. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchInventory();
  }, []);

  const keyword = search.trim().toLowerCase();
  const filtered = items.filter((item) =>
    !keyword ||
    (item.name || '').toLowerCase().includes(keyword) ||
    (item.part_number || '').toLowerCase().includes(keyword) ||
    (item.category_name || '').toLowerCase().includes(keyword)
  );

  const totalUnits = items.reduce((sum, item) => sum + Number(item.stock_quantity), 0);
  const stockValue = items.reduce(
    (sum, item) => sum + Number(item.stock_quantity) * Number(item.purchase_price),
    0
  );
  const lowCount = items.filter((item) => {
    const stock = Number(item.stock_quantity) || 0;
    return stock > 0 && stock <= (Number(item.minimum_stock) || 0);
  }).length;
  const outOfStockCount = items.filter((item) => Number(item.stock_quantity) <= 0).length;


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Inventory</h3>

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
              <a href="#">Inventory</a>
            </li>
          </ul>
        </div>

        {/* Summary */}
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Total Parts</p>
                <h4 className="card-title">{items.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Units in Stock</p>
                <h4 className="card-title">{totalUnits}</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Stock Value (at purchase price)</p>
                <h4 className="card-title">{stockValue.toFixed(2)}</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Low / Out of Stock Items</p>
                <h4 className="card-title">{lowCount + outOfStockCount}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="row">
          <div className="col-md-12">

            <div className="card card-round">

              <div className="card-header">
                <div className="d-flex align-items-center">

                  <h4 className="card-title">
                    Stock Report
                  </h4>

                </div>
              </div>

              <div className="card-body">
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                {/* Search */}
                <div className="row mb-3">
                  <div className="col-md-4">

                    <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search part, number or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <span className="input-icon-addon">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>

                  </div>
                </div>

                {/* Table */}
                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Part Name</th>
                        <th>Part Number</th>
                        <th>Category</th>
                        <th>Purchased</th>
                        <th>Sold</th>
                        <th>In Stock</th>
                        <th>Stock Value</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>

                      {filtered.map((item, index) => (

                        <tr key={item.id}>

                          <td>{index + 1}</td>

                          <td>
                            <strong>{item.name}</strong>
                          </td>

                          <td>{item.part_number}</td>

                          <td>{item.category_name}</td>

                          <td>{item.purchased_qty}</td>

                          <td>{item.sold_qty}</td>

                          <td><strong>{item.stock_quantity}</strong></td>

                          <td>{(Number(item.stock_quantity) * Number(item.purchase_price)).toFixed(2)}</td>

                          <td>
                            {(() => {
                              const status = getStockStatus(item.stock_quantity, item.minimum_stock);
                              return <span className={`badge ${status.className}`}>{status.label}</span>;
                            })()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Inventory;
