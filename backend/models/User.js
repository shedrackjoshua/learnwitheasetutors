import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'tutor', 'parents', 'child'], required: true },

    // Child → who is their tutor?
    assignedTutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

     // Tutor → list of children assigned to them
    assignedChildren: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to parent user for child accounts
    Permissions: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});

//hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))  return;

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
});

//Method to compare password with hash password
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;