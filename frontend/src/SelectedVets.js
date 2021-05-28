import CardLocation from "./components/CardLocation";
import CloseIcon from "@material-ui/icons/Close";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StyledRating from "@material-ui/lab/Rating";
import PetsIcon from "@material-ui/icons/Pets";
import { Grid } from "@material-ui/core";

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

  return (
    <div className="vet-card-container">
      <h3>Vets:</h3>
      <div className="vet-card">
        <Grid container spacing={5}>
          {vets.map((vet, index) => (
            <Grid key={index} item>
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
                      {/* <div>
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
                          Check us out!
                        </Button>
                      </div> */}
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
