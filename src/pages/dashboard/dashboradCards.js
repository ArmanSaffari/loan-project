import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Link } from '@mui/material';

export default function DashboardCards(props) {
  /* each card contains:
    img, title, content, path, 
  */
    
  return (
    <>
      <Grid container spacing={2}>
        {props.cards.map( (card) =>{
          return (
            <Grid item sm={12} md={6} lg={4}>
              <Card>
                <Typography gutterBottom variant="h5" component="div">
                   {card.title}
                </Typography>
                {/* <CardMedia
                  sx={{ height: 140 }}
                  image={card.imgSrc}
                  title=""
                /> */}
                <CardContent>
                  <Typography variant="h2" 
                    color="primary"
                    sx={{textAlign: 'center'}}>
                    {card.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link 
                    href={card.path}
                    underline="hover">
                    {card.path}
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}