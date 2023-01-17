# blog_system

[brew services start mongodb-community]

use nodeblog
switched to db nodeblog
nodeblog> show dbs
admin               40.00 KiB
config              84.00 KiB
local               72.00 KiB
user_login_system  108.00 KiB
userdb              40.00 KiB
usersdb             60.00 KiB
nodeblog> db.createCollection('posts');
{ ok: 1 }
nodeblog> db.createCollection('categories');
{ ok: 1 }
nodeblog> show collections
categories
posts
nodeblog> db.posts.insert({title: "Blog Post One", category: "Technology", author: "My Name", body: "This is the body", date:ISODate() })
DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.
{
  acknowledged: true,
  insertedIds: { '0': ObjectId("63c6fe128cbf1d0f2a21552c") }
}
nodeblog> db.posts.find().pretty()
[
  {
    _id: ObjectId("63c6fe128cbf1d0f2a21552c"),
    title: 'Blog Post One',
    category: 'Technology',
    author: 'My Name',
    body: 'This is the body',
    date: ISODate("2023-01-17T19:59:14.748Z")
  }
]
nodeblog> db.posts.insert({title: "Blog Post Two", category: "Fashion", author: "Your Name", body: "This is the body for a fashion post", date:ISODate() })
{
  acknowledged: true,
  insertedIds: { '0': ObjectId("63c6fe768cbf1d0f2a21552d") }
}
nodeblog> db.posts.find().pretty()
[
  {
    _id: ObjectId("63c6fe128cbf1d0f2a21552c"),
    title: 'Blog Post One',
    category: 'Technology',
    author: 'My Name',
    body: 'This is the body',
    date: ISODate("2023-01-17T19:59:14.748Z")
  },
  {
    _id: ObjectId("63c6fe768cbf1d0f2a21552d"),
    title: 'Blog Post Two',
    category: 'Fashion',
    author: 'Your Name',
    body: 'This is the body for a fashion post',
    date: ISODate("2023-01-17T20:00:54.281Z")
  }
]
