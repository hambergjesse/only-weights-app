# OnlyWeights

Welcome to the OnlyWeights project, an ultimate gym companion app designed to make workout routines easier and more efficient.

The app is built using React.js with TypeScript for the front-end and Node.js, Express.js and MongoDB with TypeScript for the back-end. The app has a user login/registration system using JWT localstorage tokens for authentication and bcrypt for password hashing.

Original UI design draft: [Adobe XD Link](https://xd.adobe.com/view/fa1cb241-9406-4c19-bd13-3817a28875bc-af4f/)

## User Guide

Installing dependencies

```sh
cd client
npm install

cd ..

cd server
npm install
```

Create .env file for the secret server stuff

```sh
cd server
type nul > .env
```

.env file (replace with your own values)

```sh
PORT=8000
MONGODB_URI="ENTER YOURS"
JWT_SECRET="ENTER YOURS"
```

Run/start server & client (separate terminals)

```sh
cd server
npm run dev
```

```sh
cd client
npm start
```

## Features To-Do List:

- [ ] **Workout creator:** Create custom workout plans tailored to your fitness level and goals.
- [ ] **Workout calendar:** Keep track of your progress and schedule your workouts in advance with the easy-to-use calendar feature.
- [ ] **Notebook feature:** Take notes on your progress, track your progress and record your personal bests.
- [ ] **BMI calculator:** Calculate your body mass index and see where you stand in terms of healthy weight range.
- [ ] **Calorie counter:** Keep track of the number of calories you consume and burn each day to ensure you're on the right track.
- [ ] **Protein recipes:** Learn how to make delicious and nutritious protein-rich meals that will help you reach your fitness goals.
- [ ] **Share workouts:** Share your workout plans with friends and family, or take inspiration from others.
- [ ] **Private messaging feature:** Communicate with friends and trainers in a private, secure environment.

## Dependencies worth mentioning

- axios
- react-icons

Last edited: 05/02/2023

I am a solo developer working on this project and I am working hard to bring all these features to life. I appreciate your patience and support. If you have any questions or feedback, please don't hesitate to reach out.
