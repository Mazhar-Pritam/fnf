import { useEffect, useState } from "react";

function Suppliers() {

  // Supplier data রাখার জন্য
  const [suppliers, setSuppliers] = useState([]);

  // Component load হলে API থেকে supplier আনবে
  useEffect(() => {

    fetch('http://localhost/fnf_api/suppliers/index.php')
      .then(response => response.json())
      .then(result => {

        if (result.status) {
          setSuppliers(result.data);
        }

      })
      .catch(error => {
        console.error("Error loading suppliers:", error);
      });

  }, []);


  return (
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">

          <h3 className="fw-bold mb-3">
            Suppliers
          </h3>

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
              <a href="#">
                Suppliers
              </a>
            </li>

          </ul>

        </div>


        {/* Supplier Table */}
        <div className="row">

          <div className="col-md-12">

            <div className="card card-round">

              {/* Card Header */}
              <div className="card-header">

                <div className="d-flex align-items-center">

                  <h4 className="card-title">
                    Supplier List
                  </h4>

                  <button
                    type="button"
                    className="btn btn-primary btn-round ms-auto"
                  >
                    <i className="fa fa-plus"></i>
                    &nbsp; Add Supplier
                  </button>

                </div>

              </div>


              {/* Card Body */}
              <div className="card-body">

                {/* Search */}
                <div className="row mb-3">

                  <div className="col-md-4">

                    <div className="input-icon">

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search supplier..."
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
                        <th>Supplier Name</th>
                        <th>Contact Person</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>

                    </thead>


                    <tbody>

                      {suppliers.map((supplier, index) => (

                        <tr key={supplier.id}>

                          <td>
                            {index + 1}
                          </td>

                          <td>
                            <strong>
                              {supplier.name}
                            </strong>
                          </td>

                          <td>
                            {supplier.contact_person}
                          </td>

                          <td>
                            {supplier.phone}
                          </td>

                          <td>
                            {supplier.email}
                          </td>

                          <td>
                            {supplier.address}
                          </td>

                          <td>

                            <div className="form-button-action">

                              <button
                                type="button"
                                className="btn btn-link btn-primary"
                                title="Edit Supplier"
                              >
                                <i className="fa fa-edit"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-link btn-danger"
                                title="Delete Supplier"
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
  );
}

export default Suppliers;