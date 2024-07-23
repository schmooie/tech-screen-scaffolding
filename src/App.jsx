import './App.css'
import { useState, useEffect } from 'react';

const LIGHTS = {
  GREEN: { duration: 3000, next: 'YELLOW', color: 'green' },
  YELLOW: { duration: 1000, next: 'RED', color: 'yellow' },
  RED: { duration: 4000, next: 'GREEN', color: 'red' },
};

export default function TrafficLight() {
  const colorLights = Object.keys(LIGHTS);
  const [currentLight, setCurrentLight] = useState(colorLights[0]);

  useEffect(() => {
    const { duration, next } = LIGHTS[currentLight];
    const timeoutId = setTimeout(() => {
      setCurrentLight(next);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [currentLight])

  return (
    <section>
      {colorLights.map(color => LIGHTS[color]).map(({ color, next }) => (
        <div key={color} className={`${next === LIGHTS[currentLight].next ? 'light--active' : ''} light`} style={{ backgroundColor: color }}></div>
      ))}
    </section>
  )
}
