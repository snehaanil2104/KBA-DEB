const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const inventory = new Map();

function askCommand(){
    console.log("Welcome to inventory management system!");
    console.log("Available commands: add, remove, search, update, summary, exit");
    rl.question("\Enter a command: ", function (command){   //(command)=FETCHED STANDARD INPUT
        switch(command.trim().toLowerCase()){
            case 'add':
                addItemPrompt();
                break;
            case 'remove':
                removeItemPrompt();
                break; 
            case 'search':
                searchItemPrompt();
                break; 
            case 'update':
                updateItemPrompt();
                break; 
            case 'summary':
                printSummary();
                askCommand();  //recurssion
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log('Invalid command: enter a valid choice!');
                askCommand();
                 break;
        }
    });
}
//function to add an item
function addItemPrompt(){                          //nested functions
    rl.question("Enter an item id: ", function(id){     //callback fn
        rl.question("Enter an item name: ",function(name){      //here both id& name are availabale
            rl.question("Enter item category: ",function(category){    
                rl.question("Enter item quantity: ", function(quantity){
                    addItem(id,name,category,parseInt(quantity));
                    askCommand();
                });
            });
        });
    });
}
function addItem(id,name,category,quantity){          //logic- here is adding the value in to map
    if(inventory.has(id)){
        console.log(`Error item with id ${id} already exists`);
    }else{
        inventory.set(id,{name,category,quantity});
        console.log(`Item with ID ${id} added to inventory!`)
    }
}
//function to remove an item
function removeItemPrompt(){
    rl.question("Enter an item to remove: ",function(id){
        removeItem(id);
        askCommand();
    });
}
function removeItem(id){
    if(inventory.has(id)){
        inventory.delete(id);
        console.log(`Error:  No item with ID ${id} found!`)
    }
}
//function to search an item
function searchItemPrompt(){
    rl.question("Enter serach term: ",function(searchTerm){
        searchItems(searchTerm);
        askCommand();
    });
}
function searchItems(searchTerm){
    const results=[];
    for(const[id,item] of inventory){
        if(id.includes(searchTerm)||item.name.includes(searchTerm)||item.category.includes(searchTerm)||item.quantity.includes(searchTerm)){
            results.push({id,...item});
        }

    }
    if(results.length>0){
        console.log('Serach Results:',results);
    }else{
        console.log('No items found!')
    }
}
//function to update an item
function updateItemPrompt(){
    rl.question("Enter an item id: ", function(id){
        rl.question("Enter an item name: ",function(newName){
            rl.question("Enter item category: ",function(newCategory){
                rl.question("Enter item quantity: ", function(newQuantity){
                    updateItem(id,newName,newCategory,newQuantity ? parseInt(newQuantity) : undefined)
                    askCommand();
                });
            });
        });
    });
}
function updateItem(id,newName,newCategory,newQuantity){
    if(inventory.has(id)){
        const item = inventory.get(id);
        item.name = newName || item.name;
        item.category = newCategory || item.category;
        item.quantity = newQuantity !== undefined ? newQuantity : item.quantity;
        inventory.set(id,item);
        console.log(`Item with ID ${id} updated!`);
    }else{
        console.log(`Item with ID ${id} not found!`); 
    }
}
//function to print summary
function printSummary(){
    if(inventory.size>0){
        console.log('Inventory Summary: ');
        for(const [id,item] of inventory){
            console.log(`ID: ${id},Name: ${item.name}, Category: ${item.category}, Quantity: ${item.quantity}`);
        }
    }else{
        console.log('No items found!')
    }
}
askCommand();


