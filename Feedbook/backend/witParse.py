import random
from .models import Feed
import logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

#intents
RECORD = "record"
LASTFEED = "last_feed"
FEEDONDAY = "feed_on_day"
UPDATE = "update"

#entities
FEED = "feed:feed"
BABYNAME = "name:name"
FOOD = "food:food"
MASS = "mass:mass"
DATETIME = "wit$datetime:datetime"
VOLUME = "wit$volume:volume"

"""
    {
  "entities": {
    "feed:feed": [
      {
        "body": "Jenny 200ml milk today at 3pm",
        "confidence": 0.999,
        "end": 36,
        "entities": {
          "food:food": [
            {
              "body": "milk",
              "confidence": 1,
              "end": 16,
              "entities": {},
              "id": "3859626224324392",
              "name": "food",
              "role": "food",
              "start": 12,
              "type": "value",
              "value": "milk"
            }
          ],
          "name:name": [
            {
              "body": "Jenny",
              "confidence": 1,
              "end": 5,
              "entities": {},
              "id": "1794548197697682",
              "name": "name",
              "role": "name",
              "start": 0,
              "type": "value",
              "value": "Jenny"
            }
          ],
          "wit$datetime:datetime": [
            {
              "body": "today at 3pm",
              "confidence": 1,
              "end": 29,
              "entities": {},
              "grain": "hour",
              "id": "974577907032177",
              "name": "wit$datetime",
              "role": "datetime",
              "start": 17,
              "type": "value",
              "value": "2024-05-01T15:00:00.000-07:00",
              "values": [
                {
                  "grain": "hour",
                  "type": "value",
                  "value": "2024-05-01T15:00:00.000-07:00"
                }
              ]
            }
          ],
          "wit$volume:volume": [
            {
              "body": "200ml",
              "confidence": 1,
              "end": 11,
              "entities": {},
              "id": "406586432126976",
              "name": "wit$volume",
              "role": "volume",
              "start": 6,
              "type": "value",
              "unit": "millilitre",
              "value": 200
            }
          ]
        },
        "id": "756832312921778",
        "name": "feed",
        "role": "feed",
        "start": 7,
        "suggested": true,
        "type": "value",
        "value": "Jenny 200ml milk today at 3pm"
      }
    ]
  },
  "intents": [
    {
      "confidence": 0.9999699601613475,
      "id": "965062758497750",
      "name": "record"
    }
  ],
  "text": "I gave Jenny 200ml milk today at 3pm",
  "traits": {}
}%                
"""

examples = [
    "Please record that I fed my baby Rickie with 200ml milk today at 2pm",
    "What did my girl Jingling eat last Friday?",
    "When was the last time that my boy Jason ate?",
    "Did I give Tina food this afternoon?"
    "When was the last time that Alex drink water?",
    "Do I have to provide food to my children?",
]

recordSuccess = [
    "Is it weird that a baby's menu is making me hungry? Asking for a friend...",
    "Whoa, gourmet baby alert! Should I be taking notes for my own dinner?",
    "Jealous of that meal! Do you think the baby would notice if we swapped plates?",
    "Oh la la! Someone's dining in style today. Save some for me next time, will ya?",  
    "That menu's hotter than a teething ring in July! Can I get a reservation at this exclusive dining table?",
    "Dish it out, little chef! That meal could make a spoon stand up straight with excitement.",
    "Keep those yummy updates coming! I'm compiling a 'Baby's Best Bites' list and that's definitely going on it.",
    "Heard the latest foodie trend? It's whatever your baby's having. Too delicious!",
    "That sounds better than my last takeout. Any chance your baby is open to dinner guests?",
    "I want to be your kid and eat this everyday, can you adopt me?",
] 


class parseMessage:
    def __init__(self, res):
        self.intents = res["intents"]
        self.entities = res["entities"]
        self.traits = res["traits"]
        self.res = res
        
        
    def parse(self):
        try:
            if len(self.intents) == 0:
                random.shuffle(examples)
                return f"""
                Sorry, we are having trouble processing your prompt, here are some prompt examples that you may want to use: \n
                1. {examples[0]} \n
                2. {examples[1]} \n
                3. {examples[2]} \n
                """
            elif self.intents[0]["name"] == RECORD:
                return self.recordEntry()
        except Exception as e:
            logging.error("error in parseMessage")
            
    
    def recordEntry(self):
        try:
            feedEntities = self.entities.get(FEED)
            for feed in feedEntities:
                feed = feed.get("entities")
                babyname = feed.get(BABYNAME)
                food = feed.get(FOOD)
                volume = feed.get(VOLUME)
                mass = feed.get(MASS)
                datetime = feed.get(DATETIME)
                if(babyname is None): return "oops, who ate this? I, Feedbook, is very organized and detailed about everything! I need to know your baby name to keep them on file :)"
                if(food is None): return "oops, what did your baby eat exactly? oh no please don't tell me you already forgot. I need to know what the baby ate to keep them healthy"
                if(datetime is None): return "oops, when did your baby eat this? As a book, I'm not intelligent enough and I can't record this if you didn't tell me this :("
                
                babyname = babyname[0].get("value")
                food = food[0].get("value")
                volume = volume[0].get("value") if volume is not None else ""
                mass =  mass[0].get("value") if mass is not None else ""
                datetime = datetime[0].get("value")
                
                random.shuffle(recordSuccess)
                instance = Feed(babyName = babyname, food = food, mass = mass, volume = volume, time = datetime, userid = 1)
                instance.save()
                pageNumber = random.randint(1, 100)
            return f"Got it on Page {pageNumber}! \n {recordSuccess[0]}"
        except Exception as e:
            logging.error("error in recordEntry")
    
        
    #def storeFeedRecord(self):

            

