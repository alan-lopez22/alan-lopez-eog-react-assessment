import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricSaga from '../Features/Metric/saga';
import dashboardSaga from '../Features/Dashboard/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(metricSaga);
  yield spawn(dashboardSaga);
}
