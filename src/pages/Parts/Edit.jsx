import React from "react";
import { Link, useParams } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function PartEdit() {
  let { id } = useParams();

  const [part, setPart] = React.useState({});
  const [categories, setCategories] = React.useState([]);

  async function fetchPart() {
    let res = await axios.get('/part/single.php?id=' + id);
    setPart(res.data.data?.[0] || {});
  }

  async function fetchCategories() {
    let res = await axios.get('category/index.php');
    setCategories(res.data.data);
  }

  React.useEffect(() => {
    fetchPart();
    fetchCategories();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/part/update.php?id=' + id, formData);
    if (res.status == 200) {
      window.location.href = '/parts';
    }
  }


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Edit Spare Part</h3>

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
                <a href="#">Edit</a>
              </li>
            </ul>
          </div>

          {/* Card */}
          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">

                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="partName">Part Name</label>
                      <input type="text" onChange={(e) => setPart({ ...part, name: e.target.value })} value={part.name || ''} name="name" className="form-control" id="partName" placeholder="Enter part name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="partNumber">Part Number</label>
                      <input type="text" onChange={(e) => setPart({ ...part, part_number: e.target.value })} value={part.part_number || ''} name="part_number" className="form-control" id="partNumber" placeholder="Enter part number" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="partCategory">Category</label>
                      <select onChange={(e) => setPart({ ...part, category_id: e.target.value })} value={part.category_id || ''} name="category_id" className="form-select" id="partCategory" required>
                        <option value="">Select category</option>
                        {categories && categories.map((category) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="partPurchasePrice">Purchase Price</label>
                      <input type="number" step="0.01" onChange={(e) => setPart({ ...part, purchase_price: e.target.value })} value={part.purchase_price || ''} name="purchase_price" className="form-control" id="partPurchasePrice" placeholder="Enter purchase price" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="partSalePrice">Sale Price</label>
                      <input type="number" step="0.01" onChange={(e) => setPart({ ...part, sale_price: e.target.value })} value={part.sale_price || ''} name="sale_price" className="form-control" id="partSalePrice" placeholder="Enter sale price" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="partStock">Stock Quantity</label>
                      <input type="number" onChange={(e) => setPart({ ...part, stock_quantity: e.target.value })} value={part.stock_quantity || ''} name="stock_quantity" className="form-control" id="partStock" placeholder="Enter stock quantity" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="partDescription">Description</label>
                      <input type="text" onChange={(e) => setPart({ ...part, description: e.target.value })} value={part.description || ''} name="description" className="form-control" id="partDescription" placeholder="Enter description" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Update Spare Part</button>
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
export default PartEdit;
