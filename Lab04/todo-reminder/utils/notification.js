import { API_KEY, ONE_SIGNAL_APP_ID } from "../constants/config";

export const scheduleNotification = async (taskId, message, date) => {
  try {
    const sendAfter = new Date(date).toISOString();
    const response = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        Authorization: `Basic ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: ONE_SIGNAL_APP_ID,
        name: taskId,
        contents: { en: message },
        included_segments: ["All"],
        send_after: sendAfter,
      }),
    });

    const result = await response.json();
    return result.id;
  } catch (e) {
    console.error("Notification error:", e);
    return null;
  }
};

export const cancelNotification = async (notificationId) => {
  try {
    await fetch(
      `https://api.onesignal.com/notifications/${notificationId}?app_id=${ONE_SIGNAL_APP_ID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.error("Cancel notification error:", e);
  }
};
