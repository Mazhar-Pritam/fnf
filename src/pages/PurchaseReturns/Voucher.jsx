import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

// Change this to your shop name. It is printed at the top of the voucher.
const SHOP_NAME = "Car Spare Parts Shop";

function PurchaseReturnVoucher() {
  let { id } = useParams();

  const [ret, setRet] = React.useState({});
  const [party, setParty] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchData() {
    try {
      const [retRes, partyRes] = await Promise.all([
        axios.get('/purchase_return/single.php?id=' + id),
        axios.get('supplier/index.php'),
      ]);

      const data = retRes.data.data?.[0];
      if (data) {
        setRet(data);
        const found = (partyRes.data.data || []).find((p) => p.id == data.supplier_id);
        setParty(found || {});
      } else {
        setErrorMessage(retRes.data.message || 'Return not found.');
      }
    } catch (error) {
      console.error('Purchase return load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load the return. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [id]);

  const items = ret.items || [];
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
          <h3 className="fw-bold mb-3">Purchase Return Voucher</h3>

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
              <Link to="/purchase-returns">Purchase Returns</Link>
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
                  <Link to="/purchase-returns" className="btn btn-secondary btn-round me-2">
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
                  <h4 className="mb-0">PURCHASE RETURN VOUCHER</h4>
                </div>

                <div className="row mb-4">
                  <div className="col-6">
                    <p className="mb-1"><strong>Supplier:</strong> {party.name}</p>
                    {party.phone && <p className="mb-1"><strong>Phone:</strong> {party.phone}</p>}
                    {party.address && <p className="mb-1"><strong>Address:</strong> {party.address}</p>}
                  </div>
                  <div className="col-6 text-end">
                    <p className="mb-1"><strong>Return No:</strong> {ret.return_no}</p>
                    <p className="mb-1"><strong>Against Purchase Invoice:</strong> {ret.invoice_no}</p>
                    <p className="mb-1"><strong>Date:</strong> {ret.return_date}</p>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Part</th>
                        <th className="text-end">Returned Qty</th>
                        <th className="text-end">Unit Price</th>
                        <th className="text-end">Line Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {item.part_name}
                            {item.part_number ? ` (${item.part_number})` : ''}
                          </td>
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

                {ret.note && (
                  <p className="mt-3"><strong>Reason / Note:</strong> {ret.note}</p>
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

export default PurchaseReturnVoucher;
