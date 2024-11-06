const prompt = require("prompt-sync")();

require("dotenv").config();
const connectDB = require("./src/db/db");
connectDB();

const CustomerModel = require("./src/models/CustomerModel");

// const createCustomer = await CustomerModel.create({
//     name:
//     age:
// })

const welcomeMessage =
    "Welcome to the CRM\nWhat would you like to do?\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit\nNumber of action to run\n# user inputs";

let userInput = parseInt(prompt(welcomeMessage), 10);

switch (userInput) {
    case 1:
        console.log(`${userInput}`);
        
        break;
    case 2:
        console.log(`${userInput}`);
        break;
    case 3:
        console.log(`${userInput}`);
        break;
    case 4:
        console.log(`${userInput}`);
        break;
    case 5:
        console.log(`${userInput}`);
        break;
}

userInput = "";

console.log(`${userInput}`);
