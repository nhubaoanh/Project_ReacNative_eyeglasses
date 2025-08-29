import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Đăng nhập</Text>

        <View style={styles.loginContainer}>
            <TextInput
                placeholder="Tên đăng nhập"
                placeholderTextColor={Colors.textSecondary}
                style={styles.input}
                />
                <TextInput
                placeholder="Mật khẩu"
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry
                style={styles.input}
                />

            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Sizes.md,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: Sizes.lg,
    color: Colors.primary,
  },
  loginContainer: {
    backgroundColor: Colors.white,
    padding: Sizes.lg,
    borderRadius: Sizes.md,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Sizes.sm,
    padding: Sizes.md,
    marginBottom: Sizes.md,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Sizes.md,
    borderRadius: Sizes.sm,
    alignItems: "center",
    marginTop: Sizes.md,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotText: {
    textAlign: "center",
    color: Colors.secondary,
    marginTop: Sizes.md,
  },
});
