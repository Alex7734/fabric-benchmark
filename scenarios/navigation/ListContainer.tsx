import React from 'react';

export const SkeletonContainer = () => {
  return <View style={styles.container} />; 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 100,
    width: 100,
  },
});
