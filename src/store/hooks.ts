import {createTypedHooks} from 'easy-peasy';
import {OrderModel} from './store';

const typedHooks = createTypedHooks<OrderModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;