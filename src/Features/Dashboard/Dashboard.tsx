import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import DashboardCharts from './DashboardCharts';
import DashboardMetrics from './DashboardMetrics';

const useStyles = makeStyles(theme => ({
  root: {
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return <div className={classes.root}>
      <Grid container spacing={4}>
        <DashboardMetrics />
        <DashboardCharts />
      </Grid>
  </div>;
};

export default Dashboard;
