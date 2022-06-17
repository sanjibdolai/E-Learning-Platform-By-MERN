import { getCartItems } from "./commonfunctions";

export const currencyFormat = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(value);

export const getNumberFormat=value=>new Intl.NumberFormat('en-US', {style: 'decimal'}).format(value);

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

export const getTotalCourseDurationV2 = (course) => {
  let totalDuration = 0;
  course.topics.forEach(topic => {
      topic.lessions.forEach(lession => {
          totalDuration += lession.lessionDuration;
      });
  });
  return totalDuration;
}

export const getCourseProgressPercentage = (course) => {
  var totalDuration=getTotalCourseDurationV2(course.courseId);
  console.log(totalDuration);
  var completedDuration=0;
  var lessions;
  for(var key in course.courseProgress){
    lessions=course.courseId.topics.find(e=>e._id===key).lessions;
    for(var i in course.courseProgress[key]){
      completedDuration += lessions.find(e=>e._id===i).lessionDuration;
    }
  }
  var percentage=0;
  if(totalDuration !=0){
    percentage=Math.round((completedDuration/totalDuration)*100);
  }
  return percentage;
}

export const getAverageRating = (reviews) => {
  var totalRating=0;
  reviews.forEach((e)=>{
    totalRating+=e.rating;
  })
  var averageRating=totalRating/reviews.length;
  
  return Math.round((averageRating + Number.EPSILON) * 10) / 10;
}

export const getRatingWiseRatesCount = (reviews) => {
  return {
    "total":reviews.length,
    5:reviews.filter(e=>e.rating===5).length,
    4:reviews.filter(e=>e.rating===4).length,
    3:reviews.filter(e=>e.rating===3).length,
    2:reviews.filter(e=>e.rating===2).length,
    1:reviews.filter(e=>e.rating===1).length
  };
}
export const getRatingWiseRatesPercentage = (reviews) => {
  var ratingWiseRatesCount=getRatingWiseRatesCount(reviews);
  return {
    5:Math.round((ratingWiseRatesCount[5]/ratingWiseRatesCount["total"])*100),
    4:Math.round((ratingWiseRatesCount[4]/ratingWiseRatesCount["total"])*100),
    3:Math.round((ratingWiseRatesCount[3]/ratingWiseRatesCount["total"])*100),
    2:Math.round((ratingWiseRatesCount[2]/ratingWiseRatesCount["total"])*100),
    1:Math.round((ratingWiseRatesCount[1]/ratingWiseRatesCount["total"])*100)
  };
}