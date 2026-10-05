function Inventory() {
  const inventory = [
    { id: 1, name: "Engine Oil Filter", code: "FLT-001", category: "Filters", supplier: "Auto Parts BD", stock: 25, minStock: 10, purchasePrice: 450, sellingPrice: 600 },
    { id: 2, name: "Brake Pad Set", code: "BRK-002", category: "Brake", supplier: "Car Zone Ltd.", stock: 8, minStock: 10, purchasePrice: 2200, sellingPrice: 2800 },
    { id: 3, name: "Air Filter", code: "FLT-003", category: "Filters", supplier: "Auto Parts BD", stock: 32, minStock: 10, purchasePrice: 700, sellingPrice: 900 },
    { id: 4, name: "Spark Plug", code: "ENG-004", category: "Engine", supplier: "Motor World", stock: 0, minStock: 10, purchasePrice: 350, sellingPrice: 500 },
    { id: 5, name: "Battery 12V", code: "BAT-005", category: "Electrical", supplier: "Power Auto", stock: 15, minStock: 5, purchasePrice: 8500, sellingPrice: 9800 },
    { id: 6, name: "Coolant 1L", code: "ENG-006", category: "Engine", supplier: "Motor World", stock: 6, minStock: 10, purchasePrice: 500, sellingPrice: 700 },
  ];

  const getStatus = (stock, minStock) => {
    if (stock === 0) return { text: "Out of Stock", className: "badge badge-danger" };
    if (stock <= minStock) return { text: "Low Stock", className: "badge badge-warning" };
    return { text: "In Stock", className: "badge badge-success" };
  };

  const totalParts = inventory.length;
  const inStock = inventory.filter((item) => item.stock > item.minStock).length;
  const lowStock = inventory.filter((item) => item.stock > 0 && item.stock <= item.minStock).length;
  const outOfStock = inventory.filter((item) => item.stock === 0).length;

  return (
    <div className="container">
      <div className="page-inner">
        <div className="page-header">
          <h3 className="fw-bold mb-3">Inventory</h3>
          <ul className="breadcrumbs mb-3">
            <li className="nav-home"><a href="#"><i className="icon-home"></i></a></li>
            <li className="separator"><i className="icon-arrow-right"></i></li>
            <li className="nav-item"><a href="#">Inventory</a></li>
          </ul>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round"><div className="card-body">
              <div className="row align-items-center"><div className="col-icon">
                <div className="icon-big text-center icon-primary bubble-shadow-small"><i className="fas fa-boxes"></i></div>
              </div><div className="col col-stats ms-3 ms-sm-0"><div className="numbers">
                <p className="card-category">Total Parts</p><h4 className="card-title">{totalParts}</h4>
              </div></div></div>
            </div></div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round"><div className="card-body">
              <div className="row align-items-center"><div className="col-icon">
                <div className="icon-big text-center icon-success bubble-shadow-small"><i className="fas fa-check-circle"></i></div>
              </div><div className="col col-stats ms-3 ms-sm-0"><div className="numbers">
                <p className="card-category">In Stock</p><h4 className="card-title">{inStock}</h4>
              </div></div></div>
            </div></div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round"><div className="card-body">
              <div className="row align-items-center"><div className="col-icon">
                <div className="icon-big text-center icon-warning bubble-shadow-small"><i className="fas fa-exclamation-triangle"></i></div>
              </div><div className="col col-stats ms-3 ms-sm-0"><div className="numbers">
                <p className="card-category">Low Stock</p><h4 className="card-title">{lowStock}</h4>
              </div></div></div>
            </div></div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round"><div className="card-body">
              <div className="row align-items-center"><div className="col-icon">
                <div className="icon-big text-center icon-danger bubble-shadow-small"><i className="fas fa-times-circle"></i></div>
              </div><div className="col col-stats ms-3 ms-sm-0"><div className="numbers">
                <p className="card-category">Out of Stock</p><h4 className="card-title">{outOfStock}</h4>
              </div></div></div>
            </div></div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Parts Inventory</h4>
                  <button className="btn btn-primary btn-round ms-auto">
                    <i className="fa fa-plus"></i>&nbsp; Add Part
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="input-icon">
                      <input type="text" className="form-control" placeholder="Search parts..." />
                      <span className="input-icon-addon"><i className="fa fa-search"></i></span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select">
                      <option value="">All Categories</option>
                      <option value="Filters">Filters</option>
                      <option value="Brake">Brake</option>
                      <option value="Engine">Engine</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select">
                      <option value="">All Status</option>
                      <option value="in-stock">In Stock</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-secondary w-100"><i className="fa fa-filter"></i> Filter</button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th><th>Part Name</th><th>Part Code</th><th>Category</th>
                        <th>Supplier</th><th>Stock</th><th>Purchase Price</th>
                        <th>Selling Price</th><th>Status</th><th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item, index) => {
                        const status = getStatus(item.stock, item.minStock);
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><strong>{item.name}</strong></td>
                            <td>{item.code}</td>
                            <td>{item.category}</td>
                            <td>{item.supplier}</td>
                            <td><strong>{item.stock}</strong> <small className="text-muted">/ Min {item.minStock}</small></td>
                            <td>৳ {item.purchasePrice.toLocaleString()}</td>
                            <td>৳ {item.sellingPrice.toLocaleString()}</td>
                            <td><span className={status.className}>{status.text}</span></td>
                            <td>
                              <div className="form-button-action">
                                <button type="button" className="btn btn-link btn-primary" title="Edit Part">
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button type="button" className="btn btn-link btn-danger" title="Delete Part">
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-body">
                <h5 className="card-title">Inventory Business Logic</h5>
                <div className="row">
                  <div className="col-md-4">
                    <h6><i className="fas fa-arrow-up text-success"></i> Purchase</h6>
                    <p className="text-muted">Purchase increases the available stock quantity.</p>
                  </div>
                  <div className="col-md-4">
                    <h6><i className="fas fa-arrow-down text-danger"></i> Sale / Service</h6>
                    <p className="text-muted">Selling or using a part in service decreases stock.</p>
                  </div>
                  <div className="col-md-4">
                    <h6><i className="fas fa-exclamation text-warning"></i> Low Stock Alert</h6>
                    <p className="text-muted">Stock at or below the minimum level becomes Low Stock.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
