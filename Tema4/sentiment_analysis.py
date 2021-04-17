from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from sentiment_analysis_credentials import KEY,ENDPOINT

def authenticate_client():
    ta_credential = AzureKeyCredential(KEY)
    text_analytics_client = TextAnalyticsClient(
            endpoint=ENDPOINT, credential=ta_credential)
    return text_analytics_client

class SentimentAnalysis:
    def __init__(self):
        self.client = authenticate_client()

    def analyse(self, text):
        response = self.client.analyze_sentiment(documents = [text])[0]
        print("Document Sentiment: {}".format(response.sentiment))
        print("Overall scores: positive={0:.2f}; neutral={1:.2f}; negative={2:.2f} \n".format(
            response.confidence_scores.positive,
            response.confidence_scores.neutral,
            response.confidence_scores.negative,
        ))
        return(response.confidence_scores.positive,
            response.confidence_scores.neutral,
            response.confidence_scores.negative)