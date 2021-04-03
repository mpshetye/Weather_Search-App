// // const curDate = document.getElementById("date");
// // let weathercon = document.getElementById("weathercon");

// const tempStatus = "Clouds";

// const getCurrentDay = () => {
//   let weekday = new Array(7);
//   weekday[0] = "SUN";
//   weekday[1] = "MON";
//   weekday[2] = "TUE";
//   weekday[3] = "WED";
//   weekday[4] = "THURS";
//   weekday[5] = "FRI";
//   weekday[6] = "SAT";

//   let month = new Array(12);
//   month[0] = "JAN";
//   month[1] = "FEB";
//   month[2] = "MAR";
//   month[3] = "APR";
//   month[4] = "MAY";
//   month[5] = "JUN";
//   month[6] = "JUL";
//   month[7] = "AUG";
//   month[8] = "SEP";
//   month[9] = "OCT";
//   month[10] = "NOV";
//   month[11] = "DEC";

//   let currentTime = new Date();
//   let day = weekday[currentTime.getDay()];
//   let mont = month[currentTime.getMonth()];
//   let date = currentTime.getDate();
//   let hours = currentTime.getHours();
//   let mins = currentTime.getMinutes();

//   let period ='AM';
//   if(hours>11){
//       period ='PM';
//       if(hours>12) hours -=12;
//   }

//   if(mins<10){
//       mins = "0"+ mins;
//   }

//   return `${day} | ${mont} ${date} | ${hours}:${mins} ${period}`
// };

// curDate.innerHTML= getCurrentDay();
