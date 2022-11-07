const { Schema, model } = require('mongoose');


var validateEmail = function(email) {
    var regex = /^([a-zA-Z0-9._%-]+)@([\da-zA-Z.-]+).([a-zA-Z]{2,6})*$/;
    return regex.test(email)
};

const UserSchema = new Schema (
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        userEmail: {
            type: String,
            required: 'Valid email address required',
            unique: true,
            validate: [validateEmail, 'Please fill a valid emailaddress'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [[this]]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;