import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notifications';

// Function to get all notifications
export const getNotifications = () => {
  return axios.get(API_URL)
    .then((response) => response.data) // Return the response data directly
    .catch((error) => {
      console.error("Error fetching notifications:", error);
      throw error; // Rethrow error so that the calling function can handle it
    });
};

// Function to delete a notification
export const deleteNotification = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`)
    .then((response) => response.data) // Return the response data directly
    .catch((error) => {
      console.error("Error deleting notification:", error);
      throw error; // Rethrow error to be handled by the caller
    });
};

// Function to send a notification
export const sendNotification = (data) => {
  return axios.post(`${API_URL}/send`, data)
    .then((response) => response.data) // Return the response data directly
    .catch((error) => {
      console.error("Error sending notification:", error);
      throw error; // Rethrow error to be handled by the caller
    });
};
