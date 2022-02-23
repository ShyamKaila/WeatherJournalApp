/* Global Variables */
const key = '&appid=52b0cfed874e16b288f1420259fb89bc';
const url = 'api.openweathermap.org/data/2.5/weather?zip=';
const feel = document.getElementById('feelings');
const code = document.getElementById('zip');
const temp = document.getElementById('temp');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Adding Eventlistner
const generateWeather = document.getElementById('generate');
generateWeather.addEventListener('click',action);

//CallBack Function
function action(evt){
    evt.preventDefault();
    weatherDetails(url, code, key)
    .then(function(da){
        dataPost('/add',{temp: da.temp, date: da.newDate, feelings: feel.value})
    })
    .then(() => updateInterface()
    ).catch(err => {console.log(err);
                    //alert('This zip is Invalid, Enter US zip only');
    });
};

//WeatherDetails function
const weatherDetails = async (url, code, key) =>{
    const result = await fetch(`${url}?zip=${code}${key}us&units=metric`)
    try{
        const a = await result.json();
        return a;
    }catch(err){
        console.log("Error fetching the requested url: ",err);
    }
}

const dataPost = async (path = '/add', data ={}) =>{
    const res = await fetch(path, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try{
        const b = await res.json();
        return b;
    }catch(error){
        console.log("Cannot Post the data: ",error);
    }
};

const updateInterface = async () =>{
    const r = await fetch('/all');
    try{
        const all = await r.json();
        document.getElementById('date').innerHTML = "DATE: "+all.date;
        temp.innerHTML = "TEMPERATURE: "+all.temp;
        document.getElementById('content').innerHTML = "CONTENT: "+all.feel;
    }catch(error){
        console.log("Error in updating the interface: ",error);
    }
};