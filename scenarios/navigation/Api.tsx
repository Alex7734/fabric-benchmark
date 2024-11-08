import {Tweet} from './Tweet';

const BASE_URI = 'https://rn-eu-perf-usual-suspects.herokuapp.com';
const fetchJson = (uri: string) => {
  return fetch(uri).then(response => response.json());
};

export const getUser = () =>
  fetchJson('https://rn-eu-perf-usual-suspects.herokuapp.com/user');
export const getUserStats = () =>
  fetchJson('https://rn-eu-perf-usual-suspects.herokuapp.com/user-stats');
export const getTweets = (): Promise<Tweet[]> =>
  fetchJson('https://flperf-reports-915881.netlify.app/data/feed.json');
export const getLikes = (): Promise<Tweet[]> =>
  fetchJson('https://flperf-reports-915881.netlify.app/data/feed.json').then(
    feed => feed.slice(50),
  );
export const getMedia = (): Promise<Tweet[]> =>
  fetchJson('https://flperf-reports-915881.netlify.app/data/feed.json').then(
    feed => feed.slice(100),
  );
export const getReplies = (): Promise<Tweet[]> =>
  fetchJson('https://flperf-reports-915881.netlify.app/data/feed.json').then(
    feed => feed.slice(150),
  );
export const getBannerUri = (): string => `${BASE_URI}/banner.html`;
