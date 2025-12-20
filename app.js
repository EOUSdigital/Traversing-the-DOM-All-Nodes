"use strict";

//TODO  Step 5. Guided Practice – Using Your Current HTML

//? Task 1 – Compare children vs childNodes

//  1. Select the “My Tasks” list in #section4:

const myTasksList = document.querySelector("#section4 .tasks");

if (myTasksList) {
    //  2. Log children and childNodes:
    
    console.log("children:", myTasksList.children);
    console.log("childNodes:", myTasksList.childNodes);
    
    //  3. Convert childNodes to an array and log each node’s nodeType and nodeName:
    
    const myTasksNodes = Array.from(myTasksList.childNodes);
    
    myTasksNodes.forEach((node, index) => {
        console.log(index, {
            nodeType: node.nodeType,
            nodeName: node.nodeName,
            nodeValue: node.nodeValue,
        });
    });
}

//? Task 2 – firstChild / lastChild vs firstElementChild / lastElementChild

//  1. Select #section4:

const section4 = document.querySelector("#section4");

if (section4 && myTasksList) {
    //  2. Log and compare:
    
    console.log("section4.firstChild:", section4.firstChild);
    console.log("section4.firstElementChild:", section4.firstElementChild);
    
    console.log("section4.lastChild:", section4.lastChild);
    console.log("section4.lastElementChild:", section4.lastElementChild);
    
    //  3. Repeat for the myTasksList:
    
    console.log("myTasksList.firstChild:", myTasksList.firstChild);
    console.log("myTasksList.firstElementChild:", myTasksList.firstElementChild);
}


//? Task 3 – nextSibling vs nextElementSibling

//  1. Select the first task:

const firstTask = document.querySelector("#section4 .tasks .task");

if (firstTask) {
    //  2. Log its siblings:
    
    console.log("firstTask.nextSibling:", firstTask.nextSibling);
    console.log("firstTask.nextElementSibling:", firstTask.nextElementSibling);
    
    console.log("firstTask.previousSibling:", firstTask.previousSibling);
    console.log("firstTask.previousElementSibling:", firstTask.previousElementSibling);
    
    //  3. If firstTask.nextSibling is a text node, log its nodeValue:
    
    if (firstTask.nextSibling && firstTask.nextSibling.nodeType === Node.TEXT_NODE) {
        console.log("Text after firstTask:", JSON.stringify(firstTask.nextSibling.nodeValue));
    }
}

//? Task 4 – Helper: Describe a Node

//  Create a small utility function:

function describeNode(label, node) {
    if (!node) {
        console.log(label, "→ null");
        return;
    }

    console.log(label, {
        nodeType: node.nodeType,
        nodeName: node.nodeName,
        nodeValue: node.nodeValue,
    });
};

//  Use it to describe various nodes:
if (section4) {
    describeNode("section4.firstChild", section4.firstChild);
    describeNode("section4.firstElementChild", section4.firstElementChild);
}

if (firstTask) {
    describeNode("firstTask.nextSibling", firstTask.nextSibling);
    describeNode("firstTask.nextElementSibling", firstTask.nextElementSibling);
}

//? Task 5 – Filter Only LI Nodes with childNodes

//  Recreate the equivalent of children using childNodes:

if (myTasksList) {    
    const liNodes = Array.from(myTasksList.childNodes).filter(
        (node) => node.nodeType === Node.ELEMENT_NODE && node.nodeName === "LI"
    );
        
    liNodes.forEach((li, index) => {
        li.textContent = `${index + 1} ${li.textContent}`;
    });
}

