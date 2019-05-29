`with-default-props` lets you write `DefaultProps` for function components in a painless way.


## API
Only one function is exported. Properties appearing in `defaultProps` will become optional in WrappedComponent.

```typescript
function withDefaultProps(Component, defaultProps): WrappedComponent
```

---
-   NPM: `npm install with-default-props`
-   Yarn: `yarn add with-default-props`
---


## Example

```jsx
import { withDefaultProps } from 'with-default-props'

type Props = {
    text: string;
    onClick: () => void;
};

function Component(props: Props) {
    return <div onClick={props.onClick}>{props.text}</div>;
}

// `onClick` is optional now.
const Wrapped = withDefaultProps(Component, { onClick: () => {} })


function App1() {
    // ✅
    return <Wrapped text="hello"></Wrapped>
}

function App2() {
    // ✅
    return <Wrapped text="hello" onClick={() => {}}></Wrapped>
}

function App3() {
    // ❌
    // Error: "text" is missing!
    return <Wrapped onClick={() => {}}></Wrapped>
}
```

## Alernative
[React functional component default props vs default parameters](https://stackoverflow.com/q/47774695/5006372), but they don't play well with TypeScript.
