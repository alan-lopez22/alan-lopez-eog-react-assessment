import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricReducer } from '../Features/Metric/reducer';
import { reducer as dashboardReducer } from '../Features/Dashboard/reducers';

export default {
  weather: weatherReducer,
  metric: metricReducer,
  dashboard: dashboardReducer
};
