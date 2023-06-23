import inquirer from "inquirer";
import { addTask, listTasks, removeTask } from "./controller/taskController.js";

const commandPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "command",
        message: "What would you like to do?",
        choices: ["Add a task", "List all tasks", "Remove a task", "Exit"],
      },
    ])
    .then((answers) => {
      switch (answers.command) {
        case "Add a task":
          addTask(commandPrompt);
          break;
        case "List all tasks":
          listTasks(commandPrompt);
          break;
        case "Remove a task":
          removeTask(commandPrompt);
          break;
        case "Exit":
          console.log("Exiting Todo List");
          break;
        default:
          console.log("Invalid command");
      }
    });
};

console.log("Welcome to Todo List");
commandPrompt();