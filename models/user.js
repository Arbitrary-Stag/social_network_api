// Define Mongoose
const { Schema, model } = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new Schema (
    {
        username: { type: String, 
            required: true, 
            unique: true,
            trim: true,
        },
        email: { type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/],
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought'}],
        friendss: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;