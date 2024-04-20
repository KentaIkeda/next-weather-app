'use client';

import React, { useState, useRef, FormEvent } from 'react';
import City from './components/City';
import { WeatherDataType } from './types/types';

export default function Home() {
  const [weather, setWeather] = useState<WeatherDataType>();
  const [error, setError] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  const api = process.env.NEXT_PUBLIC_WEATHER_API;
  async function fetchWeatherData(inputVal: string | undefined) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}&units=metric`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setWeather(json);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(ref.current?.value);
    await fetchWeatherData(ref.current?.value);
  }

  return (
    <>
      <main className='min-h-screen w-full bg-slate-300 py-32'>
        <section>
          <div>
            <h1 className='text-center font-bold text-xl mb-4'>
              Current Weather
            </h1>
            <form
              onSubmit={e => onSubmit(e)}
              className='flex flex-col gap-y-2 max-w-screen-sm mx-auto'
            >
              <input
                type='text'
                placeholder='Search City'
                ref={ref}
                className='w-1/2 mx-auto p-0.5 rounded-md shadow-md'
              />
              <button
                type='submit'
                className='w-1/2 mx-auto py-1 bg-orange-400 rounded-md shadow-md font-bold'
              >
                Display
              </button>
              <span className='msg text-center text-red-500'>
                {error && '失敗したやで'}
              </span>
            </form>
          </div>
        </section>
        <section>
          <div className='relative left-1/2 -translate-x-1/2 w-fit mt-16'>
            {weather && (
              <City
                country={weather?.sys.country!}
                name={weather?.name!}
                temp={weather?.main.temp}
                weather={weather?.weather!}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
