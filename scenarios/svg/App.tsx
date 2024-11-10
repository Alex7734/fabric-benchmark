import React, {useState} from 'react';
import {Button, Dimensions, ScrollView, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flexWrap: 'wrap'},
  view: {
    height: 20,
    width: 20,
    margin: 1,
    backgroundColor: 'purple',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 5,
    textAlign: 'center',
  },
});

const App = () => {
  const [show, setShow] = useState(false);

  const SvgExample = require('./Svg').SvgExample;

  return (
    <>
      <ScrollView>
      <Button title="SHOW" onPress={() => setShow(!show)} accessibilityLabel="SHOW" />
      {show ? (
          <View style={styles.container}>
            {Array(100)
              .fill(null)
              .map((_, index) => (
                <SvgExample key={index} />
              ))}
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

export default App;
