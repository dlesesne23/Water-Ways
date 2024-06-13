import axios from 'axios';
import { APP_NAME } from '@env'


export const requestRide = async (userId, pickupLocation, dropoffLocation) => {
  try {
    const response = await axios.post(`${APP_NAME}/rides/request`, {
      userId,
      pickupLocation,
      dropoffLocation,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acceptRide = async (rideId, driverId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rides/accept/${rideId}`, { driverId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const completeRide = async (rideId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rides/complete/${rideId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};