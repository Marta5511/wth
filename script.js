
jQuery(document).ready(function($){

$(document).ready(function(){
$.get("http://ip-api.com/json/", function(geo, status){
let city = geo.city;
//alert(city)
$('#txt1').val(city)
if (city!=null)
{
	 getInfo(city)
}

  $("button").click(function(){
	event.preventDefault()
	
	getInfo($('#txt1').val())
  });
  });
  return false;
});

function getInfo(city)
{
	$.get("http://api.openweathermap.org/data/2.5/find?q="+city+"&type=like&appid=051778c90f1f137c6d0b1e8a9462b105", function(data, status){
	
	//alert(JSON.stringify(data.message.like))
	let city_id = data.list[0].id
	let city_name = data.list[0].name
	$.get("https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&units=metric&lang=RU&appid=051778c90f1f137c6d0b1e8a9462b105", function(data, status){
	
	
     
	   $("#now").text(data.main.temp<=0 ? Math.round(data.main.temp) : "+"+Math.round(data.main.temp));
	   $("#min").text("Мин: "+(data.main.temp_min<=0  ? Math.round(data.main.temp_min) : "+"+Math.round(data.main.temp_min)));
	   $("#max").text("Макс: "+(data.main.temp_max<=0 ? Math.round(data.main.temp_max) : "+"+Math.round(data.main.temp_max)));
	   $("#humidity").text("Влажность: "+data.main.humidity+"%");
	   $("#conditions").text(data.weather[0].description);
	   $("#im").attr("src", "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
		
	   $.get("https://api.openweathermap.org/data/2.5/forecast?id="+city_id+"&units=metric&lang=RU&appid=051778c90f1f137c6d0b1e8a9462b105", function(data, status){
			
			//alert(forecast)
			//let dataToJson = JSON.parse(data); // парсим в объект

			//console.log(dataToJson.firstweek); // первый массив firstweek
			let forecast = data.list
			let i=1
			let temp_day_obj = []
			let temp_night_obj = []
			let dates = []
			for (let key in forecast ) {
				
			  //console.log(new Date(data.list[0].dt).getDate()); // выводит ключи в объекте
				console.log("data[key] - "+forecast[key])
				console.log("key = "+key)
				console.log(i)
				
				
				
				
				let date = new Date(forecast[key].dt*1000)
				let isoDate = ("0"+date.getDate()).slice(-2)+"."+("0"+(date.getMonth()+1)).slice(-2); // 2014-08-05T19:42:51.429Z
				let week_day = getWeekDay(date)
				
				
				
				if (date.getHours()==15)
				{
					let temp_day = forecast[key].main.temp<=0 ? Math.round(forecast[key].main.temp) : "+"+Math.round(forecast[key].main.temp)
					let humid = forecast[key].main.humidity
					let desc = forecast[key].weather[0].description
					let icon = forecast[key].weather[0].icon
					temp_day_obj.push([temp_day,humid,desc,icon,isoDate,week_day])
					
					i=i+1
				}
				if (date.getHours()==03)
				{
					let temp_night = forecast[key].main.temp<=0 ? Math.round(forecast[key].main.temp) : "+"+Math.round(forecast[key].main.temp)
					temp_night_obj.push([temp_night])
					i=i+1
					
					/*$(`#f_${i}_temp_night`).text("Ночь: "+temp_night)
					$(`#f_${i}_temp_day`).text("День: "+temp_day)
					$(`#f_${i}_humidity`).text("Влажность: "+"%")
					$(`#f_${i}_desc`).text(desc)
					$(`#f_${i}_icon`).attr("src", "http://openweathermap.org/img/wn/"+forecast[key].weather[0].icon+"@2x.png");	*/
				}
				
				
				
				//console.log($(`.building[data-id="${id}"]`).text());
			//"temp_min":6.49,"temp_max"
			//"weather":[{"id":803,"main":"Clouds","description"
			}
			temp_night_obj.forEach(function(e,index)
			{
				$(`#f_${index+1}_temp_night`).text("Ночь: "+e)
				$(`#f_${index+1}_temp_day`).text("День: "+temp_day_obj[index][0])
				$(`#f_${index+1}_humidity`).text("Влажность: "+temp_day_obj[index][1]+"%")
				$(`#f_${index+1}_desc`).text(temp_day_obj[index][2])
				$(`#f_${index+1}_icon`).attr("src", "http://openweathermap.org/img/wn/"+temp_day_obj[index][3]+"@2x.png");			
				$(`#f_${index+1}`).text(temp_day_obj[index][4]+" "+temp_day_obj[index][5]+": ")
			
			
			})

	   console.log("temp_night_obj = "+temp_night_obj)
	     console.log("temp_day_obj = "+temp_day_obj)
	   })
	   
    });
	
  })
}
function getWeekDay(date)
{
	let day = date.getDay()
	switch (day)
	{	
		case 1:
		return "Пн";
		break;
		case 2:
		return "Вт";
		break;
		case 3:
		return "Ср";
		break;
		case 4:
		return "Чт";
		break;
		case 5:
		return "Пт";
		break;
		case 6:
		return "Сб";
		break;
		case 0:
		return "Вс";
		break;
	}
}
});
