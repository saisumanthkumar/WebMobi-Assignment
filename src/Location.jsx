import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Location() {
  const {location} = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [data, setdata] = useState(null)
  const options = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {
      location: location,
      format: 'json',
      u: 'c'
    },
    headers: {
      'X-RapidAPI-Key': '3d46166371msh3d9036deec07301p18f4dbjsn2fe209b6a562',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setdata(response.data)
      setisLoading(false)
    } catch (error) {
      console.error(error);
      setisError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])
  

  if(isError){
    return (
      <>
      <div className="error">
        <h1 >No city found!</h1>
        <a href="/">Go Back to Home</a>
      </div>
      </>
    )
  }
  if(isLoading){
    return (
      <h1 className='loading'>Loading...</h1>
    )
  }

  return (
    <>
      <a href="/" className='back'>Go Back to Home</a>
      <div className="container">
        <div className="container2">
          <p className="temperature">{data.current_observation.condition.temperature}</p>
          <p className='text'>,{data.current_observation.condition.text}</p>
          <p className="place">{data.location.city}, {data.location.country}</p>
          <div className="location"><span>Location</span> : {data.location.lat}° N, {data.location.long}° E</div>
        </div>
        <div className="forecast">
          <h1>Forecast</h1>
          <table border={1} width={"100%"}>
            <tr className='heading'>
              <td rowSpan={2} width={"30%"}>Day</td>
              <td rowSpan={1} colSpan={2} width={"40%"}>Temperature</td>
              <td rowSpan={2} width={"30%"}>Cloud type</td>
            </tr>
            <tr className='heading'>
              <td rowSpan={1} width={"20%"}>Low</td>
              <td rowSpan={1} width={"20%"}>High</td>
            </tr>
            {
              data.forecasts.map((item) => {
                return (
                  <tr key={item.date}>
                    <td>{item.day}</td>
                    <td>{item.low}</td>
                    <td>{item.high}</td>
                    <td>{item.text}</td>
                  </tr>
                );
              })
            }
          </table>
        </div>
      </div>
    </>
  )
}

export default Location