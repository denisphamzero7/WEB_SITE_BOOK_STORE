from flask import Flask, jsonify, json, request
import time
import numpy as np
import pandas as pd
import pymongo
import csv
import xxhash
from Collaborative import *
from CB import *

start_time = time.time()
app = Flask(__name__)

myclient = pymongo.MongoClient("mongodb+srv://haudaipro:haudaipro123@booksdb.4ope72n.mongodb.net/bookapp")
mydb = myclient["bookapp"]
mycol = mydb["products"]
myCustomers = mydb["users"]
myCategories = mydb["bookcategories"]
reverse_mapping = {}
userList = []
itemList = []

print("Number of items loaded from MongoDB:", mycol)
print("Number of users loaded from MongoDB:", myCustomers)
n_items = mycol.count_documents({})
n_users = myCustomers.count_documents({})
n_category = myCategories.count_documents({})

print("Số lượng mục được tải từ MongoDB:", n_items)
print("Số lượng người dùng được tải từ MongoDB:", n_users)
print("Số lượng loại dùng được tải từ MongoDB:", n_category)

##### START Pre-processing data

# Hash from uuid -> int
def hash_string(input_string):
    hasher = xxhash.xxh32()
    hasher.update(input_string.encode())
    hashed_value = hasher.intdigest()
    if hashed_value not in reverse_mapping:
        reverse_mapping[hashed_value] = input_string
    return hashed_value

# Reverse hash from int -> uuid
def get_hash_original(hash):
    return reverse_mapping.get(hash)

### START Pre-processing have rating user data
r_cols = ['user_id', 'product_id', 'rating']
# rating user
csvHeaderRating = ["product_id", "title"]
itemCategoryList = {}
categoryCount = 0
for product in myCategories.find():
    itemCategoryList[product["title"]] = categoryCount
    categoryCount += 1
with open('./products.csv', 'w', encoding='UTF8') as f:
    f.truncate()
    with open("./ratings.csv", 'w', encoding='UTF8') as ratingFile:
        ratingFile.truncate()
        for x in mycol.find():
            productId = str(hash_string(str(x["_id"])))
            categoryList = [0] * categoryCount
            for category in x["bookcategory"]:
                if category in itemCategoryList:
                    categoryList[itemCategoryList[category]] = 1
            categories = "|".join(str(categoryTitle) for categoryTitle in categoryList)
            row = productId + "|" + str(x["title"]) + "|" + categories + "\n"
            itemList.append(productId)
            f.write(row)
            # write ratings
            for review in x["rating"]:
                ratingUser = str(hash_string(str(review["postedBy"])))
                ratingFile.write(ratingUser + "\t" + productId + "\t" + str(review["start"]) + "\n")
        ratingFile.close()
    f.close()
with open("./users.csv", 'w', encoding='UTF8') as f:
    f.truncate()
    pre_rating = pd.read_csv('./ratings.csv', sep='\t', names=r_cols, encoding='latin-1')
    for customer in myCustomers.find():
        customerId = str(hash_string(str(customer["_id"])))
        if pre_rating["user_id"].eq(int(customerId)).any():
            userList.append(customerId)
            f.write(customerId + "|" + str(customer["email"]) + "\n")
    f.close()

### END Pre-processing have rating user data
    
### START Pre-processing product doesn't have history of rating

# non-rating user
csvHeaderNonRating = ["productid", "title", "genres"]
with open('./nonproducts.csv', 'w', encoding='UTF8') as f:
    f.truncate()
    f.write(",".join(csvHeaderNonRating) + "\n")
    for x in mycol.find():
        categories = "|".join(x["bookcategory"])
        # Ensure proper formatting with quotes if there are any commas in the data
        row = f'{str(hash_string(str(x["_id"])))},"{str(x["title"])}","{categories}"\n'
        print(f"Writing row: {row.strip()}")
        f.write(row)
    f.close()

### END Pre-processing product doesn't have history of rating

##### END Pre-processing data

# Load user data
u_cols = ['user_id', 'username']
users = pd.read_csv('./users.csv', sep='|', names=u_cols, encoding='latin-1', index_col="user_id")
n_users = users.shape[0]

# Load user rating data
ratings_base = pd.read_csv('./ratings.csv', sep='\t', names=r_cols, encoding='latin-1')
rate_train = ratings_base.values

# Load item data
i_cols = csvHeaderRating + list(itemCategoryList.keys())
items = pd.read_csv('./products.csv', sep='|', names=i_cols, encoding='latin-1', index_col="product_id")
n_items = items.shape[0]

# Initialize models
collaborativeModel = Collaborative(users=users, products=items, ratings=ratings_base)
collaborativeModel.fit()

X0 = items.values
X_train_counts = X0[:, -categoryCount:]

cbEntity = CB("./nonproducts.csv")
cbEntity.fit()

print('--- %s seconds ---' % (time.time() - start_time))

@app.route("/", methods=["GET"])
def index():
    userId = request.args.get('q')
    userIdHashed = hash_string(userId)
    predict = collaborativeModel.predict(int(userIdHashed), 4)
    print(predict)
    recommendList = []
    print('itemList:', itemList)
    for productIdHash in predict:
        print('productId:', productIdHash)
        recommendList.append(get_hash_original(int(productIdHash)))
    response = np.array(recommendList).tolist()
    return json.dumps({"response": response})

@app.route("/nonrating", methods=["GET"])
def nonrating():
    productId = request.args.get('q')
    productIdHashed = hash_string(productId)
    
    predict = cbEntity.genre_recommendations(items, productIdHashed, 4)
    recommendList = []
    for productIdHash in predict[1]:
        productId = get_hash_original(int(productIdHash))
        recommendList.append(productId)
        print(productId)
    response = np.array(recommendList).tolist()
    return json.dumps({"response": response})

app.run(port=5500)
