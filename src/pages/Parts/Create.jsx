import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function PartCreate() {
  const [categories, setCategories] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchCategories() {
    try {
      let res = await axios.get('category/index.php');
      setCategories(res.data.data);
    } catch (error) {
      console.error('Category load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load categories. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    try {
      const res = await axios.post('/part/create.php', formData);
      if (res.data.status) {
        window.location.href = '/parts';
      } else {
        setErrorMessage(res.data.message || 'Failed to create spare part.');
      }
    } catch (error) {
      console.error('Part create error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to create spare part. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Spare Part</h3>

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
              <Link to="/parts">Spare Parts</Link>
            </li>
            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              <a href="#">Add New</a>
            </li>
          </ul>
        </div>

        {/* Card */}
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
                    <label htmlFor="partName">Part Name</label>
                    <input type="text" name="name" className="form-control" id="partName" placeholder="Enter part name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="partNumber">Part Number</label>
                    <input type="text" name="part_number" className="form-control" id="partNumber" placeholder="Enter part number" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="partCategory">Category</label>
                    <select name="category_id" className="form-select" id="partCategory" required>
                      <option value="">Select category</option>
                      {categories && categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="partPurchasePrice">Purchase Price</label>
                    <input type="number" step="0.01" name="purchase_price" className="form-control" id="partPurchasePrice" placeholder="Enter purchase price" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="partSalePrice">Sale Price</label>
                    <input type="number" step="0.01" name="sale_price" className="form-control" id="partSalePrice" placeholder="Enter sale price" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="partStock">Stock Quantity</label>
                    <input type="number" name="stock_quantity" className="form-control" id="partStock" placeholder="Enter stock quantity" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="partDescription">Description</label>
                    <input type="text" name="description" className="form-control" id="partDescription" placeholder="Enter description" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" className="form-control" id="image"/>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Spare Part</button>
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

export default PartCreate;
