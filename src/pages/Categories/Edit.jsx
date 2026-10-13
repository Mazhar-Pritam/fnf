import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
function CategoryEdit() {

  let { id } = useParams();

  const [categories, setCategories] = React.useState([]);

  
    async function fetchCategories() {
      let res = await axios.get('/category/single.php?id=' + id);
      setCategories(res.data.data?.[0]);
     }
  
    React.useEffect(() => {
      fetchCategories();
    }
  , [id]);

 async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/category/update.php?id=' +id, formData);
    if(res.status === 200) {
      window.location.href = '/categories';
    }
  }

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Edit Category</h3>

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
                  <div className="form-group">
                    
                    <label htmlFor="categoryName">Category Name</label>
                    <input type="text" onChange={(e) => setCategories({...categories, name: e.target.value})} value={categories.name || ''} name="name" className="form-control" id="categoryName" placeholder="Enter category name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoryDescription">Category Description</label>
                    <input type="text" onChange={(e) => setCategories({...categories, description: e.target.value})} value={categories.description || ''} name="description" className="form-control" id="categoryDescription" placeholder="Enter category description" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Update Category</button>
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

export default CategoryEdit;