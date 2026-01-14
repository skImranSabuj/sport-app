import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;

export type FiltersSheetRef = {
  open: () => void;
  close: () => void;
};

const categories = [
  'Australian Rules',
  'Rugby League',
  'Cricket',
  'Mixed Martial Arts',
  'Boxing',
  'Tennis',
  'Football',
  'Basketball',
];

const FiltersSheet = forwardRef<FiltersSheetRef>((_, ref) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);

  useImperativeHandle(ref, () => ({
    open: () => {
      translateY.value = withTiming(SCREEN_HEIGHT - SHEET_HEIGHT, {
        duration: 300,
      });
    },
    close: () => {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 });
    },
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT,
          backgroundColor: 'rgba(0,0,0,0.35)',
        },
        animatedStyle,
      ]}
    >
      <Pressable style={{ flex: 1 }} onPress={() => (translateY.value = SCREEN_HEIGHT)} />

      <View
        style={{
          height: SHEET_HEIGHT,
          backgroundColor: '#FFF',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '700' }}>FILTERS</Text>
          <Pressable onPress={() => (translateY.value = SCREEN_HEIGHT)}>
            <Text style={{ fontSize: 16 }}>✕</Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.map((item) => (
            <View
              key={item}
              style={{
                paddingVertical: 14,
                paddingHorizontal: 12,
                backgroundColor: '#F3F4F8',
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600' }}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Apply button */}
        <Pressable
          style={{
            backgroundColor: '#3B4CCA',
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
            Apply
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
});

export default FiltersSheet;
