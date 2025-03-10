function formatPrice(price: number): string {
  return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function convertToDate(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export { formatPrice, convertToDate };
