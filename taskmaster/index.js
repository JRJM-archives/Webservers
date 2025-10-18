#!/usr/bin/env node

// export PATH=$PATH:/c/Users/crazy/AppData/Roaming/npm


const { Command } = require("commander")

const fs = require('fs')
const FILE = './data.json'
let data = {}


const program = new Command();
const add = program.command("add <task>").description('Adds a task with a priority level')
const list = program.command("list").description("Displays list of tasks")

const taskList = [];
let taskMap = new Map();

// add task with priority level and ID --->  key(task):value(priority)
// have remove, get, clear commands

program.name('taskmaster').description("Task management system").version("1.0.0");
add
    .option('-p, --priority <level>', 'Set to low, med, high, whatever')
    .action((task, priority) => { 
        addTask(task, priority.priority) 
    })

list
    .action(() => {
        printTasks(taskMap)
    })

function getKeyByValue(map, value) {
    for(const [k, v] of map) {
        if(v == value) return k;
    }

    return undefined;
}

function readFile(FILE) {
    //read the json file and             
    if (fs.existsSync(FILE)) { 
        data = JSON.parse(fs.readFileSync(FILE, 'utf8'))
        
        for(const [key, value] of data) {
            taskMap.set(key, value)
        }
        
    }
}

function saveFile(taskMap) {
    fs.writeFileSync(FILE, JSON.stringify([...taskMap], null, 2))
}

function addTask(task, priority) {
        readFile(FILE)
        taskMap.set(task, priority) 
        

        //data += JSON.stringify(obj)
        saveFile(taskMap)
    
        console.log(`Added task: ${task} with priority: ${priority || 'none.'}`)
}

function getTask(taskID) {
    //need to get from json file by reading the file 
    return console.log("Task : " + taskMap.get(getKeyByValue(taskMap, taskID)))
}

function printTasks() {
    readFile(FILE)
    
    for(const [key, value] of taskMap) {
        console.log(`Task : ${key} | | Priority : ${value}`)
    }
}

function clearTask(taskID) {

}

function removeTask(taskID) {
     
}


    
program.parse(process.argv)
