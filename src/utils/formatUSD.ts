
const formatUSD = (value: number | string): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,})
  return formatter.format(typeof value == "string" ? parseInt(value) : value)
}

export default formatUSD