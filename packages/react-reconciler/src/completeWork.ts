import { FiberNode } from './fiber';
import { HostComponent, HostRoot, HostText } from './workTags';

// 递归中的归
export const completeWork = (wip: FiberNode) => {
	const newProps = wip.pendingProps;
	const current = wip.alternate;

	switch (wip.tag) {
		case HostRoot:
			return null;
		case HostComponent:
			// 构建离屏的DOM树
			// 1. 构建DOM
			// 2. 将DOM插入DOM树中
			return null;
		case HostText:
			// 1. 构建DOM
			// 2. 将DOM插入DOM树中
			return null;

		default:
			if (__DEV__) {
				console.warn('未处理的completeWork情况', wip);
			}
			break;
	}
	return null;
};
