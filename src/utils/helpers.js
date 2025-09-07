// Format currency
export const formatPrice = (price) => `$${price.toLocaleString()}`;

// Truncate long text
export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};
