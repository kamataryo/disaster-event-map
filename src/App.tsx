import React from "react";
import { StaticMap } from "react-map-gl";
// @ts-ignore
import DeckGL from "@deck.gl/react";
// @ts-ignore
import { PolygonLayer } from "deck.gl";
// @ts-ignore
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

// Viewport settings
const viewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 2,
  pitch: 0,
  bearing: 0
};

const App: React.FC = () => {
  const [style, setStyle] = React.useState<false | mapboxgl.Style>(false);
  const [layer, setLayer] = React.useState<false | any>(false);
  const [event, setEvent] = React.useState<"fire" | "flood">("fire");

  React.useEffect(() => {
    fetch(
      "https://api.geolonia.com/dev/styles/geolonia-basic-3d?key=YOUR-API-KEY"
    )
      .then(res => res.json())
      .then(setStyle);
  }, []);

  // createLayer on Mount
  React.useEffect(() => {
    const layer = new HeatmapLayer({
      id: "heatmapLayer",
      data: []
    });

    setLayer(layer);
  }, []);

  // updateLayer on fetch
  React.useEffect(() => {
    console.log(event);
    layer.updateState({
      data: [{ COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 10 }]
    });
  }, [event]);

  console.log(layer, style);
  return (
    <div className="App">
      {layer && (
        <DeckGL viewState={viewState} layers={[layer]}>
          {style && (
            <StaticMap width={"100%"} height={500} mapStyle={style}></StaticMap>
          )}
        </DeckGL>
      )}
    </div>
  );
};

export default App;
