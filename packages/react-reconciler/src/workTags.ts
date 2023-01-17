export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;

// 比如：react.render()
export const HostRoot = 3;

// 比如：<div>
export const HostComponent = 5;

// 比如 <div>123</div>
export const HostText = 6;
