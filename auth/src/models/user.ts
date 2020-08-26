import mongoose from 'mongoose';

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
});

// this extra fundtion allows us to use the Typescript type system to check that we
// are infact providing the correct params needed to create a user
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

User.build({ email: "test", password: "testing" });


export { User };