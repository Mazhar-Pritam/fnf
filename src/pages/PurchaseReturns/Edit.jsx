import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
import ReturnItems from './ReturnItems.jsx';

function PurchaseReturnEdit() {
  let { id } = useParams();

  const [ret, setRet] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchData() {
    try {
      const res = await axios.get('/purchase_return/single.php?id=' + id);
      const data = res.data.data?.[0];
      if (!data) {
        setErrorMessage(res.data.message || 'Return not found.');
        return;
      }
      setRet(data);

      // Items of the purchase, leaving out this return's own quantities.
      const itemRes = await axios.get(
        'purchase_return/returnable.php?purchase_id=' + data.purchase_id + '&return_id=' + id
      );
      setRows(
        (itemRes.data.data || []).map((row) => {
          const saved = (data.items || []).find((item) => item.part_id == row.part_id);
          return {
            ...row,
            quantity: saved ? saved.quantity : '',
            original: saved ? Number(saved.quantity) : 0,
          };
        })
      );
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

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    const items = rows
      .filter((row) => Number(row.quantity) > 0)
      .map((row) => ({ part_id: row.part_id, quantity: row.quantity }));

    if (items.length === 0) {
      setErrorMessage('Enter a return quantity for at least one part. To remove the whole return, delete it from the list.');
      return;
    }

    const payload = {
      return_no: formData.get('return_no'),
      purchase_id: ret.purchase_id,
      return_date: formData.get('return_date'),
      note: formData.get('note'),
      items: items,
    };

    try {
      const res = await axios.post('/purchase_return/update.php?id=' + id, JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/purchase-returns';
      } else {
        setErrorMessage(res.data.message || 'Failed to update purchase return.');
      }
    } catch (error) {
      console.error('Purchase return update error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to update purchase return. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Edit Purchase Return</h3>

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
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="returnNo">Return No</label>
                    <input type="text" onChange={(e) => setRet({...ret, return_no: e.target.value})} value={ret.return_no || ''} name="return_no" className="form-control" id="returnNo" placeholder="Enter return number" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="returnParent">Purchase (Invoice)</label>
                    <input type="text" value={ret.invoice_no || ''} className="form-control" id="returnParent" disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="returnDate">Return Date</label>
                    <input type="date" onChange={(e) => setRet({...ret, return_date: e.target.value})} value={ret.return_date || ''} name="return_date" className="form-control" id="returnDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="returnNote">Note / Reason</label>
                    <input type="text" onChange={(e) => setRet({...ret, note: e.target.value})} value={ret.note || ''} name="note" className="form-control" id="returnNote" placeholder="Enter reason for the return" />
                  </div>

                  <ReturnItems rows={rows} setRows={setRows} />

                  <button type="submit" className="btn btn-primary mt-3">Update Purchase Return</button>
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

export default PurchaseReturnEdit;
