import * as React from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  GestureResponderEvent,
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface Props {
  value: boolean;
  onValueChange(value: boolean): unknown;
  style?: StyleProp<ViewStyle>;
  leftText: string;
  rightText: string;
  activeTextStyle?: StyleProp<TextStyle>;
  inactiveTextStyle?: StyleProp<TextStyle>;
}

const HANDLE_SIZE = 22;
const HANDLE_PADDING = 2;
const TRACK_LENGTH = 22;
const CONTAINER_HEIGHT = HANDLE_SIZE + HANDLE_PADDING * 2;

class SwagToggle extends React.Component<Props> {
  private panResponder: PanResponderInstance;
  private anim: Animated.Value;

  constructor(props: Props) {
    super(props);
    const { value } = props;

    this.anim = new Animated.Value(value ? 1 : 0);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.value !== prevProps.value) {
      this.animateSwitch(this.props.value);
    }
  }

  onPanResponderRelease = (
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const { value, onValueChange } = this.props;
    // The gesture is not in the wrong direction
    const switchToggled = value ? gestureState.dx < 10 : gestureState.dx > -10;
    if (switchToggled && onValueChange) {
      onValueChange(!value);
    }
  };

  animateSwitch = (value: boolean) => {
    this.anim.stopAnimation();
    Animated.timing(this.anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      style,
      leftText,
      rightText,
      activeTextStyle,
      inactiveTextStyle,
    } = this.props;
    const foregroundTextStyle = [
      styles.circle,
      styles.text,
      styles.foregroundText,
      activeTextStyle,
    ];

    const backgroundTextStyle = [
      styles.circle,
      styles.text,
      styles.backgroundText,
      inactiveTextStyle,
    ];
    const animatedStyle = {
      transform: [{ translateX: Animated.multiply(this.anim, TRACK_LENGTH) }],
    };
    const reverseAnimatedStyle = {
      transform: [{ translateX: Animated.multiply(this.anim, -TRACK_LENGTH) }],
    };
    return (
      <View
        style={[styles.container, style]}
        {...this.panResponder.panHandlers}
      >
        <Text style={[backgroundTextStyle, styles.left]}>{leftText}</Text>
        <Text style={[backgroundTextStyle, styles.right]}>{rightText}</Text>
        <Animated.View style={[styles.circle, styles.handle, animatedStyle]}>
          <View
            style={[
              StyleSheet.absoluteFill,
              styles.circle,
              styles.clippingMask,
            ]}
          >
            <Animated.View style={[styles.inner, reverseAnimatedStyle]}>
              <Text style={[foregroundTextStyle, styles.right]}>
                {rightText}
              </Text>
              <Text style={[foregroundTextStyle, styles.left]}>{leftText}</Text>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default SwagToggle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    height: CONTAINER_HEIGHT,
    width: CONTAINER_HEIGHT + TRACK_LENGTH,
    borderRadius: CONTAINER_HEIGHT / 2,
    marginHorizontal: 8,
  },
  circle: {
    height: HANDLE_SIZE,
    width: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
  },
  handle: {
    position: 'absolute',
    left: HANDLE_PADDING,
    top: HANDLE_PADDING,
    bottom: HANDLE_PADDING,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    // for Android
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    lineHeight: HANDLE_SIZE,
  },
  backgroundText: {
    top: HANDLE_PADDING,
    bottom: HANDLE_PADDING,
    left: HANDLE_PADDING,
    right: HANDLE_PADDING,
  },
  foregroundText: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  left: {
    position: 'absolute',
    right: undefined,
  },
  right: {
    position: 'absolute',
    left: undefined,
  },
  clippingMask: {
    overflow: 'hidden',
  },
  inner: {
    position: 'absolute',
    height: HANDLE_SIZE,
    width: HANDLE_SIZE + TRACK_LENGTH,
  },
});
