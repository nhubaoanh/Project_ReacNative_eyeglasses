import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import io, { Socket } from "socket.io-client";

// Kết nối tới server Socket.IO
const socket: Socket = io("http://localhost:7890", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Định nghĩa kiểu tin nhắn
interface Message {
  message: string;
  sender: "user" | "staff";
  timestamp: Date;
}

export const ChatScreen: React.FC = () => {
  const { userId, staffId } = useLocalSearchParams<{
    userId: string;
    staffId: string;
  }>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStaffOnline, setIsStaffOnline] = useState<boolean>(false); // Trạng thái online của staff
  const flatListRef = useRef<FlatList>(null);

  const parsedUserId = parseInt(userId, 10);
  const parsedStaffId = parseInt(staffId, 10);
  const roomId = `chat_${parsedUserId}_${parsedStaffId}`;

  // Kết nối socket và xử lý tin nhắn
  useEffect(() => {
    if (!parsedUserId || !parsedStaffId) {
      console.error("Invalid userId or staffId");
      return;
    }

    // Tham gia phòng chat
    socket.emit("join_room", roomId);
    console.log(`Joined room: ${roomId}`);

    // Lắng nghe trạng thái online của staff
    socket.on("staff_status", (data: { staffId: number; online: boolean }) => {
      if (data.staffId === parsedStaffId) {
        setIsStaffOnline(data.online);
      }
    });

    // Lắng nghe tin nhắn
    const handleReceiveMessage = (data: {
      message: string;
      sender: "user" | "staff";
      room: string;
      timestamp: string;
    }) => {
      if (data.room === roomId) {
        setMessages((prev) => [
          ...prev,
          {
            message: data.message,
            sender: data.sender,
            timestamp: new Date(data.timestamp),
          },
        ]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    // Xử lý lỗi kết nối
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("staff_status");
      socket.off("connect_error");
      socket.emit("leave_room", roomId);
    };
  }, [roomId]);

  // Cuộn xuống cuối danh sách khi có tin nhắn mới
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Gửi tin nhắn
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      room: roomId,
      message,
      sender: "user",
      timestamp: new Date().toISOString(),
    });

    setMessage(""); // Xóa input
  };

  // Xử lý nhấn Enter
  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Chat với nhân viên hỗ trợ</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isStaffOnline ? "#34C759" : "#FF3B30" },
            ]}
          />
          <Text style={styles.statusText}>
            {isStaffOnline ? "Online" : "Offline"}
          </Text>
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              {
                alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
              },
            ]}
          >
            <Text
              style={[
                styles.message,
                {
                  backgroundColor:
                    item.sender === "user" ? "#DCF8C6" : "#ECECEC",
                },
              ]}
            >
              {item.message}
            </Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có tin nhắn nào</Text>
          </View>
        }
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nhập tin nhắn..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          multiline
          onKeyPress={handleKeyPress}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#34C759" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 15,
    backgroundColor: "#075E54",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  flatListContent: {
    padding: 10,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    alignSelf: "flex-end",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#F9F9F9",
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
});