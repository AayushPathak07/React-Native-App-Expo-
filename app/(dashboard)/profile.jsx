import { StyleSheet, Text } from "react-native";

import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import { useUser } from "../../hooks/useUser";
import ThememButton from "../../components/ThememButton";
import NotificationTest from "../../components/NotificationTest";

const Profile = () => {
  const { user, logout, expoPushToken } = useUser();

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText title={true} style={styles.heading}>
        {user.email}
      </ThemedText>
      <Spacer />

      <ThemedText>Time to start reading some books...</ThemedText>
      <Spacer />
      
      <ThemedText style={styles.tokenInfo}>
        Push Notifications: {expoPushToken ? "✅ Enabled" : "❌ Disabled"}
      </ThemedText>
      <Spacer />
      
      <NotificationTest />
      <Spacer />

      <ThememButton onPress={logout}>
        <Text style={{ color: "#f2f2f2" }}>Logout</Text>
      </ThememButton>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  tokenInfo: {
    fontSize: 14,
    textAlign: "center",
  },
});
