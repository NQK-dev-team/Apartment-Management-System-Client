import { COMMON } from '~/consts/common';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function convertToDate(date: string): string {
  if (!date) {
    return '';
  }

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function convertToMonthYear(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  return `${year}-${month}`;
}

function convertToDateTime(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function convertToDateTime2(date: string, locale: string): string {
  // Similar to convertToDateTime but month will be displayed as word
  const d = new Date(date);
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return `${d.toLocaleDateString(locale === COMMON.LOCALE.VI ? COMMON.LOCALE.VI_FULL : COMMON.LOCALE.EN_FULL, options)} ${hour}:${minute}:${second}`;
}

export { formatPrice, convertToDate, convertToDateTime, convertToMonthYear, convertToDateTime2 };
