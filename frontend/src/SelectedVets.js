import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import VetClinicProfile from "./VetClinic";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 255,
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
});

function SelectedVets({ vets, id,  clinicName }) {
  const classes = useStyles();

  const [viewVetProfile, setViewVetProfile] = useState(false);
  const [activeId, setActiveId] = useState();

  useEffect(() => {
    vets.forEach((vet) => {
      console.log(vet);
    });
  });

  const updateViewVetProfile = (id) => {
    setActiveId(id);
    setViewVetProfile((prevVal) => !prevVal);
  }

  if (viewVetProfile) {
    return (
      <div>
        <VetClinicProfile id={activeId} rating={4.5} />
      </div>
    )
  }

  return (
    <div className="vet-card-container">
      <h3>History:</h3>
      <div className="vet-card">
        <Grid container spacing={5}>
          {vets.map((vet, index) => (
            <Grid key={index} item>
              <Card className={classes.root} onClick={() => {updateViewVetProfile(vet.place_id)}}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="h2">
                      {vet.name}
                    </Typography>
                    <div>{vet.vicinity}</div>
                    <div>
                      <Chip 
                        label={vet.direction} />
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default SelectedVets;
