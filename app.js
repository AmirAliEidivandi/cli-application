// app new
// app done
// app delete
// app list
const commands = require("./taskManager").commands;
const TaskManager = require("./taskManager").TaskManager;
const colors = require("colors");

let command = process.argv[2];

if (commands.indexOf(command) === -1) {
    console.log("Command is not validation".red);
}

const taskManager = new TaskManager();

let taskIndex;

switch (command) {
    case "new":
        taskManager.createNewTask();
        break;
    case "list":
        taskManager.printTasks();
        break;
    case "delete":
        taskIndex = process.argv[3];
        taskManager.delete(taskIndex);
        break;
    case "done":
        taskIndex = process.argv[3];
        taskManager.setDone(taskIndex);
        taskManager.printTasks();
        break;
}
