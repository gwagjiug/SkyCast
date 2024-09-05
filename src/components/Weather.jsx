import React, { useEffect, useState } from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from 'lucide-react';
import forMattedDate from './forMattedDate';
import '../styles/Weather.css'; // CSS 파일 import

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(''); // 배경 이미지 상태 추가
  const apiKey = import.meta.env.VITE_WEATHER_KEY;
  const unsplashApiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setError('Unable to retrieve your location');
        }
      );
    };
    getLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;

      try {
        const { lat, lon } = location;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [location, apiKey]);

  // 배경 이미지를 가져오는 함수
  const fetchBackgroundImage = async (weatherMain) => {
    let query = '';

    switch (weatherMain) {
      case 'Clear':
        query = 'clear sky';
        break;
      case 'Clouds':
        query = 'cloudy sky';
        break;
      case 'Rain':
      case 'Drizzle':
        query = 'rain';
        break;
      case 'Thunderstorm':
        query = 'thunderstorm';
        break;
      case 'Snow':
        query = 'snow sky';
        break;
      case 'Mist':
      case 'Fog':
      case 'Haze':
        query = 'foggy day';
        break;
      default:
        query = 'weather';
    }

    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      query
    )}&client_id=${unsplashApiKey}&orientation=landscape`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Unsplash API responded with status ${response.status}`
        );
      }

      const data = await response.json();
      if (data && data.urls && data.urls.full) {
        setBackgroundImage(data.urls.full);
      } else {
        throw new Error('Unsplash API did not return the expected data.');
      }
    } catch (error) {
      console.error('Error fetching image from Unsplash:', error);
      setBackgroundImage('default-background-image-url.jpg'); // 대체 이미지 URL 설정
    }
  };

  // weatherMain이 변경될 때마다 배경 이미지 업데이트
  useEffect(() => {
    if (weatherData) {
      const weatherMain = weatherData.weather[0].main;
      fetchBackgroundImage(weatherMain);
    }
  }, [weatherData]);

  const getWeatherBackground = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return 'bg-clear cloud'; // cloud을 추가하여 Unsplash에서 "clear sky" 검색
      case 'Clouds':
        return 'bg-clouds';
      case 'Rain':
      case 'Drizzle':
        return 'bg-rainny day'; // rainny day로 검색
      case 'Thunderstorm':
        return 'bg-thunderstorm';
      case 'Snow':
        return 'bg-snow';
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return 'bg-fog';
      default:
        return 'bg-default';
    }
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return <Sun className="weather-icon sun" size={64} />;
      case 'Clouds':
        return <Cloud className="weather-icon cloud" size={64} />;
      case 'Rain':
      case 'Drizzle':
        return <CloudRain className="weather-icon rain" size={64} />;
      case 'Thunderstorm':
        return <CloudLightning className="weather-icon lightning" size={64} />;
      case 'Snow':
        return <CloudSnow className="weather-icon snow" size={64} />;
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return <CloudFog className="weather-icon fog" size={64} />;
      default:
        return <Sun className="weather-icon default" size={64} />;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const formattedDate = forMattedDate();
  const weatherMain = weatherData.weather[0].main;
  const backgroundClass = getWeatherBackground(weatherMain);
  const WeatherIcon = getWeatherIcon(weatherMain);

  return (
    <div
      className={`weather-background ${backgroundClass}`}
      style={{ backgroundImage: `url(${backgroundImage})` }} // 배경 이미지 적용
    >
      <div className="weather-card">
        <div className="weather-content">
          <div className="text-center">
            <h2 className="city-name">{weatherData.name}</h2>
            <p className="date">{formattedDate}</p>
          </div>
          {WeatherIcon}
          <div className="temperature">
            {weatherData.main.temp_max}°<span className="separator">/</span>
            {weatherData.main.temp_min}°
          </div>
          <p className="weather-description">{weatherMain}</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
