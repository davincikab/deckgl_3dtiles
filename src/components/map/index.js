/// app.js
import React, { useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import { Map } from 'react-map-gl';

import data from '../../assets/2d_data_dataset1/lod12_3d.json';


import {CesiumIonLoader} from '@loaders.gl/3d-tiles';
import {Tile3DLayer} from '@deck.gl/geo-layers';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 4.495761, 
    latitude:  51.96360,
    zoom: 15,
    pitch: 60,
    bearing: 0
};

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGF1ZGk5NyIsImEiOiJjanJtY3B1bjYwZ3F2NGFvOXZ1a29iMmp6In0.9ZdvuGInodgDk7cv-KlujA';


const MapComponent = (props) => {    

    let geoLayer = new GeoJsonLayer({
        id: 'geojson',
        data,
        opacity: 0,
        stroked: false,
        filled: true,
        extruded: false,
        wireframe: true,
        // getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
        getFillColor: [255, 0, 255],
        getLineColor: [255, 255, 255],
        pickable: true
    });

    useEffect(() => {
        
    })

    let tiles = [props.layer].map(layer => {
        return new Tile3DLayer({
            id: `tile-3d-layer-${layer.id}`,
            data: `https://assets.ion.cesium.com/${props.layer.id}/tileset.json?v=2`,
            opacity:layer.id === props.layer.id ? 1 : 0,
            loader: CesiumIonLoader,
            loadOptions: {
              'cesium-ion': {accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMTkwNDhmZS02NTU5LTQyMWEtYWM4OS0yMzc4YWYzZjNiYzMiLCJpZCI6Mjk4MjIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTI3NjY0MjV9.7rd4qA5VUQk4gdyoWU6fnF6gJxLcOj8iLJKQ_VVENNk'}
            },
            onTilesetLoad: (tileset) => {
              // Recenter to cover the tileset
                const {cartographicCenter, zoom} = tileset;
                console.log(tileset);
            },
        });
    });


    const layers = [
        ...tiles,
        geoLayer,
    ];

    let centers = { 
        'dataset1':{ latitude:51.9632025359, longitude:4.4949385378 },
        'dataset2':{ latitude:53.20919, longitude:6.54877 }, 
    }
    
    console.log(props.layers);
    return (
        <DeckGL
            initialViewState={{...INITIAL_VIEW_STATE, ...centers[props.dataset]}}
            controller={true}
            layers={layers} 
        >
            <Map 
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN} 
                mapStyle="mapbox://styles/mapbox/dark-v9"
            />
        </DeckGL>
    )
    
}


export default MapComponent;