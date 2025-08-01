import { StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import ThememButton from "./ThememButton";
import Spacer from "./Spacer";
import { useUser } from "../hooks/useUser";
import { 
  sendLocalNotification, 
  getNotificationPermissions,
  cancelAllNotifications 
} from "../lib/notifications";

const NotificationTest = () => {
  const { expoPushToken } = useUser();
  const [permissionStatus, setPermissionStatus] = useState(null);

  const checkPermissions = async () => {
    const permissions = await getNotificationPermissions();
    setPermissionStatus(permissions.status);
    Alert.alert(
      "Notification Permissions", 
      `Status: ${permissions.status}\nCan ask again: ${permissions.canAskAgain}`
    );
  };

  const sendTestNotification = async () => {
    try {
      await sendLocalNotification(
        "Test Notification",
        "This is a test notification from your app!",
        { screen: "profile", userId: "123" }
      );
      Alert.alert("Success", "Test notification sent!");
    } catch (error) {
      Alert.alert("Error", "Failed to send notification: " + error.message);
    }
  };

  const clearNotifications = async () => {
    await cancelAllNotifications();
    Alert.alert("Success", "All notifications cleared!");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.heading}>
        Notification Testing
      </ThemedText>
      <Spacer height={20} />
      
      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.label}>Push Token Status:</ThemedText>
        <ThemedText style={styles.value}>
          {expoPushToken ? "✅ Registered" : "❌ Not registered"}
        </ThemedText>
        
        {expoPushToken && (
          <>
            <Spacer height={10} />
            <ThemedText style={styles.label}>Token (first 20 chars):</ThemedText>
            <ThemedText style={styles.tokenText}>
              {expoPushToken.substring(0, 20)}...
            </ThemedText>
          </>
        )}
        
        <Spacer height={10} />
        <ThemedText style={styles.label}>Permission Status:</ThemedText>
        <ThemedText style={styles.value}>
          {permissionStatus || "Not checked"}
        </ThemedText>
      </ThemedView>

      <Spacer height={30} />

      <ThememButton onPress={checkPermissions}>
        <Text style={styles.buttonText}>Check Permissions</Text>
      </ThememButton>

      <ThememButton onPress={sendTestNotification}>
        <Text style={styles.buttonText}>Send Test Notification</Text>
      </ThememButton>

      <ThememButton onPress={clearNotifications}>
        <Text style={styles.buttonText}>Clear All Notifications</Text>
      </ThememButton>
    </ThemedView>
  );
};

export default NotificationTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  tokenText: {
    fontFamily: "monospace",
    fontSize: 12,
  },
  buttonText: {
    color: "#f2f2f2",
    fontWeight: "600",
  },
});