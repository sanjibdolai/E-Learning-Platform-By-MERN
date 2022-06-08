import { getCartItems } from "./commonfunctions";

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

export const getTotalCourseDuration = (course) => {
  let totalDuration = 0;
  course.topics.forEach(topic => {
      topic.lessions.forEach(lession => {
          totalDuration += lession.lessionDuration;
      });
  });
  return minutesToHoursMinutes(totalDuration);
}
export const getTotalLessions = (course) => {
  let totalLesstions = 0;
  course.topics.forEach(element => {
      totalLesstions += element.lessions.length;
  });
  return totalLesstions;
}

export const getSubTotalPrice = (cartItems) => {
  let subTotalPrice = 0;
  cartItems.forEach(item => {
      if (item.course.courseType !== 'Free')
          subTotalPrice += item.course.coursePrice;
  });
  return subTotalPrice;
}

export const getCartCount = (cartItems) => {
  if(cartItems){
    let count =cartItems.length;
    document.getElementById("cartCount").innerHTML= (count!=0) ? count :'';
  }else{
    getCartItems((data)=>{
      let count =data.filter(e=> e.cartStatus==='Cart').length
      document.getElementById("cartCount").innerHTML= (count!=0) ? count :'';
    });
  }
}

export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};