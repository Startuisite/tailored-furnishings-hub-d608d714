
declare namespace ymaps {
  function ready(callback: () => void): void;

  class Map {
    constructor(element: HTMLElement, options: MapOptions);
    geoObjects: GeoObjectCollection;
  }

  interface MapOptions {
    center: [number, number];
    zoom: number;
    controls?: string[];
  }

  class Placemark {
    constructor(
      geometry: [number, number],
      properties: any,
      options: any
    );
  }

  class GeoObjectCollection {
    add(geoObject: any): this;
  }
}

interface Window {
  ymaps: typeof ymaps;
}
