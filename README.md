# Module 07 – Lesson 07: Traversing the DOM – All Nodes

## Overview

In the previous lesson you learned how to traverse the DOM using **element-focused** properties like:

- `children`
- `firstElementChild` / `lastElementChild`
- `nextElementSibling` / `previousElementSibling`
- `closest()`

In this lesson you go one level deeper and learn how to work with **all nodes**, not just elements. This includes:

- Element nodes (`<li>`, `<section>`, `<button>`, etc.)
- Text nodes (including whitespace and line breaks)
- Comment nodes

Understanding node-level traversal explains why some DOM APIs behave “strangely” when formatted HTML contains indentation and line breaks, and it gives you precise control when you need to inspect or manipulate the **actual node tree**.

---

## Learning Objectives

By completing this lesson, you will be able to:

1. Explain the difference between:
   - `children` and `childNodes`
   - `firstElementChild` / `lastElementChild` and `firstChild` / `lastChild`
   - `nextElementSibling` / `previousElementSibling` and `nextSibling` / `previousSibling`
2. Use `nodeType`, `nodeName`, and `nodeValue` to inspect and understand different node types.
3. Convert `childNodes` (a NodeList) into a real array and filter nodes by type (e.g. elements vs text).
4. Recreate “element children” using `childNodes` + filtering, instead of relying on `children`.
5. Describe when and why you would use node-level traversal in real applications and debugging.

---

## Prerequisites

Before starting this lesson, you should be comfortable with:

- All concepts from **Module 07 – Lesson 06**:
  - `parentElement`, `children`
  - `firstElementChild`, `lastElementChild`
  - `nextElementSibling`, `previousElementSibling`
  - `closest()`
- JavaScript basics:
  - Arrays and array methods (`forEach`, `filter`)
  - Conditionals (`if`)
- Using the browser DevTools console.

---

## Files in This Lesson

Suggested folder structure:

```text
module-07/
  lesson-07-traversing-dom-all-nodes/
    index.html
    style.css
    app.js
    README.md
```

- **index.html** – Typically copied from Lesson 06, including:
  - `#section4` with a `.tasks` list and `.task` `<li>` elements.
  - Other sections (nav, cards, buttons) can stay as context.
- **style.css** – Base layout and highlighting classes from previous lessons.
- **app.js** – Lesson 07 logic (Tasks 1–5 in this README).
- **README.md** – This file.

---

## Setup & How to Run

1. Copy your Lesson 06 `index.html` and `style.css` into a new folder for Lesson 07.
2. Create a new `app.js` for Lesson 07 and link it in `index.html`:

   ```html
   <script type="module" src="./app.js"></script>
   ```

3. Open `index.html` in the browser:
   - Double-click the file, or
   - Use a local dev server (e.g. VS Code Live Server).
4. Open DevTools (Console tab) to inspect logs produced by the code in this lesson.

---

## Core Concepts

### 1. Node vs Element

In the DOM:

- **Node** is the general concept (everything in the tree is a node):
  - Elements
  - Text nodes
  - Comments
  - The document itself
- **Element** is a specific type of node representing an HTML or SVG element.

Useful node type constants:

- `Node.ELEMENT_NODE` → `1`
- `Node.TEXT_NODE`    → `3`
- `Node.COMMENT_NODE` → `8`
- `Node.DOCUMENT_NODE` → `9`

Every node has properties like:

- `nodeType`
- `nodeName`
- `nodeValue` (mostly used for text or comment nodes)

---

### 2. Element-only vs All-node Traversal

You already know the element-only properties:

- `children`
- `firstElementChild` / `lastElementChild`
- `nextElementSibling` / `previousElementSibling`

The all-node equivalents are:

- `childNodes`
- `firstChild` / `lastChild`
- `nextSibling` / `previousSibling`

#### `children` vs `childNodes`

```js
const myTasksList = document.querySelector("#section4 .tasks");

console.log(myTasksList.children);   // HTMLCollection (elements only)
console.log(myTasksList.childNodes); // NodeList (elements, text, comments)
```

- `children` returns an **HTMLCollection** of **element** nodes only.
- `childNodes` returns a **NodeList** of **all child nodes** (elements, text, comments, etc.).

Because nicely formatted HTML contains indentation and line breaks, `childNodes` often includes `#text` nodes for whitespace.

---

#### `firstElementChild` vs `firstChild`

```js
const section4 = document.querySelector("#section4");

console.log(section4.firstElementChild); // first child element
console.log(section4.firstChild);        // could be a text node (#text)
```

- `firstElementChild` skips text and comments; returns the first **element** child.
- `firstChild` returns the **first node** of any type, which might be a whitespace text node.

Similarly:

- `lastElementChild` vs `lastChild`
- `nextElementSibling` vs `nextSibling`

---

### 3. Inspecting Nodes: `nodeType`, `nodeName`, `nodeValue`

You can log detailed information about any node:

```js
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
```

Examples:

```js
const firstTask = document.querySelector("#section4 .tasks .task");

describeNode("firstTask", firstTask);
describeNode("firstTask.nextSibling", firstTask.nextSibling);
describeNode("firstTask.nextElementSibling", firstTask.nextElementSibling);
```

You can also use `node.nodeType === Node.TEXT_NODE` to detect text nodes, including whitespace.

---

### 4. Filtering NodeLists by Node Type

When you use `childNodes`, you often want only:

- element nodes, or
- non-empty text nodes.

Example: filter only `<li>` elements from `childNodes`:

```js
const myTasksList = document.querySelector("#section4 .tasks");

if (myTasksList) {
  const liNodes = Array.from(myTasksList.childNodes).filter(
    (node) => node.nodeType === Node.ELEMENT_NODE && node.nodeName === "LI"
  );

  liNodes.forEach((li, index) => {
    li.textContent = `${index + 1}) ${li.textContent}`;
  });
}
```

This effectively recreates `myTasksList.children`, but using node-level APIs.

---

## Guided Practice – Using Your Current HTML

The following tasks assume an HTML structure similar to Lesson 06:

- `#section4` with an `<h1>` and a `.tasks` `<ul>` containing `.task` `<li>` elements.
- HTML formatted with indentation and line breaks (so whitespace text nodes are present).

Implement the tasks in `app.js`.

### Task 1 – Compare `children` vs `childNodes`

1. Select the “My Tasks” list in `#section4`:

   ```js
   const myTasksList = document.querySelector("#section4 .tasks");
   ```

2. Log `children` and `childNodes`:

   ```js
   if (myTasksList) {
     console.log("children:", myTasksList.children);
     console.log("childNodes:", myTasksList.childNodes);
   }
   ```

3. Convert `childNodes` to an array and log each node’s details:

   ```js
   if (myTasksList) {
     const myTasksNodes = Array.from(myTasksList.childNodes);

     myTasksNodes.forEach((node, index) => {
       console.log(index, {
         nodeType: node.nodeType,
         nodeName: node.nodeName,
         nodeValue: node.nodeValue,
       });
     });
   }
   ```

Observe which entries are `LI` and which are `#text` nodes.

---

### Task 2 – `firstChild` / `lastChild` vs `firstElementChild` / `lastElementChild`

1. Select `#section4`:

   ```js
   const section4 = document.querySelector("#section4");
   ```

2. Log and compare:

   ```js
   if (section4 && myTasksList) {
     console.log("section4.firstChild:", section4.firstChild);
     console.log("section4.firstElementChild:", section4.firstElementChild);

     console.log("section4.lastChild:", section4.lastChild);
     console.log("section4.lastElementChild:", section4.lastElementChild);

     console.log("myTasksList.firstChild:", myTasksList.firstChild);
     console.log("myTasksList.firstElementChild:", myTasksList.firstElementChild);
   }
   ```

Check in the console whether `firstChild` is a `#text` node due to whitespace.

---

### Task 3 – `nextSibling` vs `nextElementSibling`

1. Select the first task:

   ```js
   const firstTask = document.querySelector("#section4 .tasks .task");
   ```

2. Log its siblings:

   ```js
   if (firstTask) {
     console.log("firstTask.nextSibling:", firstTask.nextSibling);
     console.log("firstTask.nextElementSibling:", firstTask.nextElementSibling);

     console.log("firstTask.previousSibling:", firstTask.previousSibling);
     console.log("firstTask.previousElementSibling:", firstTask.previousElementSibling);
   }
   ```

3. If `firstTask.nextSibling` is a text node, log its `nodeValue`:

   ```js
   if (firstTask && firstTask.nextSibling && firstTask.nextSibling.nodeType === Node.TEXT_NODE) {
     console.log("Text after firstTask:", JSON.stringify(firstTask.nextSibling.nodeValue));
   }
   ```

---

### Task 4 – Helper: `describeNode`

1. Create a reusable helper (as shown in Core Concepts):

   ```js
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
   ```

2. Use it to describe important nodes:

   ```js
   if (section4) {
     describeNode("section4.firstChild", section4.firstChild);
     describeNode("section4.firstElementChild", section4.firstElementChild);
   }

   if (firstTask) {
     describeNode("firstTask.nextSibling", firstTask.nextSibling);
     describeNode("firstTask.nextElementSibling", firstTask.nextElementSibling);
   }
   ```

This will give you a clearer picture of what each traversal property actually returns.

---

### Task 5 – Filter Only `<li>` Nodes with `childNodes`

Goal: recreate the equivalent of `myTasksList.children` using `childNodes` + filtering.

1. From `myTasksList.childNodes`, filter only element nodes whose `nodeName` is `"LI"`:

   ```js
   if (myTasksList) {
     const liNodes = Array.from(myTasksList.childNodes).filter(
       (node) => node.nodeType === Node.ELEMENT_NODE && node.nodeName === "LI"
     );

     liNodes.forEach((li, index) => {
       li.textContent = `${index + 1}) ${li.textContent}`;
     });
   }
   ```

2. Check the DOM to confirm that the `<li>` texts are updated (e.g. `1) Learn DOM selectors`, `2) Practice loops`, etc.).

---

## Reflection & Checkpoint

Answer these questions in your study journal to confirm your understanding:

1. In your own words, what is the difference between:
   - `children` and `childNodes`
   - `firstElementChild` and `firstChild`
   - `nextElementSibling` and `nextSibling`

2. Why do text nodes often appear in `childNodes` when you have nicely formatted HTML with line breaks and indentation?

3. When would you need to look at **all nodes** (including text and comments) instead of just elements?
   - For example:
     - Building a custom HTML formatter or inspector.
     - Cleaning up whitespace-only text nodes.
     - Parsing content where text nodes and element nodes are mixed meaningfully (e.g. a rich text editor).

4. How does understanding node-level traversal help you debug issues where your code “skips” elements, or where selecting children/siblings does not behave as you initially expect?
   - Think about cases where:
     - `firstChild` or `nextSibling` return `#text` nodes.
     - `children.length` and `childNodes.length` differ.
     - You rely on the wrong property (`nextSibling` instead of `nextElementSibling`, etc.).


