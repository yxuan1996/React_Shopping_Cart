import React from "react";
import Userfront from "@userfront/toolkit/react";
import { Container, Grid, Typography, Avatar, Button } from '@mui/material';

const Dashboard = ()  => {
      
    const userData = JSON.stringify(Userfront.user, null, 2);
    // userData is in string format, we need to use Userfront.user to get user data

    return (
      <div>
        <Container>
            <Typography variant="h2" gutterBottom>
                User Dashboard
            </Typography>

            <Grid container spacing={2} alignItems="center">
                <Grid item>
                <Avatar alt={Userfront.user.username} src={Userfront.user.image} sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item>
                <Typography variant="h5">{Userfront.user.username}</Typography>
                <Typography variant="body1" gutterBottom>
                    {Userfront.user.email}
                </Typography>
                </Grid>
            </Grid>
        </Container>
        <Button variant="contained" onClick={Userfront.logout}>Logout</Button>
      </div>
    );
  };

  export default Dashboard;