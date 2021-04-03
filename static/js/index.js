$("#formSearch").submit(function (event) {
  event.preventDefault();
  console.log("ajax is called");
  const cityName = $("#searchText").val();
  // console.log(cityName);
  $.ajax({
    type: "POST",
    data: JSON.stringify({ city: cityName }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: `/weather_city`,
    success: function (response) {
      // console.log(typeof response.cod);
      // console.log(response);
      if (response.cod === 200) {
        $("#box1").css("display", "flex");
        const locate = document.getElementById("locate");
        const tempr = document.getElementById("temp");
        const tempMinMax = document.getElementById("minMax");

        locate.innerHTML = `${response.name}, ${response.sys.country}`;
        tempr.innerHTML = `${response.main.temp}&#x2103`;
        tempMinMax.innerHTML = `Min ${response.main.temp_min}&#x2103 | Max ${response.main.temp_max}&#x2103`;

        //date and time
        const dates = document.getElementById("date");

        let d = new Date();
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = response.timezone / 3600;
        let dat = utc + 3600000 * offset;
        const nd = new Date(dat);

        let weekday = new Array(7);
        weekday[0] = "SUN";
        weekday[1] = "MON";
        weekday[2] = "TUE";
        weekday[3] = "WED";
        weekday[4] = "THURS";
        weekday[5] = "FRI";
        weekday[6] = "SAT";

        let month = new Array(12);
        month[0] = "JAN";
        month[1] = "FEB";
        month[2] = "MAR";
        month[3] = "APR";
        month[4] = "MAY";
        month[5] = "JUN";
        month[6] = "JUL";
        month[7] = "AUG";
        month[8] = "SEP";
        month[9] = "OCT";
        month[10] = "NOV";
        month[11] = "DEC";

        let day = weekday[nd.getDay()];
        let mont = month[nd.getMonth()];
        let date = nd.getDate();
        let hours = nd.getHours();
        let hour = hours;
        let mins = nd.getMinutes();

        let period = "AM";
        if (hours > 11) {
          period = "PM";
          if (hours > 12) hours -= 12;
        }

        if (mins < 10) {
          mins = "0" + mins;
        }

        dates.innerHTML = `${day} | ${mont} ${date} | ${hours}:${mins} ${period}`;

        //SUNRISE
        let dRise = new Date(response.sys.sunrise*1000);
        let localTimeR = dRise.getTime();
        let localOffsetR = dRise.getTimezoneOffset() * 60000;
        let utcR = localTimeR + localOffsetR;
        let offsetR = response.timezone / 3600;
        let datR = utcR + 3600000 * offsetR;
        const nR = new Date(datR);
        let Rhours = nR.getHours();


        //SUNSET
        let dSet = new Date(response.sys.sunset*1000);
        let localTimeS = dSet.getTime();
        let localOffsetS = dSet.getTimezoneOffset() * 60000;
        let utcS = localTimeS + localOffsetS;      
        let offsetS = response.timezone / 3600;       
        let datS = utcS + 3600000 * offsetS;
        const nS = new Date(datS);
        let Shours = nS.getHours();
        

        if (Rhours <= hour && Shours > hour) {

          // document.getElementById("box1").style.backgroundColor = "#cad5e5";
          $("div#box1").css("background-color", "#cad5e5");

        } else {

          // document.getElementById("box1").style.backgroundColor =
          // "rgb(0 0 0 / 24%)";
          $("div#box1").css("background-color", "#c1c1c1");
        }


        let tempStat = response.weather[0].main;
        console.log( tempStat);
        const weathercon = document.getElementById('weathercon');
        if(tempStat == "Thunderstorm")
        {
          weathercon.innerHTML=`<i id="thunder" class="wi wi-thunderstorm"></i>`;
          document.getElementById("thunder").style.color = "#252d89c4";
          
        }
        else if(tempStat == "Drizzle")
        {
          weathercon.innerHTML=`<i id="drizzle" class="fas fa-cloud-rain"></i>`
          document.getElementById("drizzle").style.color = "#4b38386b";
        }
        else if(tempStat == "Rain")
        {
          weathercon.innerHTML=`<i id="rainy" class="fas fa-cloud-showers-heavy"></i>`
          document.getElementById("rainy").style.color = "#4b38386b";
        }
        else if(tempStat == "Snow")
        {
          weathercon.innerHTML=`<i id="snow" class="far fa-snowflake"></i>`;
          document.getElementById("snow").style.color = "#f8f8f8bf";
        }
        else if(tempStat == "Clear")
        {
          if(hour >= Rhours && hour<Shours){

            weathercon.innerHTML=`<i id="sun" class="fas fa-sun"></i>`;
            document.getElementById("sun").style.color = "#eccc68";
          }
          else{

            weathercon.innerHTML=`<i id="moon" class="fas fa-moon"></i>`
            document.getElementById("moon").style.color = "#f8f8f8bf";
          }
        }
        else if(tempStat == "Clouds")
        {
          weathercon.innerHTML=`<i id="cloud" class="fas fa-cloud"></i>`;
          document.getElementById("cloud").style.color = "#f8f8f8bf";
        }
        else{
          weathercon.innerHTML=``

        }
      }
    },
    error: function (errorMessage) {
      // console.log(errorMessage);
      $("#searchText").val("City not found");
      alert('City not found');
    },
  });
});
