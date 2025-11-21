import { useState } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import Icon from './components/Icon';
import '../src/App.css'

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const searchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ru`);
      const geoData = await geo.json();

      if (!geoData.results?.length) {
        alert('Город не найден');
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
      );
      const data = await res.json();

      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;

      const conditions = {
        0: 'Ясно',
        1: 'Ясно', 
        2: 'Переменная облачность',
        3: 'Пасмурно',
        45: 'Туман',
        48: 'Туман', 
        51: 'Морось',
        53: 'Морось', 
        55: 'Морось',
        61: 'Дождь',
        63: 'Дождь', 
        65: 'Ливень',
        71: 'Снег', 
        73: 'Снег', 
        75: 'Сильный снег',
        95: 'Гроза',
        96: 'Гроза с градом',
        99: 'Гроза с градом'
      };

      setWeather({
        name,
        temp,
        condition: conditions[code] || 'Неизвестно',
        code  
      });
    } catch {
      alert('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form'>
      <h1 className='h1'>Погода</h1>
      <div  className='VVod'>
        <Input value={city} onChange={(e) => setCity(e.target.value)} onEnter={searchWeather} />
        <Button onClick={searchWeather} loading={loading} />
      </div>

      {weather && (
        <div className='vuvodDiv'>
          <h2 >{weather.name}</h2>
          
          
          <Icon code={weather.code} size={140} />

          <div className='temp'>
            {weather.temp}°С
          </div>
          <p className='condition'>{weather.condition}</p>
        </div>
      )}
    </div>
  );
}