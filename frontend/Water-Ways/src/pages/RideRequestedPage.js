import axios from 'axios';

// Function to request a ride
const requestRide = async (userId, pickupLocation, dropoffLocation) => {
  try {
    const response = await axios.post('http://your-server-ip:3000/rides/request', {
      userId,
      pickupLocation,
      dropoffLocation,
    });
    console.log('Ride requested', response.data);
  } catch (error) {
    console.error('Error requesting ride', error);
  }
};

// Usage
requestRide('userId', [37.78825, -122.4324], [37.78525, -122.4214]);