import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null;

// 让我们当前workInProgress 指向第一个fiberNode
function prepareFeshStack(fiber: FiberNode) {
	workInProgress = fiber;
}

function renderRoot(root: FiberNode) {
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
