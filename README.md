# react-native-swag-toggle

Swag Toggle

## Installation

```sh
yarn add react-native-swag-toggle
```

## Usage

```js
import SwagToggle from 'react-native-swag-toggle';

const Component = () => {
  const [value, setValue] = React.useState(false);
  return (
    <SwagToggle
      value={value}
      onValueChange={setValue}
      leftText="Off"
      rightText="On"
      style={styles.toggle}
      handleStyle={styles.handle}
      activeTextStyle={styles.activeTextStyle}
      inactiveTextStyle={styles.inactiveTextStyle}
    />
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
