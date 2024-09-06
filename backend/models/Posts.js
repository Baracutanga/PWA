import mongoose, { Schema } from "mongoose";

const postsSchema = new Schema({
    textInput: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now
    },
})

const posts = mongoose.model('Posts', postsSchema);

export default posts;