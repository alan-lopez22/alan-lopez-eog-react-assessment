import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, useQuery } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import { actions } from './reducers';
import client from '../../common/eogresources-client';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    display: 'flex'
  }
}));

const getSelectedMetrics = (state: IState) => {
  const { selectedMetric } = state.metric;

  return selectedMetric;
};

const getMetrics = (state: IState) => {
  const { metrics } = state.dashboard;

  return metrics;
};

const query = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric,
      at,
      unit,
      value
    }
  }
}
`;

const DashboardMetrics = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedMetrics = useSelector(getSelectedMetrics);
  const metrics = useSelector(getMetrics);

  const [result] = useQuery({
    query,
    variables: {
      input: selectedMetrics.map(item => {
        return { metricName: item };
      }),
    },
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.metricsDataReceived(getMultipleMeasurements));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <div>
      {metrics &&
        metrics.map((item, index) => (
          <Grid key={index} item xs={4} className={classes.grid}>
            <Paper className={classes.paper}>
              <h5>{item.metric}</h5>
              <h2>{item.measurements[item.measurements.length - 1].value}</h2>
            </Paper>
          </Grid>
        ))}
    </div>
  );
};

export default () => {
  return (
    <Provider value={client}>
      <DashboardMetrics />
    </Provider>
  );
};

