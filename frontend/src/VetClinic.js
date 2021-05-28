import { useEffect, useState } from "react";
import StyledRating from "@material-ui/lab/Rating";
import PetsIcon from "@material-ui/icons/Pets";
import VetCard from "./components/VetCard";

const fetch = require("node-fetch");

function VetClinicProfile({ id }) {
  const [info, setInfo] = useState({});
  const [vets, setVets] = useState([]);

  useEffect(() => {
    let url = `http://localhost:2300/getprofiles?id=${id}`;

    let options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    };

    console.log(id)

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setVets(json)
        console.log(!!!!!!+id)
        console.log(vets)
      })
      .catch((err) => console.error("error:" + err));
  }, [id, vets]);

  return (
    <div>
      <h3>Phone: {info.international_phone_number}</h3>
      <h3>Opening Hours: {info.weekday_text}</h3>
      <StyledRating
        name="customized-color"
        defaultValue={4}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<PetsIcon fontSize="inherit" />}
        readOnly
      />
      <VetCard vets={vets}/>
    </div>
  );
}

export default VetClinicProfile;
