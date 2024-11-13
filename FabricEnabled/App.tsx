import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Tweet } from './Tweet';
import { TweetList } from './components/TweetList';
import { getTweets } from './Api';

const PAGE_SIZE = 10;
const TWEET_COUNT = 100;

const App = () => {
  const [show, setShow] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const handleShowTweets = () => {
    setShow(true);
  };

  const loadMoreTweets = () => {
    if (!isLoading && tweets.length < TWEET_COUNT) {
      setIsLoading(true);
      getTweets().then(apiTweets => {
        const start = page * PAGE_SIZE;
        const newTweets = apiTweets.slice(start, start + PAGE_SIZE);
        setTweets(prevTweets => [...prevTweets, ...newTweets]);
        setPage(prevPage => prevPage + 1);
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    if (show) {
      loadMoreTweets();
    }
  }, [show]);

  return show ? (
    <TweetList
      tweets={tweets}
      loadMoreTweets={loadMoreTweets}
      isLoading={isLoading}
    />
  ) : (
    <View style={styles.mainAppContainer}>
      <Button title="SHOW TWEETS" onPress={handleShowTweets} accessibilityLabel="SHOW_TWEETS_BUTTON" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
