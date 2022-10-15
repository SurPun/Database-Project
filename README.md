# Week 2: Database
### By: Alex, Abby, Manoela & Suraj

A music sharing app where you can share your favourite songs for your friends!
This project is created with node.js

Have a look and post at [Heroku](https://songs-r.herokuapp.com/)

## Setup
Make sure you have Git and Node (v18) installed.

1. Clone this repo and cd into the directory

2. Run `npm install` to install all the dependencies

3. Run `npm run dev` to start the server. Run `npm run dev-win` if using Windows.

4. Run `npm run seed` to create the database. Run `npm run seed-win` if using Windows.

This uses the nodemon library to auto-restart the server when you save changes.

## Test

`npm run test:1`

- To test in Windows run:

`npm run test:1-win`


## User stories

### Core

- [x] As a friendly user I want to post a song that I like for anyone to see
- [x] As a curious user I want to see other people's favourite songs they posted about

Stretch goal: 
- [ ] As a selfish user, I want to filter by user so I can see a collection of one person's favourite songs
- [ ] As an organised user, I want to sort all posted songs by rating

## Schema

Our database contains two tables.
1. Users - contains the usernames of everyone who has posted their favourite song so far
2. Music - a list of all songs posted

The two tables follow the schema as shown below

![Screenshot 2022-10-02 at 22 27 11](https://user-images.githubusercontent.com/88027905/193477012-c14b9834-05e5-4607-8fe8-d8202a725f7a.png)


Example database:

![image](https://user-images.githubusercontent.com/78558945/193078912-c04de113-cd6e-437f-a480-4ab356d8a250.png)

![image](https://user-images.githubusercontent.com/78558945/193079057-31f81d05-375e-43e7-920f-2603597333fd.png)

## Acceptance Criteria

- [x] A form for users to submit data
- [x] A page showing all the data
- [x] Semantic form elements with correctly associated labels
- [x] A SQLite database
- [x] A schema describing your database in your README
- [x] Tests for server routes and database access
- [ ] Not process user input as SQL commands
- [x] Hidden environment variables (i.e. not on GitHub)
