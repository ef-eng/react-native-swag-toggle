# react-native-swag-toggle

A Swag Toggle for React Native and Expo Web

![Screnshot](.github/screenshot.gif)

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
      leftText="L"
      rightText="R"
      style={styles.toggle}
      handleStyle={styles.handle}
      activeTextStyle={styles.activeText}
      inactiveTextStyle={styles.inactiveText}
    />
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
