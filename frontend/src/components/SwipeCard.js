import CardLocation from "./CardLocation";
import "./SwipeCard.css";
import React, { useEffect, useState, useMemo, useRef } from "react";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StyledRating from "@material-ui/lab/Rating";
import PetsIcon from "@material-ui/icons/Pets";
import TinderCard from "react-tinder-card";
import VetClinicProfile from "../VetClinic";
import SelectedVets from "../SelectedVets";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import HistoryIcon from "@material-ui/icons/History";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const fetch = require("node-fetch");

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function SwipeCard(props) {
  const vetsList = useRef([]);
  const [vets, setVets] = useState([]);
  const [displaySwipe, setDisplaySwipe] = useState(false);
  const [displaySelected, setDisplaySelected] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [vetHistory, setVetHistory] = useState([]);

  useEffect(() => {
    const url = "http://localhost:2300/getvet";

    const options = { method: "GET" };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        vetsList.current = json;
        setVets(json);
        console.log(json);
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  let charactersState = vets;

  const [lastDirection, setLastDirection] = useState();
  const childRefs = useMemo(
    () =>
      Array(vetsList.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const generateVet = () => {
      let random = Math.floor(Math.random() * 4)

      if (random === 0) {
          return "Perfect for: 🐶 😸"
      } else if (random === 1) {
          return "Perfect for: 🐦 😸 🐶"
      } else if (random === 2) {
          return "Perfect for: 😸"
      } else {
          return "Perfect for: 🐶"
      }
  }

  const viewMainPage = () => {
    setDisplaySwipe(false);
    setDisplaySelected(false);
  };

  const swiped = (direction, vetToDelete) => {
    console.log("removing: " + vetToDelete);
    setLastDirection(direction);
    vetToDelete.direction = direction;
    setVetHistory((prevVetsToDelete) => [...prevVetsToDelete, vetToDelete]);
  };

  const outOfFrame = (place_id) => {
    console.log(place_id + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.place_id !== place_id
    );
    setVets(charactersState);
  };

  const classes = useStyles();

  const goToProfile = (id) => {
    setSelectedId(id);
    setDisplaySwipe(true);
  };

  const viewSelectedVets = () => {
    setDisplaySelected(true);
  };

  if (displaySelected) {
    return (
      <div>
        <div className="swipe-card-header">
          <img src="logo.png" alt="logo" width="250px" />
        </div>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => viewMainPage()}
        >
          Back
        </Button>
        <SelectedVets vets={vetHistory} id={selectedId} />
      </div>
    );
  }

  if (displaySwipe) {
    return (
      <div>
        <div className="swipe-card-header">
          <img src="logo.png" alt="logo" width="250px" />
        </div>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => viewMainPage()}
        >
          Back
        </Button>
        <VetClinicProfile id={selectedId} rating={4.5} />
      </div>
    );
  }

  return (
    <div className="swipe-card-container">
      <div className="swipe-card-header">
        <img src="logo.png" alt="logo" width="250px" />
      </div>
      <div className="sub-swipe-card-container">
        {vets.map((vet, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe-card"
            key={vet.place_id}
            onSwipe={(dir) => swiped(dir, vet)}
            onCardLeftScreen={() => outOfFrame(vet.place_id)}
          >
            <div className="card">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardLocation location={vet.location} />
                  <CardContent>
                    <div className="card-content">
                      <div>
                        <Typography gutterBottom variant="h5" component="h2">
                          {vet.name}
                        </Typography>
                        <StyledRating
                          name="customized-color"
                          defaultValue={vet.rating}
                          precision={0.5}
                          icon={<PetsIcon fontSize="inherit" />}
                          readOnly
                        />
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                        >
                          <div className="card-sub-text">{vet.vicinity}</div>
                        </Typography>
                      </div>
                      <div>
                        <div>
                        <Button
                          size="large"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<SupervisedUserCircleIcon />}
                          onClick={() => {
                            goToProfile(vet.place_id);
                          }}
                        >
                          View Clinic
                        </Button>
                        </div>
                        <div className="random-pets-container">
                          {generateVet()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          <div style={{ color: "green" }}>
            <ThumbUpIcon /> Swipe Right
          </div>
          <div style={{ color: "red" }}>
            <ThumbDownIcon /> Swipe Left
          </div>
          <div>Click view clinic to get more info</div>
        </h2>
      )}
      <div className="view-history-button">
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<HistoryIcon />}
          onClick={() => {
            viewSelectedVets();
          }}
        >
          View History
        </Button>
      </div>
    </div>
  );
}
