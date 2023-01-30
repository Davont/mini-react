import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

// 让我们当前workInProgress 指向第一个fiberNode,这个fiber不是普通的fiber，其实是root
function prepareFeshStack(root: FiberRootNode) {
	// 它不是普通的fiber，不能直接拿来当 workInProgress，所以我们需要一个方法，用来创建我们的 workInProgress
	// workInProgress = fiber;
}

// container 与 renderRoot 更新流程连接上
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// TODO 调度功能
	// fiberRootNode
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFeshStack(root);
	// 初始化之后开始递归循环
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.warn('workLoop发生错误', e);
			workInProgress = null;
		}
	} while (true);
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}
function performUnitOfWork(fiber: FiberNode) {
	// 如果有子节点，遍历子节点
	const next: FiberNode = beginWork(fiber);

	// next 可能是 fiber 的子fiber  也可能是 null，如果是有子fiber，就继续往下遍历
	fiber.memoizedProps = fiber.pendingProps;

	// 如果没有子fiber，已经递归到最深层，应该归
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	// 没有子节点，遍历兄弟节点
	let node: FiberNode | null = fiber;
	do {
		// completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		// 递归继续往上
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
