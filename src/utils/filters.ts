export function count(val: number) {
  if (val > 1e8) {
    return (val / 1e8).toFixed(1) + '亿'
  } else if (val > 1e3) {
    return (val / 1e4).toFixed(1) + '万'
  } else {
    return val
  }
}
