function formatPrice(price: number): string {
  return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export { formatPrice };