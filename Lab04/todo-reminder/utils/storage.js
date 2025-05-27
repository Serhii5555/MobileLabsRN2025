import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadTasks = async () => {
  try {
    const saved = JSON.parse(await AsyncStorage.getItem("tasks")) || [];
    return saved;
  } catch (e) {
    console.error("Load error:", e);
    return [];
  }
};

export const saveTasks = async (updated) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(updated));
  } catch (e) {
    console.error("Save error:", e);
  }
};
