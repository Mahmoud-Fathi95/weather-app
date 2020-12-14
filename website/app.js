/* Global Variables */

//use express method inside app

// Create a new date instance dynamically with JS
let d = new Date();
//add 1 to month because month display from 0 to 11
let newDate = d.getMonth()+1 +'/'+ d.getDate()+'/'+ d.getFullYear();

const baseurl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '2985194b12cd20173bf7515baf87141c';
//event listener
document.getElementById('generate').addEventListener('click', action);
function action(e){
  const zipc = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;
  getWeather(baseurl, zipc, apikey)

   .then(function (data) {
     console.log(data);
     postData('/add',{date:d, temp:data.list[0].main.temp, content:feelings})
     updateUI();
   })
};
const getWeather = async(baseurl,zip, key)=>{
  const res = await fetch(baseurl+zip+key)
 try {
   const data = await res.json();
   return data;
 } catch (error) {
   console.log(error);
 }
};
//send post request to the local server
const postData = async (url='', data={})=>{
  console.log(data);
  const responce = await fetch(url, {
    method:'post',
    credentials:'same-origin',
    headers:{'content-type':'application/json'},
    body:JSON.stringify(data)
  });
   try {
     const newData = await responce.json();
     console.log(newData);
     return newData;
   } catch (error) {
     console.log('error',error);
   };
};

const updateUI= async ()=>{
  const request= await fetch ('/all');
  try {
    const allData = await request.json();
    document.querySelector('#date').innerHTML= `Date: ${allData[0].date}`;
    document.querySelector('#temp').innerHTML= `Temperature: ${allData[0].temp}`;
    document.querySelector('#content').innerHTML= `my feeling: ${allData[0].content}`;

  } catch (error) {
    console.log(error);
  }
};
