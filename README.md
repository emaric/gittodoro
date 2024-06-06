# Gittodoro

A GitHub Issue progress tracker utilizing the Pomodoro technique.

## Mission

1. Enhance user productivity through the Pomodoro technique.
2. Measure productivity using Pomodoro durations as a unit.
3. Track task notes per GitHub issue.
4. Provide closer time estimates for GitHub issues.

## How the App Works

### As a Simple Todo List Tracker

1. Users can type in tasks to focus on.
2. Start sessions by clicking a button.
3. The app notifies users of their current round in the session.
   - Three states for each round:
     - **<span style="color:tomato">Pomodoro</span>**: Focus or work round.
     - **<span style="color:rgb(85, 194, 135)">Short</span>**: Short break round.
     - **<span style="color:rgb(71, 189, 255)">Long</span>**: Long break round.
4. Users can stop sessions once tasks are done.

### As a GitHub Issues Tracker

1. Users can log in with their GitHub account to fetch a list of issues to associate with sessions.
2. Alternatively, users can input the link to an issue.
3. GitHub issues can contain multiple tasks, and users can select tasks to associate with sessions.

### As a Performance Analysis Tool

1. The app analyzes session data to provide insights on task completion times using the Pomodoro technique.
2. Helps users make more accurate time estimates for future issues.

## Clean Architecture

![The Clean Architecture](./docs/CleanArchitecture.jpg)

This project follows the principles of Clean Architecture by Uncle Bob.

## License

[MIT](LICENSE)

## Cloning the Repository

Include submodules when cloning:

```sh
git clone --recursive git@github.com-emaric:emaric/gittodoro.git
```
