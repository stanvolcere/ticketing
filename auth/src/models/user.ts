import mongoose from 'mongoose';
import { Password } from '../services/password'

// an interface that describes the properties needed to create a user
interface UserAttrs {
    email: string,
    password: string
}

// interface to describe the properties on a usermodel
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Model has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    // types here are tied to Typescript - hence the String instead of string
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            // removes a password from an object,
            // because we do not want to return the user's password
            delete ret.password;
            delete ret.__v;
        }
    }
});

// note: mongoose uses old style callback way of doing async operations
userSchema.pre('save', async function (done) {
    // Note: this - represents the current document being handled
    // check that the password has changed on current save
    // note the is modified is true even when the document is being first created 
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// this extra fundtion allows us to use the Typescript type system to check that we
// are infact providing the correct params needed to create a user
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

User.build({ email: "test", password: "testing" });

export { User };