# Developing Manga App (MangaSphere)

## Description of the App

A website that provides a platform for manga enthusiasts to discuss manga. Users can register for an account, log in, and browse the website's collection of manga. Once logged in, users can leave comments on manga pages.

The website also has a search function that allows users to find specific manga titles or genres.

My application is built using Node.js and Express for the backend, MongoDB for the database, and EJS for the frontend.

## Link for the App

https://mangasphere.cyclic.app/

## Screenshots of the App

![Homescreen](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/homepage.png?raw=true)
![MangaPage](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/mangapage.png?raw=true)
![LoginPage](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/loginpage.png?raw=true)

## Technologies & Tools Used

1. Javascript
2. CSS
3. EJS
4. VSCode
5. MongoDB
6. Cyclic (Deployment)

## Dependencies

1. bcrypt (Hashing Password)
2. connect-mongo (Create Session MongoDB)
3. express (backend)
4. node-fetch (3rd Party API)

## Wireframe/Storyboard

![Wireframe1](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/1.png?raw=true)

![Wireframe3](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/3.png?raw=true)

![Wireframe2](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/2.png?raw=true)

## Timeline for the Project

5 Working Days

## Planning & Development

1. EJS/CSS
2. Model(User,Review,Manga)
3. Routes (User, Manga)
4. Login/Registration
5. Session
6. CRUD
7. 3rd Party API
8. Authentication

## CRUD

### CREATE

![create](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/create.png?raw=true)

Posting a review as a logged in user.

### READ

![read](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/read.png?raw=true)

Getting manga data from the database and presenting it on the screen.

### UPDATE

![update](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/edit.png?raw=true)

Editting the review that the user previously post.

### DELETE

![delete](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/delete.png?raw=true)

Deleting the review.

## Data Model

![data](https://github.com/jeremyloh-hub/MangaSphere/blob/main/Notes/data.png?raw=true)

## Model Schema

```javascript
const mangaSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, minLength: 1 },
    synopsis: { type: String, required: true, minLength: 1 },
    author: [{ type: String, required: true, minLength: 1 }],
    picture: { type: String, required: true, minLength: 1 },
    chapters: { type: Number, default: null },
    volumes: { type: Number, default: null },
    status: {
      type: String,
      required: true,
      enum: ["Finished", "Publishing", "On Hiatus"],
    },
    genres: [{ type: String, required: true, minLength: 1 }],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const reviewSchema = new Schema(
  {
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    content: { type: String, required: true, minLength: 1 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    userid: { type: String, required: true, unique: true, minLength: 4 },
    password: { type: String, required: true, minLength: 4 },
  },
  { timestamps: true }
);
```

## Future Development

1. List for user to keep track of all the manga they are reading
2. App Testing
3. Better 3rd Party API that provide more manga
4. Display Recommendation based on what you like

## Key Takeaway

- Importance of planning out the model
- How to populate data within an embedded model & reading documentation

## References

3rd Party API

- https://docs.api.jikan.moe/

* https://myanimelist.net/

Connect-Mongo(Store session in database)

- https://github.com/jdesboeufs/connect-mongo

CSS

- https://watercss.kognise.dev/
