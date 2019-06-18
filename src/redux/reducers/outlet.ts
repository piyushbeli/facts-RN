import { Types } from '@types';
import { IOutlet } from '@interfaces/outlet';
import { AnyAction } from 'redux';

const initialState: IOutlet.StateToProps = {
  error: false,
  loading: false,
  outlets: undefined
};

export function outlet(
  state: IOutlet.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    // FETCH OUTLETS
    case Types.FETCH_OUTLETS:
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_OUTLETS_SUCCESS:
      return {
        error: false,
        loading: false,
        outlets: action.payload.outlets
      };
    case Types.FETCH_OUTLETS_FAILED:
      return {
        error: action.payload.message || true,
        loading: false,
        outlets: []
      };
    default:
      return state;
  }
}
