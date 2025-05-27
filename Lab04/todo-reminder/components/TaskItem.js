import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TaskItem = ({ item, onToggle, onDelete }) => (
  <View
    style={{
      padding: 10,
      borderWidth: 1,
      marginBottom: 10,
      backgroundColor: item.completed ? "#d3ffd3" : "white",
    }}
  >
    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
    <Text>{item.description}</Text>
    <Text>{new Date(item.deadline).toLocaleString()}</Text>
    <TouchableOpacity
      onPress={() => onToggle(item.id)}
      style={{ marginTop: 5 }}
    >
      <Text style={{ color: "green" }}>
        {item.completed ? "Скасувати виконання" : "Позначити як виконане"}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onDelete(item.id)}
      style={{ marginTop: 5 }}
    >
      <Text style={{ color: "red" }}>Видалити</Text>
    </TouchableOpacity>
  </View>
);

export default TaskItem;
