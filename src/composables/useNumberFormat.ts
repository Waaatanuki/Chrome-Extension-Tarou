export const useNumberFormat = (num: number = 0) => {
  const formatter = new Intl.NumberFormat('en-US')
  return formatter.format(num)
}
