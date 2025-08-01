import { createContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
import { registerForPushNotificationsAsync, setupNotificationListeners } from "../lib/notifications";

export const UserContext = createContext();

export function UserProdiver({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
      
      // Register for push notifications after successful login
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
        // TODO: Save token to Appwrite user preferences or database
        console.log('Push token registered:', token);
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function register(email, password) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    setExpoPushToken(null);
  }

  async function getInitialUserValue() {
    try {
      const response = await account.get();
      setUser(response);
      
      // Register for push notifications if user is already logged in
      if (response) {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          setExpoPushToken(token);
          console.log('Push token registered for existing user:', token);
        }
      }
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
    
    // Set up notification listeners
    const { cleanup } = setupNotificationListeners(
      (notification) => {
        console.log('Notification received:', notification);
        // Handle notification received while app is in foreground
      },
      (response) => {
        console.log('Notification response:', response);
        // Handle user tapping on notification
        // You can navigate to specific screens based on notification data
      }
    );
    
    // Cleanup listeners on unmount
    return cleanup;
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked, expoPushToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
