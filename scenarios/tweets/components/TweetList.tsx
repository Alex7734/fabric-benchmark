import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Feed, Tweet } from '../Tweet';
import { TweetItem } from './TweetItem';

const ItemSeparatorComponent = () => (
  <View style={styles.separator} />
);

export const TweetList = ({ feed }: { feed: Feed }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.tweetContainer}>
        {feed.tweets.map((item) => (
          <React.Fragment key={item.id}>
            <TweetItem tweet={item} />
            <ItemSeparatorComponent />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9', 
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
});
