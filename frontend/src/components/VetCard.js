import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import "./VetCard.css"

const useStyles = makeStyles({
  root: {
    minWidth: 255,
  },
  media: {
    height: 140,
    backgroundSize: 'contain'
  },
});

function VetCard({ vets }) {
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
                <CardMedia
                  className={classes.media}
                  image={vet.picture}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h7" component="h2">
                    {vet.name.title} {vet.name.first} {vet.name.last}
                  </Typography>
                  <div>
                    Registered since {vet.registered.age} years.
                  </div>
                  <div>
                    <div>
                      Email: {vet.email}
                    </div>
                    <div>
                      Gender: {vet.gender}
                    </div>
                    <div>
                      Age: {vet.dob.age}
                    </div>
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

export default VetCard;
