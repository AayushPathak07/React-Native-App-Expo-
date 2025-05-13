import { StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThememButton from "../../components/ThememButton";

const Login = () => {
  const handleSubmit = () => {
    console.log("login form submitted");
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Login to Your Account
      </ThemedText>
      <ThememButton onPress={handleSubmit}>
        <Text style={{ color: "#f2f2f2" }}>Login</Text>
      </ThememButton>
      <Spacer height={100} />
      <Link href="/register">
        <ThemedText style={{ textAlign: "center" }}>
          Register instead
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "cetner",
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
});
