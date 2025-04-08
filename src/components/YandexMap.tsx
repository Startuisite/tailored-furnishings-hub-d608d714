
import React, { useEffect, useRef } from 'react';

const YandexMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Yandex Maps API
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=your-api-key&lang=ru_RU';
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (mapRef.current && window.ymaps) {
      window.ymaps.ready(() => {
        // Fixed TypeScript error by explicitly defining as tuple [number, number]
        const anapa: [number, number] = [44.898427, 37.317853];
        
        const map = new window.ymaps.Map(mapRef.current, {
          center: anapa,
          zoom: 16
        });

        // Add placemark with correct typing
        const placemark = new window.ymaps.Placemark(anapa, {
          balloonContent: 'НПМ Мебель, г. Анапа, ул. Гребенская, д. 92'
        }, {
          preset: 'islands#redDotIcon'
        });

        map.geoObjects.add(placemark);
      });
    }
  };

  return (
    <div ref={mapRef} className="w-full h-full min-h-[300px] rounded-lg" />
  );
};

export default YandexMap;
