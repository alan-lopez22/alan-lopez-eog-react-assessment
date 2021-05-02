import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import client from '../../common/eogresources-client';
import MultiSelect from '../../components/MultiSelect';

const query = `
{
    getMetrics
}
`;

const getMetrics = (state: IState) => {
    const { metrics } = state.metric;

    return metrics;
}

const getSelectedMetrics = (state: IState) => {
    const { selectedMetric } = state.metric;

    return selectedMetric;
}

export default () => {
    return (
      <Provider value={client}>
        <Metric />
      </Provider>
    );
};
  
const Metric = () => {
    const dispatch = useDispatch();
    const metrics = useSelector(getMetrics);
    const selectedMetrics = useSelector(getSelectedMetrics);

    const handleChange = (value: any) => {
        dispatch(actions.updateSelectedMetric(value));
    };

    const [ result ] = useQuery({
        query
    });
    const { fetching, data, error } = result;

    useEffect(() => {
        if (error) {
            dispatch(actions.metricApiErrorReceived({ error: error.message }));
            return;
        }

        if (!data) return;
        const { getMetrics } = data;
        dispatch(actions.metricDataReceived(getMetrics));
    }, [dispatch, data, error]);
    
    if (fetching) return <LinearProgress />;

    return <MultiSelect items={metrics} selectedItems={selectedMetrics} onSelectedItems={handleChange} />
};