import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
import ReturnItems from './ReturnItems.jsx';

function PurchaseReturnCreate() {
  const [parents, setParents] = React.useState([]);
  const [parentId, setParentId] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchParents() {
    try {
      const res = await axios.get('purchase_return/parents.php');
      setParents(res.data.data || []);
    } catch (error) {
      console.error('Purchase list load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load purchases. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchParents();
  }, []);

  // When a purchase is chosen, load its items and how much of each can still be returned.
  async function handleParentChange(e) {
    const value = e.target.value;
    setParentId(value);
    setRows([]);
    setErrorMessage('');
    if (!value) {
      return;
    }
    try {
      const res = await axios.get('purchase_return/returnable.php?purchase_id=' + value);
      setRows((res.data.data || []).map((row) => ({ ...row, quantity: '', original: 0 })));
    } catch (error) {
      console.error('Purchase items load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load the items. Please try again.'
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    // Only the rows where a return quantity was typed are sent.
    const items = rows
      .filter((row) => Number(row.quantity) > 0)
      .map((row) => ({ part_id: row.part_id, quantity: row.quantity }));

    if (items.length === 0) {
      setErrorMessage('Enter a return quantity for at least one part.');
      return;
    }

    const payload = {
      return_no: formData.get('return_no'),
      purchase_id: parentId,
      return_date: formData.get('return_date'),
      note: formData.get('note'),
      items: items,
    };

    try {
      const res = await axios.post('/purchase_return/create.php', JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/purchase-returns';
      } else {
        setErrorMessage(res.data.message || 'Failed to create purchase return.');
      }
    } catch (error) {
      console.error('Purchase return create error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to create purchase return. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add Purchase Return</h3>

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
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="returnNo">Return No</label>
                    <input type="text" name="return_no" className="form-control" id="returnNo" placeholder="Enter return number" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="returnParent">Purchase (Invoice)</label>
                    <select value={parentId} onChange={handleParentChange} className="form-select" id="returnParent" required>
                      <option value="">Select purchase</option>
                      {parents.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {parent.invoice_no} - {parent.party_name} ({parent.doc_date})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="returnDate">Return Date</label>
                    <input type="date" name="return_date" className="form-control" id="returnDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="returnNote">Note / Reason</label>
                    <input type="text" name="note" className="form-control" id="returnNote" placeholder="Enter reason for the return" />
                  </div>

                  <ReturnItems rows={rows} setRows={setRows} />

                  <button type="submit" className="btn btn-primary mt-3">Add Purchase Return</button>
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

export default PurchaseReturnCreate;
