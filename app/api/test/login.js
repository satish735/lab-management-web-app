// pages/api/auth.js
import connectDB from '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

connectDB();

export const POST = async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = await User.create({
        email,
        password: hashedPassword,
        phone,
      });

      return new Response({ message: 'User created successfully' }, { status: 201 });
    } else {

      if (phone) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {

          await user.save();
          return new Response({ message: 'Token updated successfully' }, { status: 200 });
        } else {
          return new Response({ message: 'Invalid credentials' }, { status: 400 });
        }
      } else {
        return new Response({ message: 'User already exists' }, { status: 400 });
      }
    }
  } catch (error) {
    console.error(error);
    return new Response({ message: 'Server Error' }, { status: 500 });
  }
};
