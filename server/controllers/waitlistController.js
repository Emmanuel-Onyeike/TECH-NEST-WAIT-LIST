import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

export const joinWaitlist = async (req, res) => {
    try {
        console.log('Raw request body:', req.body);
        if (!req.body) {
            console.log('Request body is undefined');
            return res.status(400).json({ error: 'Request body is missing' });
        }

        const { email } = req.body;
        console.log('Processing joinWaitlist for email:', email);

        if (!email) {
            console.log('Email missing in request');
            return res.status(400).json({ error: 'Email is required' });
        }

        console.log('Checking for existing user...');
        const existingUser = await User.findOne({ email });
        console.log('Existing user result:', existingUser);
        if (existingUser) {
            console.log('Email already exists:', email);
            return res.status(409).json({ error: 'Email already on waitlist' });
        }

        console.log('Counting documents...');
        const userCount = await User.countDocuments();
        console.log('User count:', userCount);

        console.log('Creating new user...');
        const newUser = new User({
            email,
            waitlistNumber: userCount + 1,
        });

        console.log('Saving new user...');
        await newUser.save();
        console.log('User saved:', newUser);

        try {
            const subject = 'Welcome to TechNest Waitlist!';
            const message = `Welcome ${email},\n\nYou have joined the waitlist. You will be notified when we launch. Have a great day.\n\nTEAM TECHNEST`;
            await sendEmail(email, subject, message);
            console.log('Welcome email sent to:', email);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError.message);
        }

        res.status(200).json({
            message: 'Added to waitlist',
            waitlistNumber: newUser.waitlistNumber,
        });
    } catch (err) {
        console.error('Error in joinWaitlist:', err.message);
        console.error('Stack trace:', err.stack);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getWaitlist = async (req, res) => {
    try {
        const users = await User.find().sort({ waitlistNumber: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};