import { Props, Key } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
	tag: WorkTag;
	key: Key;
	type: any;
	pendingProps: Props | null;
	stateNode: any;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	ref: FiberNode | null;
	memoizedProps: Props | null;
	alternate: FiberNode | null;
	flags: Flags;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例属性
		this.tag = tag;
		this.key = key;

		// 对于 HostComponent 来说，是 div,那么 stateNode 保存的就是 div 的DOM
		this.stateNode = null;

		// type 就是 fiberNode 的类型
		// 对于一个 FunctionComponet,它的type就是 0 , 对应的 workTag
		this.type = null;

		// 第二模块：节点之间的关系
		// return 表示 指向父节点的 fiberNode
		this.return = null;

		// 指向兄弟的 fiberNode
		this.sibling = null;

		// 指向子 fiberNode
		this.child = null;

		// 指向同级的 fiberNode 有好几个，比如 <ul><li></li><li></li><li></li><ul>
		this.index = 0;

		this.ref = null;

		// 作为工作单位
		// 刚开始准备工作时候，这个 props 是什么
		this.pendingProps = pendingProps;

		// 工作完之后，这个 props 是什么
		this.memoizedProps = null;

		// 副作用
		this.flags = NoFlags;
	}
}