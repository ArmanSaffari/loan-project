import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Link, IconButton, Tooltip } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function DashboardCards(props) {
  /* each card contains:
    img, title, content, path, 
  */
    
  return (
    <>
      <Grid container spacing={2}>
        {props.cards.map( (card) =>{
          return (
            <Grid item xs={12} md={6} lg={4}>
              <Card className="dashboardCard">
                <Grid item className="CardContentContainer">
                  <Typography component="div" className="cardContent">
                    {card.content}
                  </Typography>
                </Grid>

                <Grid container className="cardTitleBar">
                  <Grid item>
                    <Typography component="div" className="cardTitle">
                      {card.title}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Tooltip title={`details here!`}>
                      <IconButton 
                        href={card.path}
                        className="linkButton">
                        <ArrowOutwardIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                </Grid>
                
                
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}