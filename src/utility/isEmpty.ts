export function IsEmpty(obj: Object) {
  let res = true;
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      res = false;
    }
  }
  return res;
}
