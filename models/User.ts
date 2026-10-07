import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: "admin";
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        passwordHash: { type: String, required: true },
        role: { type: String, default: "admin" },
    },
    { timestamps: true }
);

/** Hash password before saving */
UserSchema.pre("save", async function () {
    if (!this.isModified("passwordHash")) return;
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
});


/** Compare plain text password with stored hash */
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
