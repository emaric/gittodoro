# Gittodoro

A Github Issue progress tracker using the pomodoro technique.

## Mission

1. Help the user be productive by utilizing the pomodoro technique.
1. Help the user measure their productivity using the defined pomodoro duration as a unit.
1. Help the user keep track of Task Notes per GitHub Issue.
1. Help the user have a closer time estimates for GitHub Issues.

## How the app works

1. The app can be used as a simple Todo List Tracker app.

   1. The user can type in the task they want to focus on.
   1. The user can start the session by clicking on a button.
   1. The app will notify the user on which round they are in the session.
      1. There are 3 states for each round:
         1. <span style="color:tomato">Pomodoro</span> for the focus or work round.
         1. <span style="color:rgb(85, 194, 135)">Short</span> for the short break round.
         1. <span style="color:rgb(71, 189, 255)">Long</span> for the long break round.
   1. Once the task is done, the user can click a button to stop the session.

1. The app can be used as a Github Issues Tracker app.

   1. The user can login with their Github account to get the list of Issues they can associate with their session.
   1. Or the user can just input the link to the issue.
   1. Github Issues can contain multiple tasks. The user can select the task that they want to associate the session to.

1. The app can be used as a performance analysis tool using the data from the sessions that the user completes. The aim is for the user to gain insights on how long they can address issues or finish tasks using the pomodoro technique. This will also help them have a more accurate time estimates for future issues.

## Clean Architecture

![The Clean Architecture](./docs/CleanArchitecture.jpg)

This project will be following the principles of Clean Architecture by Uncle Bob.


## License

[MIT](LICENSE)
