# snow-valley-ui [WIP]

`snow-valley-ui` 是一个 `Telemgram` 风格的 React Native 组件库.

和其他组件库不同的是, `snow-valley-ui` 主要开发并不是基础组件, 而是特性组件, 所以它不会提供诸如 `Input`, `Form` 等基础组件, 而是提供特性组件, 例如 `虚拟数字键盘`, `Toast`, `FloatingInput` 等.

## 特性
[x] `Tree Sheking 友好` 与基础组件库不同, 你不必对 `组件库` 的概念产生恐惧, `snow-valley-ui` 的所有代码都是遵循 `ESM`, 除去大约 10kb 的基础代码, 其余代码仅会被引用后才会被打包, 所以你不必担心 `snow-valley-ui` 会让你的项目变得臃肿.
[x] `Motion first`, 所有的特性组件均提供流畅, 美丽, 令人舒适的动画过渡效果, powered by `react-native-reanimated`
[x] Expo 开箱即用
[x] TypeScript 支持

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
expo install react-native-reanimated @gorhom/portal lottie-react-native expo-haptics
```

## 启动

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

#### `@gorhom/portal` 是可选的

如果你是一个有强迫症的开发者, 那么你可能会在意 `@gorhom/portal` 被哪些组件所依赖, 如果不使用依赖 `@gorhom/portal` 的组件则不需要安装 `@gorhom/portal`.

在 `snow-valley-ui` 中, 使用 `@gorhom/portal` 的组件主要是覆盖在屏幕上面的组件, 下面使用 `@gorhom/portal` 的组件列表:

- `VirtualKeyboard`
- `Toast`
- `NightModeIndicatorRipple`

### 客制化支持

正如开头所说, `snow-valley-ui` 是一个特性组件库, 它的主题设计/交互逻辑/动画效果主要参考于 `Telegram`, 所以能够进行客制化的部分较少, 好在 `snow-valley-ui` 所有组件的开发目标都是保持代码独立, 所以你可以很容易的将 `snow-valley-ui` 中的组件复制出来进行修改, 然后在你的项目中使用, 如果你认为你所修改的组件可以被其他人使用, 你可以在 `snow-valley-ui` 的 `github` 仓库中提交 `PR`.


