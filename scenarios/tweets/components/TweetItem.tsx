import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {format} from 'date-fns';
import {Tweet} from '../Tweet';

const tweetAuthorStyle = {fontWeight: 'bold', color: 'black'};

const emojiIcons = {
  heart: '❤️',
  comment: '💬',
  retweet: '🔄',
  share: '📤',
};

const TweetHeader = ({tweet}: {tweet: Tweet}) => (
  <Text>
    <Text style={{flex: 1}} numberOfLines={1}>
      <Text style={tweetAuthorStyle}>{tweet.author.name}</Text>
      <Text style={{color: '#444'}}> @{tweet.author.username}</Text>
    </Text>
    <TweetDate tweet={tweet} />
  </Text>
);

const TweetDate = ({tweet}: {tweet: Tweet}) => (
  <Text style={{color: '#444'}}>
    {' '}
    · {format(new Date(tweet.createdAt), 'dd MMM')}
  </Text>
);

const metricsContainerStyle = {flexDirection: 'row', paddingTop: 5};
const Metric = ({emoji, value}: {emoji: string; value: number}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
    <Text style={{fontSize: 18, marginRight: 5}}>{emoji}</Text>
    {value ? <Text style={{color: '#444'}}>{value}</Text> : null}
  </View>
);

const Metrics = ({tweet}: {tweet: Tweet}) => (
  <View style={metricsContainerStyle}>
    <Metric emoji={emojiIcons.comment} value={tweet.public_metrics.quote_count} />
    <Metric emoji={emojiIcons.retweet} value={tweet.public_metrics.retweet_count} />
    <Metric emoji={emojiIcons.heart} value={tweet.public_metrics.like_count} />
    <Text style={{fontSize: 18, marginLeft: 'auto'}}>{emojiIcons.share}</Text>
  </View>
);

export const TweetItem = ({tweet}: {tweet: Tweet}) => {
  return (
    <Pressable>
      <View
        style={{flexDirection: 'row', paddingHorizontal: 10}}
        testID={`TWEET_${tweet.id}`}>
        <View style={{flex: 1}}>
          <TweetHeader tweet={tweet} />
          <Text style={{marginVertical: 5, color: 'black'}}>{tweet.text}</Text>
          <Metrics tweet={tweet} />
        </View>
      </View>
    </Pressable>
  );
};
