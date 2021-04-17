import tweepy

import twitter_credentials
import pandas as pd
from sentiment_analysis import SentimentAnalysis


class TwitterApi:
    def __init__(self, count):
        self.auth = tweepy.AppAuthHandler(
            twitter_credentials.CONSUMER_KEY, twitter_credentials.CONSUMER_SECRET)
        self.api = tweepy.API(self.auth)
        self.tweets_info = []
        self.count = count

    def get_tweets(self):
        sentiment_analysis = SentimentAnalysis()
        try:
            places = self.api.geo_search(
                query="USA", granularity="country")
            place_id = places[0].id
            tweets = tweepy.Cursor(
                self.api.search, q="place:{}".format(place_id)).items(self.count)
            for tweet in tweets:
                positive, neutral, negative = sentiment_analysis.analyse(
                    tweet.text)
                self.tweets_info.append({
                    'id': str(tweet.id),
                    'tweetText': tweet.text,
                    'placeName': tweet.place.name,
                    'placeCoordinates': tweet.place.bounding_box.coordinates[0],
                    'sentimentAnalysisScore':{
                        'positive':positive,
                        'neutral':neutral,
                        'negative':negative,
                    }
                })
                print(tweet.text)
                sentiment_analysis.analyse(tweet.text)
            # print(len(self.tweets_info))
            return self.tweets_info
        except Exception as err:
            print(err)

    def start(self):
        print(self.get_tweets())


if __name__ == '__main__':
    twitter_api = TwitterApi(2)
    twitter_api.start()
