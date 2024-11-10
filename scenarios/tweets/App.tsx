import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
import { Tweet } from './Tweet';
import { TweetList } from './components/TweetList';
import { getTweets } from './Api';
import { SkeletonTweetItem } from './components/SkeletonTweetItem';

const TWEET_COUNT = 100;

const App = () => {
  const [show, setShow] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowTweets = () => {
    setShow(true);
  };

  useEffect(() => {
    if (show) {
      setIsLoading(true); 
      getTweets().then(apiTweets => {
        setTweets(apiTweets.slice(1, TWEET_COUNT + 1));
        setIsLoading(false);
      });
    }
  }, [show]); 

  if (isLoading) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonTweetItem key={index} />
        ))}
      </ScrollView>
    );
  }

  return show ? (
    <TweetList feed={{ tweets, isLoading: false }} />
  ) : (
    <View style={styles.mainAppContainer}>
      <Button title="SHOW TWEETS" onPress={handleShowTweets} accessibilityLabel="SHOW_TWEETS_BUTTON" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingVertical: 10,
  },
  mainAppContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
