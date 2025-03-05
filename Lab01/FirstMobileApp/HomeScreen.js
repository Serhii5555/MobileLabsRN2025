import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const newsData = Array(8).fill({
  title: "Заголовок новини",
  date: "Дата новини",
  shortText: "Короткий текст новини",
  image: "https://placehold.co/300.png",
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Новини</Text>
      <FlatList
        data={newsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.shortText}>{item.shortText}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  newsItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  image: { width: 50, height: 50, borderRadius: 5 },
  textContainer: { marginLeft: 10, flex: 1 },
  title: { fontWeight: "bold", fontSize: 16 },
  date: { fontSize: 12, color: "gray" },
  shortText: { fontSize: 14 },
});

export default HomeScreen;
