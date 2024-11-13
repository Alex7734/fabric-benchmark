import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Tweet } from '../Tweet';
import { TweetItem } from './TweetItem';
import { SkeletonTweetItem } from './SkeletonTweetItem';

interface TweetListProps {
  tweets: Tweet[];
  loadMoreTweets: () => void;
  isLoading: boolean;
}

export const TweetList: React.FC<TweetListProps> = ({ tweets, loadMoreTweets, isLoading }) => {
  return (
    <FlatList
      data={tweets}
      renderItem={({ item }) => <TweetItem tweet={item} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={loadMoreTweets}
      onEndReachedThreshold={0.9}
      ListFooterComponent={isLoading ? <SkeletonLoader /> : null}
      style={styles.container}
    />
  );
};

const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    {Array.from({ length: 10 }).map((_, index) => (
      <SkeletonTweetItem key={index} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  skeletonContainer: {
    paddingVertical: 10,
  },
});
