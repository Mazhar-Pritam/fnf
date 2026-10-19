export function getStockStatus(stock, minimumStock) {
  const currentStock = Number(stock) || 0;
  const threshold = Number(minimumStock) || 0;

  if (currentStock <= 0) {
    return { label: 'Out Of Stock', className: 'badge-danger' };
  }
  if (currentStock <= threshold) {
    return { label: 'Low Stock', className: 'badge-warning' };
  }
  return { label: 'In Stock', className: 'badge-success' };
}