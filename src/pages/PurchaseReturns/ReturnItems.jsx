import React from 'react';

// Item rows of a purchase return. One row for every part that was on the purchase.
// The user only types the Return Qty. Quantity left to return comes from the server.
// Each row has: part_name, part_number, bought_qty, returned_qty, available_qty,
// unit_price, stock_quantity, quantity (typed), original (quantity saved before, Edit page only).
function ReturnItems({ rows, setRows }) {

  function updateQuantity(index, quantity) {
    setRows(rows.map((row, i) => (i === index ? { ...row, quantity } : row)));
  }

  const grandTotal = rows.reduce(
    (sum, row) => sum + (Number(row.quantity) || 0) * (Number(row.unit_price) || 0),
    0
  );

  if (rows.length === 0) {
    return (
      <div className="form-group">
        <label>Items</label>
        <p className="text-muted mb-0">Select a purchase to see its items.</p>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label>Items</label>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Part</th>
              <th>Purchased</th>
              <th>Already Returned</th>
              <th>Can Return</th>
              <th>Unit Price</th>
              <th>In Stock Now</th>
              <th>Return Qty</th>
              <th>After Return</th>
              <th>Line Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const quantity = Number(row.quantity) || 0;
              const original = Number(row.original) || 0;
              const stockAfter = Number(row.stock_quantity) + original - quantity;
              const lineTotal = quantity * (Number(row.unit_price) || 0);

              return (
                <tr key={row.part_id}>
                  <td>
                    {row.part_name}
                    {row.part_number ? ` (${row.part_number})` : ''}
                  </td>
                  <td>{row.bought_qty}</td>
                  <td>{row.returned_qty}</td>
                  <td>{row.available_qty}</td>
                  <td>{Number(row.unit_price).toFixed(2)}</td>
                  <td>{row.stock_quantity}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={Number(row.available_qty)}
                      step="1"
                      className="form-control"
                      value={row.quantity}
                      onChange={(e) => updateQuantity(index, e.target.value)}
                    />
                  </td>
                  <td>
                    {stockAfter}
                    {stockAfter < 0 && (
                      <div><small className="text-danger">Not enough stock</small></div>
                    )}
                  </td>
                  <td>{lineTotal.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="8" className="text-end">Grand Total</th>
              <th>{grandTotal.toFixed(2)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ReturnItems;
