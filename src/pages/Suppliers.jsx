function Suppliers() {

  const suppliers = [
    {
      id: 1,
      name: "Auto Parts BD",
      contactPerson: "Rahim Ahmed",
      phone: "01711-123456",
      email: "autoparts@gmail.com",
      address: "Dhaka, Bangladesh"
    },
    {
      id: 2,
      name: "Car Care Suppliers",
      contactPerson: "Karim Hasan",
      phone: "01822-234567",
      email: "carcare@gmail.com",
      address: "Chattogram, Bangladesh"
    },
    {
      id: 3,
      name: "Bangladesh Auto Supply",
      contactPerson: "Sakib Khan",
      phone: "01933-345678",
      email: "basupply@gmail.com",
      address: "Narayanganj, Bangladesh"
    },
    {
      id: 4,
      name: "Motor Parts House",
      contactPerson: "Imran Hossain",
      phone: "01644-456789",
      email: "motorparts@gmail.com",
      address: "Gazipur, Bangladesh"
    },
    {
      id: 5,
      name: "Premium Auto Parts",
      contactPerson: "Tanvir Ahmed",
      phone: "01555-567890",
      email: "premiumauto@gmail.com",
      address: "Sylhet, Bangladesh"
    }
  ];

  return (
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Suppliers</h3>

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
              <a href="#">Suppliers</a>
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

                  <button className="btn btn-primary btn-round ms-auto">
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

                          <td>{index + 1}</td>

                          <td>
                            <strong>{supplier.name}</strong>
                          </td>

                          <td>
                            {supplier.contactPerson}
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

                              {/* Edit */}
                              <button
                                type="button"
                                className="btn btn-link btn-primary"
                                title="Edit Supplier"
                              >
                                <i className="fa fa-edit"></i>
                              </button>

                              {/* Delete */}
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