import React from 'react';
import { Link } from 'react-router';
function SuppliersCreate() {

  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    fetch('http://localhost/fnf_api/suppliers/insert.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Optionally, you can redirect the user to another page or show a success message here
        window.location.href = '/suppliers';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Supplier</h3>

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
                    <label htmlFor="SuppliersName">Suppliers Name</label>
                    <input type="text" name="name" className="form-control" id="SuppliersName" placeholder="Enter Suppliers name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="SuppliersDescription">Suppliers Description</label>
                    <input type="text" name="description" className="form-control" id="SuppliersDescription" placeholder="Enter Suppliers description" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Suppliers</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SuppliersCreate;