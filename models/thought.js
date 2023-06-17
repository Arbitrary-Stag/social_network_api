// Define Mongoose
const { Schema, model } = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new Schema (
    {
        thoughtText: { 
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280,
        },
        createdAt: { 
            type: Date,
            default: Date.now,
            
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const reactionSchema = new Schema (
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

thoughtSchema.virtual('formattedCreatedAt').get(function () {
    const date = this.createdAt;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
});

reactionSchema.virtual('formattedCreatedAt').get(function () {
    const date = this.createdAt;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;