import CardLocation from "./CardLocation";
import "./SwipeCard.css";
import React, { useEffect, useState, useMemo, useRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import DoneIcon from "@material-ui/icons/Done";
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

  const swiped = (direction, vetToDelete) => {
    console.log("removing: " + vetToDelete);
    setLastDirection(direction);
    setVetHistory((prevVetsToDelete) => ([...prevVetsToDelete, vetToDelete]));
    console.log("!!!!!!!!! AAAAAAAA" + vetToDelete.name)
    console.log(JSON.stringify(vetToDelete))
  };

  const outOfFrame = (place_id) => {
    console.log(place_id + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.place_id !== place_id
    );
    setVets(charactersState);
  };

  // const swipe = (dir) => {
  //   const cardsLeft = vets.filter(
  //     (person) => !alreadyRemoved.includes(person.place_id)
  //   );
  //   if (cardsLeft.length) {
  //     const toBeRemoved = cardsLeft[cardsLeft.length - 1].place_id; // Find the card object to be removed
  //     console.log(JSON.stringify(vetsList.current));
  //     const vetsTemp = vetsList;
  //     const index = vetsTemp
  //       ?.map((person) => person.place_id)
  //       .indexOf(toBeRemoved); // Find the index of which to make the reference to
  //     alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
  //     childRefs[index].current.swipe(dir); // Swipe the card!
  //   }
  // };

  const classes = useStyles();

  const goToProfile = (id) => {
    setSelectedId(id);
    setDisplaySwipe(true);
  };

  const viewSelectedVets = () => {
    setDisplaySelected(true);
  };

  if (displaySelected) {
    return <SelectedVets vets={vetHistory} />;
  }

  if (displaySwipe) {
    return <VetClinicProfile id={selectedId} />;
  }

  return (
    <div className="swipe-card-container">
      <div className="sub-swipe-card-container">
        {vets.map((vet, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe-card"
            key={vet.place_id}
            onSwipe={(dir) => swiped(dir, vet)}
            onCardLeftScreen={() => outOfFrame(vet.place_id)}
            // onClick={()}
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
                          defaultValue={4}
                          getLabelText={(value) =>
                            `${value} Heart${value !== 1 ? "s" : ""}`
                          }
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
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* <div className="swipe-card-button">
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<DoneIcon />}
          onClick={() => swipe("left")}
        >
          Yeah
        </Button>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<CloseIcon />}
          onClick={() => swipe("right")}
        >
          Naaa
        </Button>
      </div> */}
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          <div>Yeah! Swipe Left!</div>
          <div>Naaa! Swipe Right!</div>
          <div>Click to get more info</div>
        </h2>
      )}
      <div className="view-history-button">
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SupervisedUserCircleIcon />}
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
