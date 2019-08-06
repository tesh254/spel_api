import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    isVerified: {
        type: String,
        required: true
    }
})

export default mongoose.model("SpelUser", userSchema);
