import { useEffect, useState } from "react";

function Suppliers() {

  // Supplier data
  const [suppliers, setSuppliers] = useState([]);

  // Show / hide add supplier form
  const [showForm, setShowForm] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: ""
  });

  // Load suppliers from API
  useEffect(() => {

    fetch("http://localhost/fnf_api/suppliers/index.php")
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

  // Handle form input
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  // Save supplier
  const handleSubmit = (e) => {

    e.preventDefault();

    fetch("http://localhost/fnf_api/suppliers/insert.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(result => {

        if (result.status) {

          alert("Supplier added successfully");

          setFormData({
            name: "",
            contact_person: "",
            phone: "",
            email: "",
            address: ""
          });

          setShowForm(false);

          // Reload supplier list
          fetch("http://localhost/fnf_api/suppliers/index.php")
            .then(response => response.json())
            .then(result => {

              if (result.status) {
                setSuppliers(result.data);
              }

            })
            .catch(error => {
              console.error("Error reloading suppliers:", error);
            });

        } else {

          alert(result.message);

        }

      })
      .catch(error => {
        console.error("Error adding supplier:", error);
        alert("Something went wrong while adding supplier.");
      });

  };

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


        {/* Add Supplier Form */}
        {showForm && (
          <div className="row mb-4">

            <div className="col-md-12">

              <div className="card card-round">

                <div className="card-header">

                  <div className="d-flex align-items-center">

                    <h4 className="card-title">
                      Add Supplier
                    </h4>

                    <button
                      type="button"
                      className="btn btn-secondary btn-round ms-auto"
                      onClick={() => setShowForm(false)}
                    >
                      <i className="fa fa-times"></i>
                      &nbsp; Close
                    </button>

                  </div>

                </div>

                <div className="card-body">

                  <form onSubmit={handleSubmit}>

                    <div className="row">

                      {/* Supplier Name */}
                      <div className="col-md-6 mb-3">

                        <label className="form-label">
                          Supplier Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter supplier name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />

                      </div>


                      {/* Contact Person */}
                      <div className="col-md-6 mb-3">

                        <label className="form-label">
                          Contact Person
                        </label>

                        <input
                          type="text"
                          name="contact_person"
                          className="form-control"
                          placeholder="Enter contact person"
                          value={formData.contact_person}
                          onChange={handleChange}
                        />

                      </div>


                      {/* Phone */}
                      <div className="col-md-6 mb-3">

                        <label className="form-label">
                          Phone
                        </label>

                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />

                      </div>


                      {/* Email */}
                      <div className="col-md-6 mb-3">

                        <label className="form-label">
                          Email
                        </label>

                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
                        />

                      </div>


                      {/* Address */}
                      <div className="col-md-12 mb-3">

                        <label className="form-label">
                          Address
                        </label>

                        <textarea
                          name="address"
                          className="form-control"
                          rows="3"
                          placeholder="Enter supplier address"
                          value={formData.address}
                          onChange={handleChange}
                        ></textarea>

                      </div>


                      {/* Buttons */}
                      <div className="col-md-12">

                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          <i className="fa fa-save"></i>
                          &nbsp; Save Supplier
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary ms-2"
                          onClick={() => setShowForm(false)}
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  </form>

                </div>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Suppliers;
