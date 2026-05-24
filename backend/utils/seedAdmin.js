import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const GLOBAL_ADMIN_USERNAME = 'admin';
const GLOBAL_ADMIN_EMAIL = 'admin@learnwitheasetutors.com';
const GLOBAL_ADMIN_PASSWORD = 'GodIsGreat*774';

export const ensureAdminUser = async () => {
  try {
    // Always check for the REAL global admin
    const existingAdmin = await User.findOne({ username: GLOBAL_ADMIN_USERNAME });

    if (existingAdmin) {
      // If the stored password already matches the desired password we're done.
      const matches = await bcrypt.compare(GLOBAL_ADMIN_PASSWORD, existingAdmin.password).catch(() => false);
      if (matches) {
        console.log('✔ Admin account already exists and password is correct');
        return;
      }

      // Otherwise reset the password to the known global password (will be hashed by the model pre-save hook)
      existingAdmin.password = GLOBAL_ADMIN_PASSWORD;
      await existingAdmin.save();
      console.log('✔ Admin account existed — password has been reset to the global admin password');
      return;
    }

    // Create a fresh admin account. Do NOT pre-hash the password here — the User model hashes on save.
    await User.create({
      username: GLOBAL_ADMIN_USERNAME,
      email: GLOBAL_ADMIN_EMAIL,
      password: GLOBAL_ADMIN_PASSWORD,
      role: 'admin',
      Permissions: [],
      createdAt: new Date()
    });

    console.log('✔ Admin account created successfully');
  } catch (err) {
    console.error('❌ Error creating admin account:', err);
  }
};