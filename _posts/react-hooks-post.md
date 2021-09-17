---
title: "React 源码阅读 - React hooks part 1"
excerpt: "这篇文章的主旨是理清楚从我们调用一个hook，比如const [foo, setFoo] = useState('bar')中，从调用useState到得到 foo, setFoo这之间发生了什么，以及这个useState是如何保证state的更新。"
category: "react"
coverImage: "/assets/react.svg.png"
date: "2021-03-24T05:35:07.322Z"
author:
  name: Zihao
  picture: "/assets/blog/authors/tim.jpeg"
tags: "js,js-react,js-react-hooks"
# ogImage:
#   url: "/assets/blog/hello-world/cover.jpg"
---

## How react works - react hooks

#### React version: 17.0.2

##### Part 0 - 导读

这篇文章的主旨是理清楚从我们调用一个 hook，比如

```javascript
const [foo, setFoo] = useState("bar");
```

中，从调用 useState 到得到 foo, setFoo 这之间发生了什么，以及这个 useState 是如何保证 state 的更新。

##### Part 1 - 如何定位到 hooks 源代码

在 react contribution guide 的帮助下，很容易可以找到 react components 的代码位置，即 [react/index.js](https://github.com/facebook/react/blob/master/packages/react/index.js) ，在 index.js 中，可以看到如下 hooks 的 export：

```javascript
export {
...
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useMutableSource,
  useMutableSource as unstable_useMutableSource,
...
} from './src/React';
```

从这里顺藤摸瓜，进入到./src/React.js 中，得知这些 hooks 的导入来源于 ./ReackHooks.js. 这样就可以找到最外层的 react hooks 的定义了

##### Part2 - ReactHooks.js

在粗浅地阅读这部分代码后，不难发现这里定义了各类 hooks 的 input，以 useState 举例：

```javascript
//react/packages/react/src/ReactHooks.js: line 74
export function useState<S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

可以看到， useState 支持一个 input，即这个 state 的初值，这里定义为 initialState，然后调用了 dispatcher 中的 useState。同时别的 hooks 也遵循类似的模式，即 ReactHooks.js 其实是一个对于 dispatcher 的 wrapper，核心功能都在 dispatcher 中实现。

这里有必要看一下 resolverDispatcher 的定义:

```javascript
import ReactCurrentDispatcher from "./ReactCurrentDispatcher";
import type { Dispatcher } from "react-reconciler/src/ReactInternalTypes";

//react/packages/react/src/ReactHooks.js: line 23
function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  if (__DEV__) {
    if (dispatcher === null) {
      console.error(
        "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for" +
          " one of the following reasons:\n" +
          "1. You might have mismatching versions of React and the renderer (such as React DOM)\n" +
          "2. You might be breaking the Rules of Hooks\n" +
          "3. You might have more than one copy of React in the same app\n" +
          "See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem."
      );
    }
  }
  // Will result in a null access error if accessed outside render phase. We
  // intentionally don't throw our own error because this is in a hot path.
  // Also helps ensure this is inlined.
  return ((dispatcher: any): Dispatcher);
}
```

\_\_DEV\_\_ 是 react 为了方便开发者调试而设置的 flag，通过这里的信息可以大致了解到所有外部 hook 调用只能在 functional components 中运行，dispacther 则通过 ReactCurrentDispatcher 得到。通过继续阅读 ReactCurrentDispatcher 的源代码可知，所有 dispatcher 的定义来源于[**react/packages/react-reconciler**](https://github.com/facebook/react/tree/master/packages/react-reconciler)。

##### Part 3 - [react-reconciler 和 react fiber](https://github.com/facebook/react/tree/master/packages/react-reconciler)

通过 readme 可知 react reconciler 表面上是 react 提供的一个让你能够自定义 render 函数的包，实际上 react-reconciler 涉及到核心的 dom 更新算法，由于 render 的复杂程度这个包并没有被推荐在实际应用中作为公开的 api 使用，如果对于 react-reconciler 感兴趣可以参考[**这篇博文**](https://agent-hunt.medium.com/hello-world-custom-react-renderer-9a95b7cd04bc) 。目前我们更关心的是 hooks 是如何被定义并且运行的。

通过 ReactHooks.js 的 import 可以看到，disptacher 类在'react-reconciler/src/ReactInternalTypes'中被定义,在 ReactInternalTypes 中可以看到这样一段 export:

```javascript
// Unwind Circular: moved from ReactFiberHooks.old
export type HookType =
  | "useState"
  | "useReducer"
  | "useContext"
  | "useRef"
  | "useEffect"
  | "useLayoutEffect"
  | "useCallback"
  | "useMemo"
  | "useImperativeHandle"
  | "useDebugValue"
  | "useDeferredValue"
  | "useTransition"
  | "useMutableSource"
  | "useOpaqueIdentifier"
  | "useCacheRefresh";
```

在阅读剩余的 ReactInternalTypes.js 后不难发现这其实是一个对于 dispatcher type 的定义文件，中间也为 dispatcher 定义了种种接口，其中就包括了各种 hooks。

在 ReactInternalTypes 中还有另一块定义如下:

```javascript
// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
export type Fiber = {|
  ...
}
```

这里定义了一个 Fiber type。Fiber 是一个用于优化 react incremental rendering 的概念，举个例子，在传统的 stack frame 中一个 stack 将持续工作直到它的所有 function call 都被运行完，然而有时候我们对于一些 function（或是说一些组件需要处理的工作）需求更高的优先级，例如 input，animation 更新等等。fiber 则为这些工作提供了更高的灵活性，这些工作都被定义为 fiber，在 stack frame 调用这些 fiber 的时候，他们可以 cache 当前 work 的进度，在执行完一个更高优先级的 work 后再返回来执行之前的任务，从而极大地优化了 react 的体验。

目前，我们只需要知道 fiber 是一个个独立的，需要被组件(component)执行（或是执行过的）的 work，拥有自己的 state 以及优先级就好了。

##### Part 4 - [ReactFiberHooks](https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberHooks.new.js)

这个 3112 行的 js 文件定义了各类 hook，包括他们的执行方式，条件等等。在这 3000 多行中，可以发现对于 hooks 的定义遵循以下模式：

- hooks 为 dispather 的一个 field
- Dispatcher 分为如下几种：
  - ContextOnlyDispather (line: 2066)
  - HooksDispatcherOnMount (line: 2091)
  - HooksDispatcherOnUpdate (line: 2116)
  - HooksDispatcherOnRerender(line: 2141)

即对于任意一个 dispatcher，以 useState 为例，都有一个 useState field,然而各个 useState 指向分别的适用于当前 dispatcher 的 useState 定义，接下来将对这些 dispatcher 分别展开说明。

- **ContextOnlyDispatcher**
  - ContextOnlyDispatcher 仅有两次调用，分别为初始化(renderWithHooks(line:348))，以及当出现 error 的时候(resetHooksAfterThrow(line:545))，这里都将 ReactCurrentDispatcher.current 设置为 ContextOnlyDispatcher, 这时候，所有的 hook 调用都将抛出异常(throwInvalidHookError(line:289))
  - 我们可以理解为这个 dispatcher 是用来设置初值的，类似于我们在使用一个变量前先将它定义为 null。

- **HooksDispatcherOnRerender**
  - 这里我们直接看下代码
  - ```Javascript
    export function renderWithHooks<Props, SecondArg>(
      current: Fiber | null,
      workInProgress: Fiber,
      Component: (p: Props, arg: SecondArg) => any,
      props: Props,
      secondArg: SecondArg,
      nextRenderLanes: Lanes,
    ): any {
        ...
    	ReactCurrentDispatcher.current =
          current === null || current.memoizedState === null
            ? HooksDispatcherOnMount
            : HooksDispatcherOnUpdate;
        let children = Component(props, secondArg);

         if (didScheduleRenderPhaseUpdateDuringThisPass) {
        // Keep rendering in a loop for as long as render phase updates continue to
        // be scheduled. Use a counter to prevent infinite loops.
        let numberOfReRenders: number = 0;
        do {
          didScheduleRenderPhaseUpdateDuringThisPass = false;
          invariant(
            numberOfReRenders < RE_RENDER_LIMIT,
            'Too many re-renders. React limits the number of renders to prevent ' +
              'an infinite loop.',
          );

          numberOfReRenders += 1;
          if (__DEV__) {
            // Even when hot reloading, allow dependencies to stabilize
            // after first render to prevent infinite render phase updates.
            ignorePreviousDependencies = false;
          }

          // Start over from the beginning of the list
          currentHook = null;
          workInProgressHook = null;

          workInProgress.updateQueue = null;

          if (__DEV__) {
            // Also validate hook order for cascading updates.
            hookTypesUpdateIndexDev = -1;
          }

          ReactCurrentDispatcher.current = __DEV__
            ? HooksDispatcherOnRerenderInDEV
            : HooksDispatcherOnRerender;

          children = Component(props, secondArg);
        } while (didScheduleRenderPhaseUpdateDuringThisPass);
      }

        ReactCurrentDispatcher.current = ContextOnlyDispatcher;
        ...
    }

    ```

  - 如上便是这三个 Dispatcher 的核心调用，首先这里对于 current 做了一个判定，这里的作用是在判定当前调用是否处在 init 的状态，如果是则使用 OnMount，如果 current 非 null 并且 memoizedState 为非 Null，则使用 OnUpdate。这里 Current 是一个 fiber，可以理解为在当前 component 开始初始化的时候，react 产生的各类 work。
  - 在设置完 `ReactCurrentDispatcher` 后， 紧接着调用了 `Component(...)`。`renderWithHooks` 这个 function 在很多地方被使用到，最顶层的调用即组件的生命周期，以及类似于 `forwardRef` 等等。这里，`component` 通常被传递为 `render` 函数，所以我们可以得知这就是一个层层递归调用渲染函数的一个思路。
  - 后面再一次调用将 `ReactCurrentDispatcher.current` 设置为 `ContextOnlyDispatcher`，即设成初值。
  - `didScheduleRenderPhaseUpdateDuringThisPass` 这个变量在 ReactFiberHooks 这个 js 被调用的时候设置成 false，通过一些对 fiber 的判定后决定是否为 true。简单地说，这里决定了 hooks 的调用是否处在 Rerender 的阶段。

##### Part 5 - 一句话总结

当在一个 component 中引用一个 hook function 的时候，我们调用的并不是这个 hook 本身，而是 react 根据当前 dispatcher 的状态进行判定过后，调用相对应的 hook 之后的返回值。
