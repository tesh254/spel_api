import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = Schema({
    bio: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    job: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    stackoverflow: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    skills: {
        type: Array,
        default: []
    }
});

export default mongoose.model("Profile", profileSchema);
