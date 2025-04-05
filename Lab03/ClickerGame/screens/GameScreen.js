import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import ScoreCounter from "../components/ScoreCounter";
import ClickableObject from "../components/ClickableObject";
import { initialTasks } from "../utils/tasks";

export default function GameScreen({ navigation }) {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState(initialTasks);

  const handleScoreChange = (points) => {
    setScore((prev) => prev + points);
    updateTaskProgress("score100", points);
  };

  const updateTaskProgress = (taskKey, increment = 1) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === taskKey && task.progress < task.goal
          ? { ...task, progress: task.progress + increment }
          : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScoreCounter score={score} />
      <ClickableObject
        onScoreChange={handleScoreChange}
        updateTaskProgress={updateTaskProgress}
      />
      <Button
        title="Завдання"
        onPress={() => navigation.navigate("Tasks", { tasks })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
  