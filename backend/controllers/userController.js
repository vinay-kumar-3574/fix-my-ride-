const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Onboarding = require('../models/Onboarding');



exports.getUserProfile = async (req, res) => {
  try {
   
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    let onboardingData = null;
    if (user.onboarding) {
      const onboarding = await Onboarding.findById(user.onboarding);
      onboardingData = onboarding ? onboarding.toObject() : null;
    }

    res.json({
      ...user.toObject(),
      onboarding: onboardingData,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phoneNumber, address, emergencyContact, onboardingData } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only specific fields
    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;
    if (emergencyContact) user.emergencyContact = emergencyContact;

    // Mark onboarding as completed
    user.onboardingCompleted = true;
    await user.save();

    // Update onboarding data separately if it exists
    if (user.onboarding && onboardingData) {
      const onboarding = await Onboarding.findById(user.onboarding);
      if (onboarding) {
        Object.assign(onboarding, onboardingData);
        await onboarding.save();
      }
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};