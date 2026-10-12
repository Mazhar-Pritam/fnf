import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function CategoryCreate() {
  const [errorMessage, setErrorMessage] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    try {
      const res = await axios.post('/category/create.php', formData);
      if (res.data.status) {
        window.location.href = '/categories';
      } else {
        setErrorMessage(res.data.message || 'Failed to create category.');
      }
    } catch (error) {
      console.error('Category create error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to create category. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Category</h3>

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
              <Link to="/categories">Categories</Link>
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
                    <label htmlFor="categoryName">Category Name</label>
                    <input type="text" name="name" className="form-control" id="categoryName" placeholder="Enter category name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoryDescription">Category Description</label>
                    <input type="text" name="description" className="form-control" id="categoryDescription" placeholder="Enter category description" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" className="form-control" id="image"/>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Category</button>
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

export default CategoryCreate;