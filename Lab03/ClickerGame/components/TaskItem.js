import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TaskItem = ({ task }) => {
  const isCompleted = task.progress >= task.goal;

  return (
    <View style={styles.item}>
      {isCompleted ? (
        <Text style={styles.text}>Completed</Text>
      ) : (
        <Text style={styles.text}>In Progress</Text>
      )}
      <Text style={[styles.text, isCompleted && styles.completed]}>
        {task.title} ({task.progress}/{task.goal})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: { fontSize: 16 },
  completed: {
    color: "green",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
});

export default TaskItem;
