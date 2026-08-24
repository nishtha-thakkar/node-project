# Node.js HTTP Server

## 📌 Project Description

This is a beginner-level Node.js project where I created a custom HTTP server using Node.js.

In this project, I learned how to:

* Use Node.js built-in modules
* Create an HTTP server
* Create and read a file using the File System module
* Use `__dirname` and `__filename`
* Use the `global` object
* Check the Node.js version
* Work with request and response objects
* Use npm scripts

## 🛠️ Technologies Used

* Node.js
* HTTP Module
* File System (`fs`) Module
* npm

## 📂 Project Structure

```text
http/
│
├── server.js
├── demo.txt
├── package.json
└── README.md
```

## 🔹 Features

### 1. HTTP Server

The project creates a custom HTTP server using the Node.js `http` module.

The server runs on:

```text
http://localhost:4000
```

When the server is opened in the browser, it displays:

```text
server is done
```

### 2. File Creation

The `fs.writeFileSync()` method is used to create a file named `demo.txt`.

The file contains:

```text
Hello developer...
```

### 3. File Reading

The `fs.readFile()` method is used to read the content of `demo.txt`.

The output is displayed in the terminal:

```text
Hello developer...
```

### 4. Node.js Information

The project also displays:

* Current directory using `__dirname`
* Current file path using `__filename`
* Node.js version using `process.version`
* Global variable using `global`

## ▶️ How to Run the Project

### Step 1: Install Node.js

Make sure Node.js is installed on your computer.

Check the Node.js version:

```bash
node -v
```

### Step 2: Open the Project

Open the project folder in VS Code.

### Step 3: Open Terminal

Open the terminal inside VS Code.

### Step 4: Run the Server

You can run the project using:

```bash
npm start
```

or:

```bash
node server.js
```

### Step 5: Open in Browser

Open:

```text
http://localhost:4000
```

You should see:

```text
server is done
```

## 📦 package.json

The project uses the following start script:

```json
"scripts": {
  "start": "node server.js"
}
```

This means when we run:

```bash
npm start
```

Node.js automatically runs:

```bash
node server.js
```

## 📚 What I Learned

Through this project, I learned the basics of:

* Node.js
* HTTP server
* File System module
* `createServer()`
* `server.listen()`
* `writeFileSync()`
* `readFile()`
* `__dirname`
* `__filename`
* `global`
* `process.version`
* npm start script

## 👩‍💻 Author

**Nishtha Sodha**

Beginner Node.js Project
