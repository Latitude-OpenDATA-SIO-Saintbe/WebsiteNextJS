declare namespace H {
  // Ajoutez ici les définitions minimales nécessaires
  namespace service {
    class Platform {
      constructor(options: { apikey: string });
      createDefaultLayers(): any;
    }
  }
  class Map {
    constructor(element: HTMLElement, defaultLayers: any, options: any);
    dispose(): void;
  }
  namespace mapevents {
    class MapEvents {
      constructor(map: H.Map);
    }
    class Behavior {
      constructor(mapEvents: MapEvents);
    }
  }
  namespace ui {
    class UI {
      static createDefault(map: H.Map, defaultLayers: any): UI;
    }
  }
}

