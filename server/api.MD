# hacktivOverflow API Documentation


## /signin and signup

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/signin`     | POST    | Sign in |          |  email:String, password: String                               |
| `/signup` | POST    | Create new User |     | name:String, email: String, password: String                                 |


## /question

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/questions`     | GET    | Get all questions      |          |                                  |
| `/questions/:id`     | GET    | Get a specific question based on its id      |          |                                  |
| `/questions/usersQuestion`     | GET    | Get questions posted by logged in user   |token          |                                  |
| `/questions`     | POST    | Create a new question   |token          |  title:String, description:String                                |
| `/questions/:id`     | DELETE    | Delete a specific question based on its id   |token          |                                  |
| `/questions/:id`     | PATCH    | Update a specific question based on its id   |token          |  title:String, description:String                                |
| `/questions/upvote/:id `| PATCH | Update upvote field of a question based on its id |  token||
| `/questions/downvote/:id `| PATCH |Update downvote field of a question based on its id | token ||
| `/questions/removeUpvoteOrDownvote/:id `| PATCH |remove upvote or downvote | token ||

## /answer


| Route            | HTTP   | Description                      | Header(s) |Body     |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/answers/:questionId`     | GET    | Get all answer to a specific question   |          |                           |
| `/answers/:questionId`     | POST    | Create an answer that references to a specific question based on the question's id          |token          | title:String, description:String                          |
| `/answers/usersAnswer`     | GET    | Get all answer created by users           |token          |                           |
| `/answers/:id `| DELETE |remove an answer based on its id | token ||
| `/answers/:id `| PATCH | Update an answer based on it's id| token |title:String, description:string
| `/answers/upvote/:id `| PATCH | Update upvote field of an answer based on its id | token||
| `/answers/downvote/:id `| PATCH |Update downvote field of an answer based on its id | token ||
| `/answers/removeUpvoteOrDownvote/:id `| PATCH |remove upvote or downvote | token ||

