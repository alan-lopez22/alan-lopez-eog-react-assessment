import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction } from '../../common/api-error-action';

export type Measurement = {
    metric: string,
    at: Date,
    unit: string,
    value: number
}

export type MetricValue = {
    metric: string;
    measurements: Measurement[]
}

export type MetricValues = {
    metrics: MetricValue[]
}


const initialState: MetricValues = {
    metrics: []
};

const slice = createSlice({
    name: 'metric-charts',
    initialState,
    reducers: {
        metricsDataReceived: (state, action: PayloadAction<MetricValue[]>) => {
            state.metrics = action.payload;
        },
        metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
