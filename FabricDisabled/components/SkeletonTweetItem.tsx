import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export const SkeletonTweetItem = () => {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacityAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.authorPlaceholder} />
          <View style={styles.datePlaceholder} />
        </View>
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholderShort} />
        <View style={styles.metrics}>
          <View style={styles.metricPlaceholder} />
          <View style={styles.metricPlaceholder} />
          <View style={styles.metricPlaceholder} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginHorizontal: 8,
    marginTop: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  authorPlaceholder: {
    width: 100,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  datePlaceholder: {
    width: 50,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginLeft: 10,
  },
  textPlaceholder: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
  },
  textPlaceholderShort: {
    width: '60%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
  },
  metrics: {
    flexDirection: 'row',
    marginTop: 10,
  },
  metricPlaceholder: {
    width: 30,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
});
