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

//! Feedback:

//  You structured the lesson exactly as intended; the issues are mostly small but important details: variable shadowing, typos, and one unnecessary dependency in Task 5.

//  I will walk through your code task by task, show what is wrong, why, and then give you a clean corrected version at the end.

//? Task 1 – children vs childNodes

//  Your code:

const myTasksList = document.querySelector("#section4 .tasks");

if (myTasksList) {
    console.log("children:", myTasksList.children);
    console.log("childNodes:", myTasksList.childNodes);
    
    const myTasksList = Array.from(myTasksList.childNodes);
    
    myTasksNodes.forEach((node, index) => {
        console.log(index, {
            nodeType: node.nodeType,
            nodeName: node.nodeName,
            nodeValue: node.nodeValue,
        });
    });
}

//! Issues:

//  1. You redeclare myTasksList inside the if block:

const myTasksList = Array.from(myTasksList.childNodes);

//  • You already declared const myTasksList outside the if.
//  • Inside the same block, you cannot declare another const with the same name.
//  • Even conceptually, you don’t want to replace the element with an array.

//  2. You use myTasksNodes without ever defining it:

myTasksNodes.forEach((node, index) => {})

//  • There is no myTasksNodes variable defined.

// ! Corrected version:
//  Use a different variable name for the array:

const myTasksList = document.querySelector("#section4 .tasks");

if (myTasksList) {
    console.log("children:", myTasksList.children);
    console.log("childNodes:", myTasksList.childNodes);

    const myTasksNodes = Array.from(myTasksList.childNodes);

    myTasksNodes.forEach((node, index) => {
        console.log(index, {
        nodeType: node.nodeType,
        nodeName: node.nodeName,
        nodeValue: node.nodeValue,
        });
    });
}

//  Key idea:
//  • Keep myTasksList as the DOM element.
//  • Use a new variable (e.g. myTasksNodes) for the array of nodes.

//? Task 2 – firstChild / lastChild vs firstElementChild / lastElementChild

//  Your code:

const section4 = document.querySelector("#section4");

if (section4) {
    console.log("section4.firstChild:", section4.firstChild);
    console.log("section4.firstElementChild:", section4.firstElementChild);
    
    console.log("section4.lastChild:", section4.lastChild);
    console.log("section4.lastElementChild:", section4.lastElementChild);
    
    console.log("myTasksList.firstChild:", myTasksList.firstChild);
    console.log("myTasksList.firstElementChild:", myTasksList.firstElementChild);
}

//  Notes
//  • This is mostly fine, assuming myTasksList was successfully selected earlier.
//  • Because myTasksList is defined outside the if, it is visible here.
//  • If myTasksList could be null, you should guard it, but in your HTML it exists, so it is safe.
//  • If you want to be defensive:

if (section4 && myTasksList) {
  // logs...
}

Conceptually, you are doing exactly what the task asked.

//? Task 3 – nextSibling vs nextElementSibling

//  Your code:

const firstTask = document.querySelector("#section4 .tasks .task");

if (firstTask) {
    console.log("firstTask.nextSibling:", firstTask.nextSibling);
    console.log("firstTask.nextElementSibling:", firstTask.nextElementSibling);
    
    console.log("firstTask.previousSibling:", firstTask.previousSibling);
    console.log("firstTask.previousElementSibling:", firstTask.previousElementSibling);
    
    if (firstTask.nextSibling && firstTask.nextSibling.nodeType === Node.TEXT_NODE) {
        console.log("Text after firstTask:", JSON.stringify(firstTask.nextSibling.nodeValue));
    }
}

//  This is spot on:
//  • You are logging both node-level and element-level siblings.
//  • You correctly check nodeType === Node.TEXT_NODE and then log nodeValue.
//  No corrections needed here.

//? Task 4 – describeNode helper

//  Your code:

function describeNode(label, node) {
    if (!node) {
        console.log(label, "→ null");
        return;
    }

    console.log(label, {
        nodeType: node.nodeType,
        nodeName: nodeName,
        nodeValue: node.nodeValue,
    });
};

describeNode("section4.firstChild", section4.firstChild);
describeNode("section4.firstElementChild", section4.firstElementChild);

describeNode("firstTask.nextSibling", firstTask.nextSibling);
describeNode("firstTask.nextElementSibling", firstTask.nextElementSibling);

//! Issues

//  1. Typo in the property access:
nodeName: nodeName,

//*  There is no variable nodeName in this scope.

//  You want the property on the node:
nodeName: node.nodeName,

//  2. Minor robustness consideration: if section4 or firstTask were null, these calls would throw. In your HTML they exist, so practically you are safe, but good practice would be:

if (section4) {
    describeNode("section4.firstChild", section4.firstChild);
    describeNode("section4.firstElementChild", section4.firstElementChild);
}

if (firstTask) {
    describeNode("firstTask.nextSibling", firstTask.nextSibling);
    describeNode("firstTask.nextElementSibling", firstTask.nextElementSibling);
}

//! Corrected helper

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
}

//? Task 5 – Filter only <li> nodes with childNodes

//  Your code:

const featuredCard = document.querySelector('.card.featured');

if (featuredCard) {
    const grid = featuredCard.closest('.grid');
    
    if (grid) {
        const liNodes = Array.from(myTasksList.childNodes).filter(
            (node) => node.nodeType === Node.ELEMENT_NODE && node.nodeName === "LI"
        );
        
        liNodes.forEach((li, index) => {
            li.textContent = `${index + 1} ${li.textContent}`;
        });
    }
}

//! Issues
//  1. Unnecessary dependency on featuredCard and grid
//  • The task is about myTasksList, not the cards grid.
//  • As written, if there is no .card.featured or .grid, your LI numbering code will not run, which is unrelated to the goal.
//  • You can (and should) operate directly on myTasksList.

//  2. The actual filtering logic is correct:

(node) => node.nodeType === Node.ELEMENT_NODE && node.nodeName === "LI"

//  • That gives you element nodes that are <li>.

//  3. String formatting is acceptable:

li.textContent = `${index + 1} ${li.textContent}`;

//  You might sometimes prefer a delimiter like ") " or ". " but that is style, not correctness.

//! Corrected Task 5

if (myTasksList) {
    const liNodes = Array.from(myTasksList.childNodes).filter(
        (node) => node.nodeType === Node.ELEMENT_NODE && node.nodeName === "LI"
    );

    liNodes.forEach((li, index) => {
        li.textContent = `${index + 1}) ${li.textContent}`;
    });
}

//  No need to involve featuredCard or .grid at all.


//TODO  6. Reflection & Checkpoint

//  You can answer these in your study journal; you do not need to send them unless you want feedback.

//  1. In your own words, what is the difference between:
//  • children and childNodes
//  Answer: The read-only children property returns a live HTMLCollection that contains all of the child elements of the element upon which it was called. The read-only childNodes property of the Node interface returns a live NodeList of child nodes of the given element, where the first child node is assigned index 0. Child nodes include elements, text, and comments.

//  • firstElementChild and firstChild
//  Answer: The Element.firstElementChild read-only property returns an element's first child Element, or null if there are no child elements. The read-only firstChild property of the Node interface returns the node's first child in the tree, or null if the node has no children.

//  • nextElementSibling and nextSibling
//  Answer: The Element.nextElementSibling read-only property returns the element immediately following the specified one in its parent's children list, or null if the specified element is the last one in the list. The read-only nextSibling property of the Node interface returns the node immediately following the specified one in their parent's childNodes, or returns null if the specified node is the last child in the parent element.

//  2. Why do text nodes often appear in childNodes when you have nicely formatted HTML with line breaks and indentation?
//  Answer: In HTML documents, whitespace between elements is treated as text nodes. This means that ChildNodes will include these whitespace text nodes when it returns the child nodes of an element. To ignore whitespace, use the Children property instead.

//  3. When would you need to look at all nodes (including text and comments) instead of just elements?
//  For example:
//  • Building a custom HTML formatter or inspector.
//  • Cleaning up whitespace-only text nodes.
//  • Parsing content where text nodes and element nodes are mixed meaningfully (e.g., rich text editor).
//  Answer: I need to look at all nodes (elements, text, comments) when manipulating content structure, handling whitespace, creating complex inline content, or when building tools that need to understand the entire document tree, not just the visible elements, for tasks like deep cloning, data extraction, or custom rendering where whitespace and comments carry meaning or structure. 

//  4. How does understanding node-level traversal help you debug issues where your code “skips” elements, or where selecting children/siblings does not behave as you initially expect?
//  Answer: Understanding node-level traversal in a project can help me to debug issues while I deep dive into the code to figure out why the code results provide me with an error.


//! Feedback

// Your reflections are largely accurate and show good conceptual understanding. I will refine each answer slightly and point out where you can make them sharper, especially for question 4.

//? 1) `children` vs `childNodes`, `firstElementChild` vs `firstChild`, `nextElementSibling` vs `nextSibling`

//* `children` vs `childNodes`

//  Your answer:
//  The read-only children property returns a live HTMLCollection that contains all of the child elements of the element upon which it was called. The read-only childNodes property of the Node interface returns a live NodeList of child nodes of the given element, where the first child node is assigned index 0. Child nodes include elements, text, and comments.
//* This is correct.

//  If you want to condense the essence for yourself:
//  • `children` → elements only (HTMLCollection).
//  • `childNodes` → all node types (NodeList): elements, text (whitespace), comments, etc.
//  That distinction is exactly what matters in practice.

//* `firstElementChild` vs `firstChild`

//  Your answer:
//  The Element.firstElementChild read-only property returns an element's first child Element, or null if there are no child elements. The read-only firstChild property of the Node interface returns the node's first child in the tree, or null if the node has no children.
//* This is also correct.

//  Key practical takeaway:
//  • `firstElementChild` ignores whitespace and comments.
//  • `firstChild` may return a `#text` node if there is a line break or indentation before the first element.

//* `nextElementSibling` vs `nextSibling`

//  Your answer:
//  The Element.nextElementSibling read-only property returns the element immediately following the specified one in its parent's children list, or null if the specified element is the last one in the list. The read-only nextSibling property of the Node interface returns the node immediately following the specified one in their parent's childNodes, or returns null if the specified node is the last child in the parent element.
//* Again, correct.

//? Core intuition:
//  • `nextElementSibling` → “skip non-elements, give me the next element.”
//  • `nextSibling` → “give me the next node of any type” (often a `#text` node from whitespace).
//  You have captured the technical definitions accurately.

//? 2) Why text nodes appear in `childNodes`

//  Your answer:
//  In HTML documents, whitespace between elements is treated as text nodes. This means that ChildNodes will include these whitespace text nodes when it returns the child nodes of an element. To ignore whitespace, use the Children property instead.
//* This is correct and well phrased.

//  You might also keep in mind for debugging:
//  • Pretty HTML formatting (indentation, line breaks) → extra `#text` nodes.
//  • `node.nodeValue` will often be `"\n  "` or similar for those whitespace nodes.
//  • Using `children` or `firstElementChild` avoids being tripped by those.
//* Your mental model here is solid.

//? 3) When you need all nodes (elements, text, comments)

//  Your answer:
//  I need to look at all nodes (elements, text, comments) when manipulating content structure, handling whitespace, creating complex inline content, or when building tools that need to understand the entire document tree, not just the visible elements, for tasks like deep cloning, data extraction, or custom rendering where whitespace and comments carry meaning or structure.
//* This is a good, high-level summary.

//  A slightly more targeted version you can carry with you:

//  You need all nodes when:
//  • Whitespace and text content matter, not just tags.
//      • E.g. a rich text editor, text diff tool, or custom markdown/HTML renderer.
//  • Comments or text nodes carry semantic meaning you cannot ignore.
//      • E.g. templates that use HTML comments as markers.
//  • You are building tools that inspect or transform the raw tree, not just the visual UI.
//      • E.g. HTML formatter, linter, static analyzer.
//  “Deep cloning” will clone all nodes automatically with `cloneNode(true)`, so you usually do not need to manually walk every node there, but it is not wrong to list it as a context where all node types exist.
//* Overall, your reasoning here is sound.

//? 4) How node-level traversal helps debugging

//  Your answer:
//  Understanding node-level traversal in a project can help me to debug issues while I deep dive into the code to figure out why the code results provide me with an error.
//* This is too generic. It is true, but does not show that you really see how it helps.

//  Here is a sharper, more concrete version you can adopt:
//      Understanding node-level traversal helps me debug when:
//      • `nextSibling` or `childNodes` give “unexpected” results because of whitespace text nodes.
//      • I expect `children.length` to match something, but `childNodes.length` is different.
//      • My code “skips” elements or returns `null`, and I discover that:
//          • I used `firstChild` instead of `firstElementChild`, or
//          • I used `nextSibling` instead of `nextElementSibling`.
//      By logging `nodeType`, `nodeName`, and `nodeValue` (with a helper like `describeNode`), I can see the actual structure the browser sees, including `#text` nodes, and then adjust my traversal or filters accordingly.

//  This connects directly to what you did in Lesson 07:
//  • Using `describeNode` to understand why `firstChild` or `nextSibling` is a `#text` node.
//  • Using `childNodes` + `filter` to get only the `LI` elements you care about.
