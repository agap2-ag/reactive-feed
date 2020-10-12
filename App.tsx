import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from "react-native";

import { getImageFromId, alertAction } from './utils/api';

import Feed from "./screens/Feed";
import Comments from "./screens/Comments";

export default function App() {
  const [commentsForItem, setCommentsForItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        const commentsForItem = await AsyncStorage.getItem(
          ASYNC_STORAGE_COMMENTS_KEY
        );
        setCommentsForItem(commentsForItem ? JSON.parse(commentsForItem) : {});
      })();
    } catch (e) {
      console.log("Error reading comments...");
    }
  }, []);

  const openCommentsScreen = (id) => {
    setShowModal(true);
    setSelectedItemId(id);
  };

  const closeCommentsScreen = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  const onSubmitComment = async (text) => {
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    };

    try {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_COMMENTS_KEY,
        JSON.stringify(updated)
      );
    } catch (e) {
      console.log("Error saving comments");
    }

    setCommentsForItem(updated);
  };

  const onClearComments = async (id) => {
    alertAction(
      "Are you sure you want to clear comments from this card?",
      async () => {
        const updated = {
          ...commentsForItem,
          [id]: [],
        };
        try {
          await AsyncStorage.setItem(
            ASYNC_STORAGE_COMMENTS_KEY,
            JSON.stringify(updated)
          );
        } catch (e) {
          console.log("Error clearing");
        }
        setCommentsForItem(updated);
      },
    );
  };

  const onRefreshClear = async (id) => {
    alertAction(
      "Are you sure you want to clear comments from ALL cards?",
      async () => {
        try {
          await AsyncStorage.clear();
        } catch (e) {
          console.log("Error clearing storage");
        }

        setCommentsForItem({});
      }
    );
  };

  const ASYNC_STORAGE_COMMENTS_KEY = "ASYNC_STORAGE_COMMENTS_KEY";

  return (
    <View style={styles.container}>
      <Feed
        style={styles.feed}
        commentsForItem={commentsForItem}
        onPressComment={openCommentsScreen}
        onRefreshClear={onRefreshClear}
      />

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={closeCommentsScreen}
      >
        <Comments
          cardImage={{ uri: getImageFromId(selectedItemId) }}
          style={styles.comment}
          comments={commentsForItem[selectedItemId] || []}
          onClose={closeCommentsScreen}
          onSubmitComment={onSubmitComment}
          onClearComments={() => onClearComments(selectedItemId)}
        />
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
