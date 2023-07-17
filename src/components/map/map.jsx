import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import './map.css';
import L from 'leaflet';
import location from "../../assets/location-dot-solid.svg";

var Icon = L.icon({
    iconUrl: location,
    iconSize: [25, 41],
    iconAnchor: [0, 0]
});

function Map(props) {
    const { location } = props.data;
    const mapRef = useRef(null);

    useEffect(() => {
        const mapContainer = L.DomUtil.get('map');
        const { lat, lng } = location;
        if (!mapRef.current) {
            const map = L.map(mapContainer, {
                center: [lat, lng],
                zoom: 15,
                draggable: true,
                trackResize: true,
            });
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
            L.marker([lat, lng], { icon: Icon }).addTo(map);
            mapRef.current = map;
        } else {       
            mapRef.current.setView([lat, lng], 15);
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    layer.setLatLng([lat, lng]);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return <div id='map' className='w-100'></div>;
}

export default Map;

