"use strict";

//TODO  🟦 Module 7 - DOM Manipulation: Lesson 07. Traversing The DOM - All Nodes


//* Up to now (Lessons 05–06) you have worked with elements only:
//  • .children
//  • .firstElementChild
//  • .nextElementSibling
//  • .closest()

//* In this lesson, you go one level deeper and learn to traverse all nodes, not just elements. That includes:
//  • Element nodes (<section>, <li>, <button>, …)
//  • Text nodes (whitespace, text between tags)
//  • Comment nodes
//  Understanding this explains why some DOM APIs behave strangely when there is whitespace, and how to inspect and reason about the actual node tree that the browser sees.

//TODO Step 1. Node vs Element

//* In the DOM:
//  • Node is the generic type: everything in the tree is a node.
//      • Elements
//      • Text
//      • Comments
//      • The document itself
//  • Element is a specific kind of node (HTML elements, SVG elements, etc.).
//  You     have already used Element APIs (e.g. element.children, element.classList).

//  For all nodes, the core interface is Node.

//* Common node types (constants on Node):
//  • Node.ELEMENT_NODE → 1
//  • Node.TEXT_NODE → 3
//  • Node.COMMENT_NODE → 8
//  • Node.DOCUMENT_NODE → 9

//* Each node has:
//  • nodeType → number (1, 3, 8, 9, …)
//  • nodeName → 'DIV', '#text', 'BODY', etc.
//  • nodeValue → mostly used for text or comment nodes. For elements it is usually null.

//TODO  Step 2. Element-only vs All-node Traversal

//* You already know the element-only properties:
//  • firstElementChild
//  • lastElementChild
//  • nextElementSibling
//  • previousElementSibling
//  • children

//* The all-node equivalents are:
//  • firstChild
//  • lastChild
//  • nextSibling
//  • previousSibling
//  • childNodes

//? 2.1 children vs childNodes

const tasksList = document.querySelector("#section4 .tasks");

console.log(tasksList.children);                                    //  HTMLCollection (elements only)
console.log(tasksList.childNodes);                                  //  NodeList (elements, text, comment nodes)

//  • children
//      • HTMLCollection
//      • Only element nodes.
//  • childNodes
//      • NodeList
//      • Includes:
//          • Element nodes
//          • Text nodes (often whitespace / line breaks)
//          • Comment nodes, if any

//  This is why you sometimes see “extra nodes” when logging childNodes—those are usually text nodes caused by formatting/whitespace in the HTML.

//? 2.2 firstElementChild vs firstChild

const section4 = document.querySelector("#section4");

console.log(section4.firstElementChild);                            //  first child element (likely the <h1>)
console.log(section4.firstChild);                                   //  could be a text node, depending on whitespace

//  • firstElementChild → ignores text and comments; returns first element or null.
//  • firstChild → could be a text node if the element begins with whitespace or line breaks.

//? 2.3 nextElementSibling vs nextSibling

const firstTask = document.querySelector("#section4 .tasks .task");

console.log(firstTask.nextElementSibling);                          //  next <li.task>
console.log(firstTask.nextSibling);                                 //  might be a text node (whitespace) before the next <li>

//  • nextElementSibling → always an element or null.
//  • nextSibling → could be a text node, comment, or element.

//TODO Step 3. Inspecting Node Types

//  Use nodeType, nodeName, and nodeValue to understand what you are looking at.

//! Example:

function describeNode(node) {
    console.log({
        nodeType: node.nodeType,
        nodeName: node.nodeName,
        nodeValue: node.nodeValue,
    });
}

const h1 = document.querySelector("#section4 h1");

describeNode(h1);                                                   // ELEMENT_NODE → nodeType 1, nodeName "H1", nodeValue null
describeNode(h1.firstChild);                                        // likely TEXT_NODE → nodeType 3, nodeName "#text", nodeValue = text

//  You can also compare against constants:

if (node.nodeType === Node.TEXT_NODE) {
    //  handle text
}

if (node.nodeType === Node.ELEMENT_NODE) {
    //  handle element
}

//TODO Step 4. Filtering NodeLists by Type

//  When you use childNodes, you often want to filter by type.

//! Example: get only element children via childNodes:

const tasksList = document.querySelector("#section .tasks");
const allNodes = tasksList.childNodes;

const elementChildren = Array.from(allNodes).filter(
    (node) => node.nodeType === Node.ELEMENT_NODE
);

console.log(elementChildren);                                       //  behaves like tasksList.children

//  Filter text nodes only:

const textNodes = Array.from(allNodes).filter(
    (node) = node.nodeType === Node.TEXT_NODE
);

console.log(textNodes);

//  Sometimes you may want to ignore “empty” text nodes (only whitespace):

const nonEmptyTextNodes = textNodes.filter(
    (node) => node.nodeValue.trim() !== ""
);


//TODO  Step 5. Guided Practice – Using Your Current HTML (Lesson 06 Structure)

//  Work in a new Lesson 07 folder:
//  • Copy your Lesson 06 index.html and style.css.
//  • Keep the same structure: nav, tasks, cards grid, buttons.
//  • Link a fresh app.js for Lesson 07 only.
//  In Lesson 07 app.js, implement the following tasks.

//? Task 1 – Compare children vs childNodes

//  Observe which ones are #text nodes (whitespace) and which are LI.

//? Task 2 – firstChild / lastChild vs firstElementChild / lastElementChild

//  Look in DevTools console and see how whitespace can become #text nodes.

//? Task 3 – nextSibling vs nextElementSibling

//  This shows you exactly what lives between the <li> elements.

//? Task 4 – Helper: Describe a Node

//  This will help you build an intuition for node types and structure.

//? Task 5 – Filter Only LI Nodes with childNodes

//  This is similar to what you did in Lesson 05, but now done via childNodes + filtering instead of using children directly.


//TODO  6. Reflection & Checkpoint

//  You can answer these in your study journal; you do not need to send them unless you want feedback.

























