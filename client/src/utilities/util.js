export const currencyFormat = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(value);

export const minutesToHoursMinutes = (n) => {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  if(rhours===0){
    return rminutes + "min";
  }
  return rhours + "h " + rminutes + "min";
}