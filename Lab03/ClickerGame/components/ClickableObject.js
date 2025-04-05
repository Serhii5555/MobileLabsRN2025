import React, { useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
} from "react-native-gesture-handler";

const ClickableObject = ({ onScoreChange, updateTaskProgress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY()).current;

  const handleSingleTap = () => {
    onScoreChange(1);
    updateTaskProgress("click10");
  };

  const handleDoubleTap = () => {
    onScoreChange(2);
    updateTaskProgress("doubleClick5");
  };

  const handleLongPress = () => {
    onScoreChange(5);
    updateTaskProgress("longPress");
  };

  const handleSwipeRight = () => {
    const points = Math.floor(Math.random() * 10) + 1;
    onScoreChange(points);
    updateTaskProgress("swipeRight");
  };

  const handleSwipeLeft = () => {
    const points = Math.floor(Math.random() * 10) + 1;
    onScoreChange(points);
    updateTaskProgress("swipeLeft");
  };

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: position.x, translationY: position.y } }],
    {
      useNativeDriver: false,
      listener: () => updateTaskProgress("drag"),
    }
  );

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    {
      useNativeDriver: false,
      listener: () => updateTaskProgress("pinch"),
    }
  );

  return (
    <FlingGestureHandler
      direction={Directions.RIGHT}
      onActivated={handleSwipeRight}
    >
      <FlingGestureHandler
        direction={Directions.LEFT}
        onActivated={handleSwipeLeft}
      >
        <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
          <PanGestureHandler onGestureEvent={onPanGestureEvent}>
            <LongPressGestureHandler
              onActivated={handleLongPress}
              minDurationMs={3000}
            >
              <TapGestureHandler onActivated={handleSingleTap} numberOfTaps={1}>
                <TapGestureHandler
                  onActivated={handleDoubleTap}
                  numberOfTaps={2}
                >
                  <Animated.View
                    style={[
                      styles.object,
                      {
                        transform: [
                          ...position.getTranslateTransform(),
                          { scale: scale },
                        ],
                      },
                    ]}
                  />
                </TapGestureHandler>
              </TapGestureHandler>
            </LongPressGestureHandler>
          </PanGestureHandler>
        </PinchGestureHandler>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  object: {
    width: 100,
    height: 100,
    backgroundColor: "dodgerblue",
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 100,
  },
});

export default ClickableObject;
