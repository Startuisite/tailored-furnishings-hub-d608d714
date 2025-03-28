
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
        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.76, 37.64], // Moscow coordinates
          zoom: 15
        });

        // Add placemark
        const placemark = new window.ymaps.Placemark([55.76, 37.64], {
          balloonContent: 'НПМ Мебель'
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
