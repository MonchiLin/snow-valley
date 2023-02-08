# snow-valley [WIP]

Snow Valley is a Telegram unofficial app.

## 安装

```bash
npm install snow-valley-ui
// yarn
yarn add snow-valley-ui
```

### 安装依赖
`snow-valley-ui` 使用了 `react-native-reanimated` 与 `@gorhom/portal` 两个库, 为了让 `snow-valley-ui` 的组件能够正常工作, 你需要在你的项目中安装这两个库.
如果你已经安装了这两个依赖, 请跳过这一步.
```bash
expo install react-native-reanimated @gorhom/portal
```

## Setup

首先使用 `PortalProvider` 组件包裹根组件.

```jsx
import { PortalProvider } from '@gorhom/portal';

const Root = () => {
  return (
    <PortalProvider>
      <YourApp />
    </PortalProvider>
  );
};
```

然后使用 `SnowValley` 组件包裹你的使用 `sonw-valley-ui` 的组件的父组件.

```jsx
import { SnowValley } from 'snow-valley';

const App = () => {
  return (
    <SnowValley>
      <YourApp />
    </SnowValley>
  );
};
```

Ok, 现在你可以探索 `snow-valley-ui` 的所有特性了.

## 技术细节

### 为什么需要使用 `PortalProvider` 包裹根组件

在 React 中我们一般使用 `Portal` 组件来将组件渲染到 DOM 树之外的地方, 但是在 React Native 中我们并没有这样的组件, 所以我们需要使用 `@gorhom/portal` 这个库来实现这个功能.





