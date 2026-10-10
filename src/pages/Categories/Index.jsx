import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
function Categories() {

  const [categories, setCategories] = React.useState([]);
  const fetchCategories = async (e) => {
      let res = await axios.get(`category/index.php`)
      setCategories(res.data.data);
  }
  
  React.useEffect(() => {
    fetchCategories();
  }
, []);

  async function handleDelete(id) {
  if (window.confirm("Are you sure you want to delete this category?")) {
    let res = await axios.delete(`category/delete.php?id=${id}`)
    if(res.data.status){
      fetchCategories();
    }else{
      alert(res.data.message);
    }
  }
}

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Categories</h3>

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
              <a href="#">Categories</a>
            </li>
          </ul>
        </div>

        {/* Table Card */}
        <div className="row">
          <div className="col-md-12">

            <div className="card card-round">

              <div className="card-header">
                <div className="d-flex align-items-center">

                  <h4 className="card-title">
                    Parts Categories
                  </h4>

                  <Link to="/categories/create" className="btn btn-primary btn-round ms-auto">
                    <i className="fa fa-plus"></i>
                    &nbsp; Add Category
                  </Link>

                </div>
              </div>

              <div className="card-body">

                {/* Search */}
                <div className="row mb-3">
                  <div className="col-md-4">

                    <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search category..."
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
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {categories && categories.map((category, index) => (

                        <tr key={category.id}>

                          <td>{index + 1}</td>

                          <td>
                            <strong>{category.name}</strong>
                          </td>

                          <td>{category.description}</td>

                          <td>
                            {category.image && (
                              <img src={`${import.meta.env.VITE_API_URL}${category.image}`} alt={category.name} className="img-fluid" width="100" />
                            )}
                          </td>

                          <td>

                            <div className="form-button-action">

                              <Link to={`/categories/edit/${category.id}`}
                                className="btn btn-link btn-primary"
                                title="Edit"
                              >
                                <i className="fa fa-edit"></i>
                              </Link>

                              <button
                                className="btn btn-link btn-danger"
                                title="Delete"
                                onClick={() => handleDelete(category.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
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

export default Categories;