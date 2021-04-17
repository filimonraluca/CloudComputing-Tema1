from azure.cosmos import exceptions, CosmosClient, PartitionKey
import cosmos_credentials
from twitter_api import TwitterApi

# <create_cosmos_client>
client = CosmosClient(cosmos_credentials.ENDPOINT, cosmos_credentials.KEY)

# Create a database
# <create_database_if_not_exists>
database_name = 'TweetsDatabase'
database = client.create_database_if_not_exists(id=database_name)

# Create a container
# Using a good partition key improves the performance of database operations.
# <create_container_if_not_exists>
container_name = 'TweetsContainer'
container = database.create_container_if_not_exists(
    id=container_name, 
    partition_key=PartitionKey(path="/tweets"),
    offer_throughput=400
)

# Add items to the container
tweets_items_to_create = TwitterApi(2).get_tweets()

 # <create_item>
for tweet in tweets_items_to_create:
    container.create_item(body=tweet)