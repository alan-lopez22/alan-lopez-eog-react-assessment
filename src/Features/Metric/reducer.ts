import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction } from '../../common/api-error-action';

export type MetricList = {
    metrics: string[];
    selectedMetric: string[]
}

const initialState: MetricList = {
    metrics: [],
    selectedMetric: []
};

const slice = createSlice({
    name: 'metric',
    initialState,
    reducers: {
        metricDataReceived: (state, action: PayloadAction<string[]>) => {
            state.metrics = action.payload;
        },
        updateSelectedMetric: (state, action: PayloadAction<string[]>) => {
            state.selectedMetric = action.payload;
        },
        metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;