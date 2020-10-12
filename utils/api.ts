import { Alert, Platform } from "react-native";
import Constants from "expo-constants";

const fetchImages: [any] = async () => {
  const response: Promise<Response> = await fetch("https://unsplash.it/list");
  return await response.json();
};

const getImageFromId: string = (id) =>
  `https://unsplash.it/${600}/${600}?image=${id}`;

function getAvatarColor(name: string): string {
  const hexCode: string = name
    .split("")
    .reduce((acc, char) => (acc * char.charCodeAt(0)) % 0xffffff, 1)
    .toString(16);

  return `#${"0".repeat(6 - hexCode.length) + hexCode}`;
}

function getInitials(fullname: string): string {
  const match = fullname.match(/(\w)?\w*\s*(\w)?/);
  return match ? match.slice(1).join("") : "";
}

const platformVersion: number =
  Platform.OS === "ios"
    ? parseInt(Platform.Version, 10)
    : Number(Platform.Version);

const deviceTopMargin: number =
  Platform.OS === "android" || platformVersion < 11
    ? Constants.statusBarHeight
    : 0;

function alertAction(title: string, action: Function) {
  Alert.alert("Title", title, [
    {
      text: "Cancel",
      onPress: () => {
        console.log("action canceled");
      },
    },
    {
      text: "Confirm",
      onPress: action,
    },
  ]);
}

export {
  fetchImages,
  getImageFromId,
  deviceTopMargin,
  getAvatarColor,
  getInitials,
  alertAction,
};
