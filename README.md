# Kaiwa

![Build Status](https://codeship.com/projects/411fac90-122d-0135-959f-3611331b8dcf/status?branch=master)
![Code Climate](https://codeclimate.com/github/kisaraofpern/kaiwa-react.png)

http://anikai.herokuapp.com/

<p>Kaiwa was started as the capstone project for the coding bootcamp Launch Academy, which is based in Boston. The goal was to create something that was a combination of Netflix's viewing history feature and Tinder Social. The app is powered by the AniList API, includes information such as titles in multiple languages, image URLs, and descriptions. A specially designed algorithm was created to match users based on their viewing history, and Action Cable is used to enable users to chat with one another.</p>

<p>This is a work in progress. I would like to continue to build out features such as modal notifications for various events (e.g., notification of email confirmation) as well as visual notifications indicating new messages.</p>

## Getting Started
<p>This app is built on a Rails framework with a ReactJS frontend. Because it uses Action Cable, the user must have Redis installed in order for the app to run on his or her local machine.</p>

<p>Run the following commands to get started.</p>

Terminal window #1: </br>
`$ brew install redis` </br>
`$ redis-server` </br>
</br>
Terminal window #2: </br>
`$ npm start` </br>
</br>
Terminal window #3: </br>
`$ rails s`
