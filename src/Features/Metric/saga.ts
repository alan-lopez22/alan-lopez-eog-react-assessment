import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as MetricActions } from './reducer';
import { PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction } from '../../common/api-error-action';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
    yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* metricApiError() {
    yield takeEvery(MetricActions.metricApiErrorReceived.type, apiErrorReceived);
}
