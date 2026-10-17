import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Parts() {
  const [parts, setParts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  async function fetchParts() {
    let res = await axios.get('part/index.php');
    setParts(res.data.data);
  }

  async function fetchCategories() {
    let res = await axios.get('category/index.php');
    setCategories(res.data.data);
  }

  React.useEffect(() => {
    fetchParts();
    fetchCategories();
  }, []);

  function categoryName(id) {
    const category = categories && categories.find((c) => c.id == id);
    return category ? category.name : '';
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this part?")) {
      let res = await axios.delete(`part/delete.php?id=${id}`);
      if (res.data.status) {
        fetchParts();
      } else {
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
            <h3 className="fw-bold mb-3">Spare Parts</h3>

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
                <a href="#">Spare Parts</a>
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
                      Spare Parts
                    </h4>

                    <Link to="/parts/create" className="btn btn-primary btn-round ms-auto">
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Spare Part
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
                          placeholder="Search spare part..."
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
                          <th>Purchase Price</th>
                          <th>Sale Price</th>
                          <th>Stock</th>
                          <th>Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {parts && parts.map((part, index) => (

                          <tr key={part.id}>

                            <td>{index + 1}</td>

                            <td>
                              <strong>{part.name}</strong>
                            </td>

                            <td>{part.part_number}</td>

                            <td>{categoryName(part.category_id)}</td>

                            <td>{part.purchase_price}</td>

                            <td>{part.sale_price}</td>

                            <td>{part.stock_quantity}</td>

                            <td>
                              {part.image && (
                                <img src={`${import.meta.env.VITE_API_URL}${part.image}`} alt={part.name} className="img-fluid" width="100" />
                              )}
                            </td>

                            <td>

                              <div className="form-button-action">

                                <Link to={`/parts/edit/${part.id}`}
                                  className="btn btn-link btn-primary"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <button
                                  className="btn btn-link btn-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(part.id)}
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
export default Parts;
