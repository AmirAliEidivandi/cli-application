// app new
// app done
// app delete
// app list
const commands = ["new", "done", "delete", "list"];
const taskFileName = "tasks.json";
const fs = require("fs");
const prompt = require("prompt");
const colors = require("colors");

class TaskManager {
    constructor() {
        this.init();
    }
    tasks = [];
    init() {
        let taskFile = this.getOrCreateTaskFile();
        this.tasks = JSON.parse(taskFile);
    }

    getOrCreateTaskFile() {
        if (!fs.existsSync(taskFileName)) {
            fs.writeFileSync(taskFileName, JSON.stringify([]));
        }
        return fs.readFileSync(taskFileName, "utf-8");
    }

    printTasks() {
        this.tasks.map((task, index) => {
            if (task.done) {
                console.log(`${index} ${task.title}`.green);
            } else {
                console.log(`${index} ${task.title}`.yellow);
            }
        });
    }

    delete(taskIndex) {
        this.tasks.splice(taskIndex, 1);
        this.updateTaskFile();
    }

    setDone(taskIndex) {
        this.tasks[taskIndex].done = true;
        this.updateTaskFile();
    }

    createNewTask() {
        prompt.start();

        prompt.get(["task"], (err, result) => {
            let task = {
                title: result.task,
                timestamp: new Date().getTime(),
                done: false,
            };
            this.tasks.push(task);
            this.updateTaskFile();
        });
    }

    updateTaskFile() {
        fs.writeFile(taskFileName, JSON.stringify(this.tasks), function (err) {
            if (!err) {
                console.log("file update");
            }
        });
    }
}

module.exports = {
    commands,
    TaskManager,
};
