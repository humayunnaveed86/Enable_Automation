export function toDataTestSlug(productName: string): string {
  return productName.trim().toLowerCase().replace(/\s+/g, '-');
}
