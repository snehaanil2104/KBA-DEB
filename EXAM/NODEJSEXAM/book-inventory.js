const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inventory = new Map();

function askCommand() {
    console.log("\nWelcome to Book Inventory Management System!");
    console.log("Available commands: Add, Remove, Search, Update, Summary, Exit");
    rl.question("Enter a command: ", function (command) {
        switch (command.trim().toLowerCase()) {
            case 'add':
                addBookPrompt();
                break;
            case 'remove':
                removeBookPrompt();
                break;
            case 'search':
                searchBookPrompt();
                break;
            case 'update':
                updateBookPrompt();
                break;
            case 'summary':
                printSummary();
                askCommand();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log('Invalid command! Please enter a valid one.');
                askCommand();
                break;
        }
    });
}

function addBookPrompt() {
    rl.question('Enter a book ID: ', function (id) {
        rl.question('Enter the title of the book: ', function (title) {
            rl.question('Enter the name of the author: ', function (author) {
                rl.question('Enter the genre of the book: ', function (genre) {
                    addBook(id, title, author, genre);
                    askCommand();
                });
            });
        });
    });
}

function addBook(id, title, author, genre) {
    if (inventory.has(id)) {
        console.log(`Error! Book with the ID ${id} already exists in the inventory!`);
    } else {
        inventory.set(id, { title, author, genre });
        console.log(`Book with the ID ${id} added to the inventory!`);
    }
}

function removeBookPrompt() {
    rl.question('Enter a book ID to remove: ', function (id) {
        removeBook(id);
        askCommand();
    });
}

function removeBook(id) {
    if (inventory.has(id)) {
        inventory.delete(id);
        console.log(`Book with ID ${id} has been removed from the inventory.`);
    } else {
        console.log(`Error! No book with ID ${id} found!`);
    }
}

function searchBookPrompt() {
    rl.question('Enter a book title, author, genre, or ID to search: ', function (searchTerm) {
        searchBook(searchTerm);
        askCommand();
    });
}

function searchBook(searchTerm) {
    const results = [];
    for (const [id, book] of inventory) {
        if (id.includes(searchTerm) || book.title.includes(searchTerm) || book.author.includes(searchTerm) || book.genre.includes(searchTerm)) {
            results.push({ id, ...book });
        }
    }
    if (results.length > 0) {
        console.log('Search results:', results);
    } else {
        console.log('No books found!');
    }
}

function updateBookPrompt() {
    rl.question('Enter a book ID to update: ', function (id) {
        if (!inventory.has(id)) {
            console.log(`Error! No book with ID ${id} found.`);
            askCommand();
            return;
        }
        rl.question('Enter new title of the book: ', function (newTitle) {
            rl.question('Enter new name of the author: ', function (newAuthor) {
                rl.question('Enter new genre of the book : ', function (newGenre) {
                    updateBook(id, newTitle, newAuthor, newGenre);
                    askCommand();
                });
            });
        });
    });
}
function updateBook(id,newTitle,newAuthor,newGenre){ 
    if(inventory.has(id)){
        const book = inventory.get(id);
        book.title = newTitle || book.title;
        book.author = newAuthor || book.author;
        book.gener = newGenre || book.genre
        inventory.set(id,book);
        console.log(`Book with id ${id} updated`);
    }else{
        console.log(`Error! Book with id ${id} not found`)
    }
}

function printSummary() {
    if (inventory.size > 0) {
        console.log('Inventory Summary:');
        for (const [id, book] of inventory) {
            console.log(`ID: ${id}, Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}`);
        }
    } else {
        console.log('No books found!');
    }
}

askCommand();
