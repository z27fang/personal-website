---
title: "React Code Reading - hooks 1"
excerpt: "I wrote this article for firguring out what actually happenes while we call a hook. For example, what happenes after we call const [foo, setFoo] = useState('bar')."
category: "react"
coverImage: "/assets/react.svg.png"
date: "2021-09-21"
author:
  name: Zihao
  picture: "/assets/blog/authors/tim.jpeg"
tags: "js,js-react,js-react-hooks"
# ogImage:
#   url: "/assets/blog/hello-world/cover.jpg"
---

## How react works - react hooks

#### React version: 17.0.2

##### Part 0 - Introduction

I wrote this article for figuring out what happens while we call a hook function, for example:

```javascript
const [foo, setFoo] = useState("bar");
```

What happenes between the call of `useState` and the returned value? And how React ensures the update of value `foo`?

##### Part 1 - How to locate hooks?

With the help of react contribution guide，we can locate react components at [react/index.js](https://github.com/facebook/react/blob/master/packages/react/index.js). In this index file, we should notice the following export:

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

After I took a look at `./src/React.js`, the imports of these hooks are from `./ReackHooks.js`. From there, we can figure out how react defines those hooks.

##### Part2 - ReactHooks.js

In `ReactHooks.js`, we can find the following definition:

```javascript
//react/packages/react/src/ReactHooks.js: line 74
export function useState<S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

As you may notice, `useState` supports an input, which is the initial value of the state. After that, it calls `resolveDispatcher` function. From that, it returns the result of `useState` from `dispatcher`.

Other than `useState`, all other hooks follow this pattern, i.e. react calls `resolveDispatcher` and returns hooks accordingly. Now let's look at how `resolveDispatcher` defined.

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

\_\_DEV\_\_ is a flag for developers to debug. After reading the text in `console.error`, we know that all hooks are only available in functional components, where we get `dispatcher` form `ReactCurrentDispatcher.current`. This looks similar to the object returned by `useRef`, which returns an object contains a `current` field as well. All the `dispatcher` definitions come from [**react/packages/react-reconciler**](https://github.com/facebook/react/tree/master/packages/react-reconciler).


##### Part 3 - [react-reconciler and react fiber](https://github.com/facebook/react/tree/master/packages/react-reconciler)

From the `readme` we know that `react-reconciler` is actually a package for you to customize the `render` function. It also oversees the core algorithm of how React updates DOM. This package was not published in public as an api due to the complexity of render function. I found [**this article**](https://agent-hunt.medium.com/hello-world-custom-react-renderer-9a95b7cd04bc) did a good job on digging into the algorighm behind. Here we care more about how hooks are defined.

From `ReactHooks.js`, `dispatcher` are defined in `ReactInternalTypes` as below:

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

There's also a type `Fiber` defined as below:

```javascript
// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
export type Fiber = {|
  ...
}
```

Fiber is a concept to optimize react incremental rendering. For example, in a traditional call stack architecture of a component implementation, the call stack will keep working until the call stack is empty. However, sometimes we need more priority on some functions, like input, animation. Fiber provides more flexibility to arrange these jobs. In the fiber implementation, all jobs are defined individually as fiber, where React can cache the progress of the work of a fiber. Therefore, React can work on those with higher priority first, and come back later to work on jobs with lower priority. 

In short, like described in comments, fibers are simply independent works that will be done or have been (partially) done by components, and they holds their state and priority individually.

##### Part 4 - [ReactFiberHooks](https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberHooks.new.js)

This 3000+ lines of js file implements all type of hooks. Including the way of execution, the environment they will be executed, and etc. There are in total of 4 types of dispathers as below.

- First, hooks is a field of a dispatcher.
- Dispatchers are classified as below：
  - ContextOnlyDispather (line: 2066)
  - HooksDispatcherOnMount (line: 2091)
  - HooksDispatcherOnUpdate (line: 2116)
  - HooksDispatcherOnRerender(line: 2141)

In summary, for any dispatcher, e.g. `ContextOnlyDispatcher`, it has a `useState` field. When we call `useState` in our component, it returns the `current` of resolved dispatcher, and after that, it calls the `useState` in the returned dispatcher, which is one of the four above.

- **ContextOnlyDispatcher**
  - `ContextOnlyDispatcher` are used 2 times, one for initialization [**renderWithHooks**](https://github.com/facebook/react/blob/7c6049695f384a8c0daa685649df32078e5926b8/packages/react-reconciler/src/ReactFiberHooks.new.js#L359), and one for [**resetHooksAfterThrow**](https://github.com/facebook/react/blob/7c6049695f384a8c0daa685649df32078e5926b8/packages/react-reconciler/src/ReactFiberHooks.new.js#L562) once an error occured. Both functions set `ReactCurrentDispatcher.current` to `ContextOnlyDispatcher`.
  - We can treat this dispatcher as a initializer, for example, we sometimes create a function to set/reset values to their initial values.

- **renderWithHooks**
  - The rest 3 hooks are only called in the `renderWithHooks` as below.
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
  - First, the code determines the current state of `current`, in order to firgure out if the component is in initializing state. If it's ture, it calls `HooksDispatcherOnMount`, otherwise it calls `HooksDispatcherOnUpdate`. The `current` is a `Fiber` type. Based on the concept of `Fiber`, we can treat it as works that need to be done when a component start to initialize.

  - After setting `ReactCurrentDispatcher`, it calls `Component(...)`. Before going into `Component` call, we must know that `renderWithHooks` is used in many place, the top-level call is the lifecycle of a component, and some important functions like `forwardRef`. Also, we know components call `render` at the end, and the `render` calls the initialize of children components. In short, `renderWithHooks` is called recursively.

  - The later checks the render phase update, if there are no such needs, it calls `ContextOnlyDispatcher`.

##### Part 5 - One Sentence Summary

When a component use a hook function, the hook function is the result of calling dispatcher resolver which returns the correct hook calls based on the react component state.