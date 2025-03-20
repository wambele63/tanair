import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Image, ScrollView, Text, TextInput, Pressable, View, Platform } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});
export async function getItem(key: string) {
   if(Platform.OS === "web") {
    if(typeof localStorage === "undefined") {
      return null;
    }
    return localStorage.getItem(key);
   }
   return AsyncStorage.getItem(key);
  }
  
export async function removeItem(key: string) {
  if(Platform.OS === "web") {
   if(typeof localStorage === "undefined") {
     return null;
   }
   return localStorage.removeItem(key);
  }
  return AsyncStorage.removeItem(key);
 }

 export async function setItem(key: string, value: string) {
   if(Platform.OS === "web") {
    if(typeof localStorage === "undefined") {
      return null;
    }
    return localStorage.setItem(key, value);
   }
   return AsyncStorage.setItem(key, value);
  }