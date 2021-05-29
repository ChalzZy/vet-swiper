import { useEffect, useState } from "react";
import StyledRating from "@material-ui/lab/Rating";
import PetsIcon from "@material-ui/icons/Pets";
import VetCard from "./components/VetCard";

const fetch = require("node-fetch");

function VetClinicProfile({ id, rating }) {

  const randomPhoneNumberGenerator = () => {
    let random = Math.floor(Math.random() * 3);
    let first = Math.floor(Math.random(100) * 999);
    let second = Math.floor(Math.random(1000) * 9999);

    if (random === 0) {
      return "021 " + first + " " + second;
    } else if (random === 1) {
      return "022 " + first + " " + second;
    } else {
      return "020 " + first + " " + second;
    }
  };

  const [vets, setVets] = useState([]);
  const [phone, setPhone] = useState(randomPhoneNumberGenerator());

  useEffect(() => {
    let url = `http://localhost:2300/getprofiles?id=${id}`;

    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    console.log(id);

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setVets(json);
      })
      .catch((err) => console.error("error:" + err));
  }, [id, vets]);

  return (
    <div>
      <h3>Phone: {phone}</h3>
      <h3>Opening Hours: 9AM - 6PM </h3>
      <StyledRating
        name="customized-color"
        defaultValue={rating}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<PetsIcon fontSize="inherit" />}
        readOnly
      />
      <VetCard vets={vets} />
    </div>
  );
}

export default VetClinicProfile;
