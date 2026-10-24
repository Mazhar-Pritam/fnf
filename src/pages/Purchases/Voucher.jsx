import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

// Change this to your shop name. It is printed at the top of the voucher.
const SHOP_NAME = "Car Spare Parts Shop";

function PurchaseVoucher() {
  let { id } = useParams();

  const [purchase, setPurchase] = React.useState({});
  const [supplier, setSupplier] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchData() {
    try {
      const [purchaseRes, supplierRes] = await Promise.all([
        axios.get('/purchase/single.php?id=' + id),
        axios.get('supplier/index.php'),
      ]);

      const data = purchaseRes.data.data?.[0];
      if (data) {
        setPurchase(data);
        const found = (supplierRes.data.data || []).find((p) => p.id == data.supplier_id);
        setSupplier(found || {});
      } else {
        setErrorMessage(purchaseRes.data.message || 'Purchase not found.');
      }
    } catch (error) {
      console.error('Purchase load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load purchase. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [id]);

  const items = purchase.items || [];
  const total = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0),
    0
  );

  return (
    <Layout>
    {/* When printing, hide the menu, header and buttons. Only the voucher is printed. */}
    <style>{`
      @media print {
        .sidebar, .main-header, .footer, .no-print { display: none !important; }
        .main-panel { width: 100% !important; float: none !important; }
        .main-panel > .container { margin-top: 0 !important; padding: 0 !important; }
        .page-inner { padding: 0 !important; }
        .card { box-shadow: none !important; border: 0 !important; }
      }
    `}</style>

    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header no-print">
          <h3 className="fw-bold mb-3">Purchase Voucher</h3>

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
              <Link to="/purchases">Purchases</Link>
            </li>
            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              <a href="#">Voucher</a>
            </li>
          </ul>
        </div>

        {/* Card */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">

              <div className="card-body">

                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                {/* Buttons (not printed) */}
                <div className="d-flex justify-content-end mb-3 no-print">
                  <Link to="/purchases" className="btn btn-secondary btn-round me-2">
                    <i className="fa fa-arrow-left"></i>
                    &nbsp; Back
                  </Link>
                  <button type="button" className="btn btn-primary btn-round" onClick={() => window.print()}>
                    <i className="fa fa-print"></i>
                    &nbsp; Print
                  </button>
                </div>

                {/* Voucher */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1">{SHOP_NAME}</h2>
                  <h4 className="mb-0">PURCHASE VOUCHER</h4>
                </div>

                <div className="row mb-4">
                  <div className="col-6">
                    <p className="mb-1"><strong>Supplier:</strong> {supplier.name}</p>
                    {supplier.phone && <p className="mb-1"><strong>Phone:</strong> {supplier.phone}</p>}
                    {supplier.address && <p className="mb-1"><strong>Address:</strong> {supplier.address}</p>}
                  </div>
                  <div className="col-6 text-end">
                    <p className="mb-1"><strong>Voucher / Invoice No:</strong> {purchase.invoice_no}</p>
                    <p className="mb-1"><strong>Date:</strong> {purchase.purchase_date}</p>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Part</th>
                        <th className="text-end">Quantity</th>
                        <th className="text-end">Purchase Price</th>
                        <th className="text-end">Line Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.part_name}</td>
                          <td className="text-end">{item.quantity}</td>
                          <td className="text-end">{Number(item.unit_price).toFixed(2)}</td>
                          <td className="text-end">
                            {((Number(item.quantity) || 0) * (Number(item.unit_price) || 0)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="4" className="text-end">Grand Total</th>
                        <th className="text-end">{total.toFixed(2)}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {purchase.note && (
                  <p className="mt-3"><strong>Note:</strong> {purchase.note}</p>
                )}

                {/* Signatures */}
                <div className="row" style={{ marginTop: '80px' }}>
                  <div className="col-4 text-center">
                    <div style={{ borderTop: '1px solid #000', paddingTop: '5px' }}>Prepared By</div>
                  </div>
                  <div className="col-4 text-center">
                    <div style={{ borderTop: '1px solid #000', paddingTop: '5px' }}>Supplier Signature</div>
                  </div>
                  <div className="col-4 text-center">
                    <div style={{ borderTop: '1px solid #000', paddingTop: '5px' }}>Authorized Signature</div>
                  </div>
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

export default PurchaseVoucher;
