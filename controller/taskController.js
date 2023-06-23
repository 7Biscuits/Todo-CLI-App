import inquirer from "inquirer";
import fs from "fs";

const addTask = (commandPrompt) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the task title:",
        validate: (input) => {
          if (input.trim() !== "") {
            return true;
          }
          return "Please enter a valid title.";
        },
      },
    ])
    .then((answers) => {
      fs.readFile("db.json", "utf8", (err, fileData) => {
        if (err) return console.log(err);
        else {
          const tasks = JSON.parse(fileData);
          tasks.tasks.push(answers.title);
          fs.writeFile("db.json", JSON.stringify(tasks), "utf-8", (err) => {
            if (err) return console.log(err);

            console.log("Task added successfully");
          });
        }
      });
      console.log("Task added successfully!");
      commandPrompt();
    });
};

const listTasks = (commandPrompt) => {
  console.log("Tasks:");
  fs.readFile("db.json", "utf-8", (err, fileData) => {
    if (err) return console.log(err);

    const tasks = JSON.parse(fileData);
    if (tasks.tasks.length === 0) {
      console.log("No tasks to show");
      return commandPrompt();
    }
    tasks.tasks.forEach((element, index) => {
      console.log(`${index + 1}. ${element}`);
    });

    commandPrompt();
  });
};

const removeTask = (commandPrompt) => {
  fs.readFile("db.json", "utf-8", (err, fileData) => {
    if (err) return console.log(err);

    const tasks = JSON.parse(fileData);
    if (tasks.tasks.length === 0) {
      console.log("No tasks to remove");
      return commandPrompt();
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "taskIndex",
          message: "Select the task to remove:",
          choices: tasks.tasks.map((task, index) => `${index + 1}. ${task}`),
        },
      ])
      .then((answers) => {
        const index = parseInt(answers.taskIndex.split(".")[0]) - 1;
        tasks.tasks.splice(index, 1);
        fs.writeFile("db.json", JSON.stringify(tasks), "utf8", (err) => {
          if (err) return console.log(err);
        });
        console.log("Task removed successfully!");
        commandPrompt();
      });
  });
};

export { addTask, listTasks, removeTask };