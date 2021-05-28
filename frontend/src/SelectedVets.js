import CardLocation from "./components/CardLocation";
import CloseIcon from "@material-ui/icons/Close";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StyledRating from "@material-ui/lab/Rating";
import PetsIcon from "@material-ui/icons/Pets";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Grid } from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 255,
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
});

function SelectedVets({ vets }) {
  const classes = useStyles();

  useEffect(() => {
    vets.forEach((vet) => {
      console.log(vet);
    });
  });

  return (
    <div className="vet-card-container">
      <h3>Vets:</h3>
      <div className="vet-card">
        <Grid container spacing={5}>
          {vets.map((vet, index) => (
            <Grid key={index} item>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="h2">
                      {vet.name}
                    </Typography>
                    <div>{vet.vicinity}</div>
                    {/* {vet.direction.equals('right') && } */}
                    <div>
                      <Chip 
                        // icon={<InsertEmoticonIcon />}
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
