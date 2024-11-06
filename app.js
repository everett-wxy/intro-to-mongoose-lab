const prompt = require("prompt-sync")();
require("dotenv").config();
const connectDB = require("./src/db/db");
connectDB();
const mongoose = require("mongoose");
const CustomerModel = require("./src/models/CustomerModel");

const createCustomer = async () => {
    const name = prompt("Enter customer name: ");
    const age = prompt("Enter customer age: ");

    if (!name || isNaN(age)) {
        console.log("Invalid input, please enter a valid name and age.");
        return;
    }
    try {
        const newCustomer = await CustomerModel.create({ name, age });
        console.log("Customer created:", newCustomer);
    } catch (error) {
        console.log("Error creating customer:", error);
    }
};

const viewCustomer = async () => {
    try {
        const customers = await CustomerModel.find();
        customers.forEach((customer) => {
            const customerId = customer.id;
            const customerName = customer.name;
            const customerAge = customer.age;
            console.log(`id: ${customerId}, name: ${customerName}, age: ${customerAge}`);
        });
    } catch (error) {
        console.log("Error viewing customers:", error);
    }
};

const updateCustomer = async () => {
    await viewCustomer(); // Show all customers first
    const customerId = prompt("\nPlease enter the ID of the customer you wish to update: ");

    const customer = await CustomerModel.findById(customerId); // Find the customer by ID

    if (!customer) {
        console.log("Customer not found.");
        return;
    }

    console.log("Updating customer:", customer);

    const newName = prompt(`Enter new name (current: ${customer.name}): `);
    const newAge = prompt(`Enter new age (current: ${customer.age}): `);

    if (newName) customer.name = newName; // Update name if provided
    if (newAge && !isNaN(newAge)) customer.age = newAge; // Update age if valid number

    try {
        const updatedCustomer = await customer.save(); // Save updated customer back to the database
        console.log("Customer updated:", updatedCustomer);
    } catch (error) {
        console.log("Error updating customer:", error);
    }
};

const deleteCustomer = async () => {
    await viewCustomer(); // Show all customers first
    const customerId = prompt("\nPlease enter the ID of the customer you wish to delete: ");

    try {
        const deletedCustomer = await CustomerModel.findByIdAndDelete(customerId); // Find and delete customer
        if (deletedCustomer) {
            console.log("Customer deleted:", deletedCustomer);
        } else {
            console.log("Customer not found.");
        }
    } catch (error) {
        console.log("Error deleting customer:", error);
    }
};

const main = async () => {
    while (true) {

        const welcomeMessage =
            "Welcome to the CRM\nWhat would you like to do?\n1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. Quit\nPlease enter a number for your action: ";
        

        const userInput = prompt(welcomeMessage); 

        // Handle user input
        switch (userInput) {
            case "1":
                console.log("You chose to create a customer.");
                await createCustomer();
                break;
            case "2":
                console.log("You chose to view all customers.");
                await viewCustomer();
                break;
            case "3":
                console.log("You chose to update a customer.");
                await updateCustomer();
                break;
            case "4":
                console.log("You chose to delete a customer.");
                await deleteCustomer();
                break;
            case "5":
                console.log("You chose to quit.");
                mongoose.connection.close();
                return; 
            default:
                console.log("Invalid choice, please choose a valid option.");
        }
    }
};

main();
