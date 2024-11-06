const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        age: { type: Number, require: true },
    },
    { collection: "customer" }
);

module.exports = mongoose.model("customer", CustomerSchema);
