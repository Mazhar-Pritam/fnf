import React from 'react';

// Item rows of a purchase: Category -> Part -> Quantity -> Unit Price.
// Used by both Create.jsx and Edit.jsx.
// originalItems = the items already saved on this purchase (Edit page only).
// Their quantity is already counted inside the part's stock, so we subtract it
// before showing what the stock will be after this purchase.
function PurchaseItems({ items, setItems, categories, parts, originalItems = [] }) {

  function updateItem(index, changes) {
    setItems(items.map((item, i) => (i === index ? { ...item, ...changes } : item)));
  }

  function handleCategoryChange(index, category_id) {
    updateItem(index, { category_id, part_id: '', unit_price: '' });
  }

  function handlePartChange(index, part_id) {
    const part = parts.find((p) => p.id == part_id);
    const price = part && parseFloat(part.purchase_price) > 0 ? part.purchase_price : '';
    updateItem(index, { part_id, unit_price: price });
  }

  function addItem() {
    setItems([...items, { category_id: '', part_id: '', quantity: 1, unit_price: '' }]);
  }

  function removeItem(index) {
    setItems(items.filter((item, i) => i !== index));
  }

  const grandTotal = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0),
    0
  );

  return (
    <div className="form-group">
      <label>Items</label>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Part</th>
              <th>In Stock Now</th>
              <th>Quantity</th>
              <th>After Purchase</th>
              <th>Unit Price</th>
              <th>Line Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const categoryParts = parts.filter((p) => p.category_id == item.category_id);
              const selectedPart = parts.find((p) => p.id == item.part_id);
              const lineTotal = (Number(item.quantity) || 0) * (Number(item.unit_price) || 0);

              const oldQuantity = originalItems
                .filter((o) => o.part_id == item.part_id)
                .reduce((sum, o) => sum + (Number(o.quantity) || 0), 0);
              const stockAfter = selectedPart
                ? Number(selectedPart.stock_quantity) - oldQuantity + (Number(item.quantity) || 0)
                : null;

              return (
                <tr key={index}>
                  <td>
                    <select
                      className="form-select"
                      value={item.category_id || ''}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={item.part_id || ''}
                      onChange={(e) => handlePartChange(index, e.target.value)}
                      disabled={!item.category_id}
                    >
                      <option value="">Select part</option>
                      {categoryParts.map((part) => (
                        <option key={part.id} value={part.id}>
                          {part.name}{part.part_number ? ` (${part.part_number})` : ''}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{selectedPart ? selectedPart.stock_quantity : '-'}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, { quantity: e.target.value })}
                    />
                  </td>
                  <td>{stockAfter === null ? '-' : stockAfter}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      value={item.unit_price}
                      onChange={(e) => updateItem(index, { unit_price: e.target.value })}
                    />
                  </td>
                  <td>{lineTotal.toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link btn-danger"
                      title="Remove"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="6" className="text-end">Grand Total</th>
              <th>{grandTotal.toFixed(2)}</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}>
        <i className="fa fa-plus"></i>
        &nbsp; Add Item
      </button>
    </div>
  );
}

export default PurchaseItems;
