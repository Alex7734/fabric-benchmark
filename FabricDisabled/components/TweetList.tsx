import React from 'react';
import { ScrollView, Text, View, StyleSheet, Pressable } from 'react-native';
import { Feed } from '../Tweet';
import { TweetItem } from './TweetItem';

const ItemSeparatorComponent = () => (
  <View style={styles.separator} />
);

export const TweetList = ({ feed, onBack }: { feed: Feed; onBack: () => void }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.flexContainer}>
          <Text style={styles.name}>Mini X</Text>
          <Pressable style={styles.button} onPress={onBack} accessibilityLabel="BACK_BUTTON">
            <Text>Back</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.tweetContainer}>
        {feed.tweets.map((item) => (
          <React.Fragment key={item.id}>
            <TweetItem tweet={item} />
            <ItemSeparatorComponent />
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    height: 60, 
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    paddingHorizontal: 15,
    zIndex: 1,
    elevation: 2,
  },
  tweetContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
  },
});

