import { Action } from 'shared/ReactTypes';
import { Update } from './fiberFlags';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

export const CreateUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<Action>;
};

export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	updateQueue.shared.pending = update;
};

const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			// baseState 1, updateState (x)=>2x => memoizedState 1*2 = 2
			// baseState 1, updateState (x)=>4x => memoizedState 1(baseState) * 4 = 4
			result.memoizedState = action(baseState);
		} else {
			// baseState 1, updateState 2 => memoizedState 2
			result.memoizedState = action;
		}
	}

	return result;
};
