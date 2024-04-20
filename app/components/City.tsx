import React from 'react';
import { WeatherType } from '../types/types';

const City = ({
  name,
  weather,
  country,
  temp,
}: {
  name: string;
  weather: WeatherType;
  country: string;
  temp: any;
}) => {
  const icon = `https://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`;

  return (
    <div className='bg-white aspect-[9/13] w-60 h-auto p-7 shadow-2xl rounded-md flex flex-col justify-center gap-y-4'>
      <h2
        data-name={`${name},${country}`}
        className='text-center'
      >
        <span className='font-semibold text-xl'>{name}</span>
        <sup className='bg-orange-500 text-orange-50 px-1 py-0.5 rounded-full'>
          {country}
        </sup>
      </h2>
      <div className='flex items-end gap-x-1 justify-center mt-3'>
        <span className='text-6xl'>{Math.round(temp)}</span>
        <span className='text-2xl'>°C</span>
      </div>
      <figure>
        <img
          className='relative left-1/2 -translate-x-1/2 drop-shadow-lg'
          src={icon}
          alt={weather[0]['main']}
        />
      </figure>
    </div>
  );
};

export default City;
