import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, ScrollView, Text } from 'react-native';
import { Tweet } from './Tweet';
import { TweetList } from './components/TweetList';
import { getTweets } from './Api';
import { SkeletonTweetItem } from './components/SkeletonTweetItem';
import { PrimeCalculator } from './components/PrimeCalculator';
import { MemoryAllocator } from './components/MemoryAllocator';
import { TestScreens } from './enum';

const TWEET_COUNT = 100;

const App = () => {
  const [showScreen, setShowScreen] = useState<TestScreens | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowTweets = () => setShowScreen(TestScreens.TWEETS);
  const handleShowCpuIntensive = () => setShowScreen(TestScreens.CPU_INTENSIVE);
  const handleShowMemoryIntensive = () => setShowScreen(TestScreens.MEMORY_INTENSIVE);
  const handleBack = () => setShowScreen(null);

  useEffect(() => {
    if (showScreen === TestScreens.TWEETS) {
      setIsLoading(true);
      getTweets().then(apiTweets => {
        setTweets(apiTweets.slice(1, TWEET_COUNT + 1));
        setIsLoading(false);
      });
    }
  }, [showScreen]);

  if (isLoading) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonTweetItem key={index} />
        ))}
      </ScrollView>
    );
  }

  const renderScreen = () => {
    switch (showScreen) {
      case TestScreens.TWEETS:
        return <TweetList feed={{ tweets, isLoading: false }} onBack={handleBack} />;
      case TestScreens.CPU_INTENSIVE:
        return <PrimeCalculator limit={100000} onBack={handleBack} />;
      case TestScreens.MEMORY_INTENSIVE:
        return <MemoryAllocator size={100000000} onBack={handleBack} />;
      default:
        return (
          <View style={styles.mainAppContainer}>
            <Text style={styles.title}>React Native Performance Test</Text>
            <Button title="SHOW TWEETS" onPress={handleShowTweets} accessibilityLabel="SHOW_TWEETS_BUTTON" />
            <Button title="CPU INTENSIVE" onPress={handleShowCpuIntensive} accessibilityLabel="CPU_INTENSIVE_BUTTON" />
            <Button title="MEMORY INTENSIVE" onPress={handleShowMemoryIntensive} accessibilityLabel="MEMORY_INTENSIVE_BUTTON" />
          </View>
        );
    }
  };

  return renderScreen();
};

const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1,
    gap: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingVertical: 10,
  },
});

export default App;
