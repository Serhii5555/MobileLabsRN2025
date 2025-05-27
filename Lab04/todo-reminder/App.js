import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { OneSignal } from "react-native-onesignal";
import uuid from "react-native-uuid";

import { ONE_SIGNAL_APP_ID } from "./constants/config";
import { loadTasks, saveTasks } from "./utils/storage";
import { scheduleNotification, cancelNotification } from "./utils/notification";
import TaskItem from "./components/TaskItem";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!ONE_SIGNAL_APP_ID) return;

    OneSignal.Debug.setLogLevel(6);
    OneSignal.initialize(ONE_SIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(true);
    OneSignal.User.pushSubscription.optIn();

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (event) => {
        event.preventDefault();
        event.notification.display();
      }
    );

    loadTasks().then(setTasks);
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert("Помилка", "Введіть назву задачі");
      return;
    }

    const taskId = uuid.v4();
    const notificationId = await scheduleNotification(taskId, title, date);
    const newTask = {
      id: taskId,
      title,
      description,
      deadline: date,
      completed: false,
      notificationId,
    };
    const updated = [...tasks, newTask];
    await saveTasks(updated);
    setTasks(updated);
    setTitle("");
    setDescription("");
    setDate(new Date());
  };

  const deleteTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updated = tasks.filter((t) => t.id !== id);
    await saveTasks(updated);
    setTasks(updated);
    if (task?.notificationId) {
      await cancelNotification(task.notificationId);
    }
  };

  const toggleCompleteTask = async (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    await saveTasks(updated);
    setTasks(updated);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Додати завдання</Text>
      <TextInput
        placeholder="Назва"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Опис"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <DatePicker date={date} onDateChange={setDate} mode="datetime" />
      <Button title="Додати нагадування" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={toggleCompleteTask}
            onDelete={deleteTask}
          />
        )}
      />
    </SafeAreaView>
  );
}
