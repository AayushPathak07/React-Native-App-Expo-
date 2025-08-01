import {
  Client,
  Account,
  Avatars,
  Databases as AppwriteDatabases,
} from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("http://nginx.aayushpathak.com/v1")
  .setProject("688cbaaa000adfce8701")
  .setPlatform("com.aayush.testapp");

export const account = new Account(client);
export const avatars = new Avatars(client);
export const Databases = new AppwriteDatabases(client);
