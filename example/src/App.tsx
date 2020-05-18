import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SwagToggle from 'react-native-swag-toggle';

export default function App() {
  const [value, setValue] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
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
      <Text>SwagToggle</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  toggle: {
    backgroundColor: '#002984',
  },
  handle: {
    backgroundColor: '#757de8',
    shadowColor: '#000',
  },
  activeTextStyle: {
    fontSize: 12,
    color: '#000',
  },
  inactiveTextStyle: {
    fontSize: 10,
    color: '#757de8',
  },
});
