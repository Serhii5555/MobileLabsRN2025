import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function TasksScreen({ route }) {
  const { tasks } = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Text style={styles.task}>
            {item.title}: {item.progress}/{item.goal}{" "}
            {item.progress >= item.goal ? "✅" : ""}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  task: { fontSize: 16, marginBottom: 8 },
});
