import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import "./CardLocation.css";

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon fontSize="25px" icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const CardLocation = ({ location }) => {
  console.log(location);

  // update the location pin coordinates
  return (
    <div className="card-location-container">
      <div className="card-location-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
          defaultCenter={location}
          defaultZoom={18}
        >
          <LocationPin lat={location?.lat} lng={location?.lng} text={""} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default CardLocation;
