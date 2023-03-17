import { useState } from "react";

export default function DisplayTemp() {

    const [data,setdata] = useState({
        temp: '',
        feels_like : '',
        wind: '-',
        humidity :'-',
        name:'',
        desc : ''
    });
    const [location,setlocation] = useState(null);

    const handleCity =(event) =>{
        setlocation(event.target.value);
    }

    const handlesubmission = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=1bbb069bce4f806683a4f2a09f3a5fb4`;
        const response = await fetch(url);
        const result = await response.json();
        setdata({
            temp: result.main.temp,
        feels_like : result.main.feels_like,
        wind: result.wind.speed,
        humidity:result.main.humidity,
        name:result.name,
        desc : result.weather[0].main
        });
        console.log(result);
    }


    return (  <div className="container pt-3" > 
            <div className="col-sm-4 m offset-md-4 mt-5 text-center">               
            <input class="form-control bg-body-secondary p-3" type="text" onChange={handleCity} placeholder="Search City" aria-label="default input example"/>
            <button type="button" class="btn btn-dark mt-3 px-4 py-2" onClick={handlesubmission}>Search</button>
            <div className="container-md mt-4 p-4 bg-dark rounded">
            <h1 className="text-white fw-bold ">{data.name}</h1>
            <h2 className="text-white ">{Math.round(data.temp)} °C</h2>
            <p className="text-white fw-semibold">{data.desc}</p>
            <div class="row align-items-center gap-3 pt-4">
                                <div class="col text-white fw-bold">
                                Feels like
                                <br></br>
                                <p className="fw-light">{Math.round(data.feels_like)} °C </p>
                                </div>
                                <div class="col text-white fw-bold">
                                Humidity
                                <br></br>
                                <p className="fw-light">{data.humidity} % </p>
                                </div>
                                <div class="col text-white fw-bold">
                                Wind
                                <br></br>
                                <p className="fw-light">{data.wind} m/s</p>
                                </div>
                            </div>
                        </div>
                     </div>
        </div>
  )
}
