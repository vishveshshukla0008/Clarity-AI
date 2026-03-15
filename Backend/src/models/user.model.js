import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Fullname is required"],
            minlength: [3, "Fullname must be at least 3 characters"],
            maxlength: [20, "Fullname cannot exceed 20 characters"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [20, "Username cannot exceed 20 characters"],
            trim: true,
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            validate: {
                validator(value) {
                    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                        value,
                    );
                },
                message:
                    "Password must contain uppercase, lowercase, number, and special character",
            },
        },
        isVerified: {
            type: Boolean,
            select: false,
            default: false
        },
        emailVerificationToken: {
            type: String,
            select: false
        },
        emailVerificationExpires: {
            type: Date,
            select: false
        },
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordTokenExpires: {
            type: Date,
            select: false
        },
    },
    { timestamps: true },
);


userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
export const userModel = mongoose.model("User", userSchema);
