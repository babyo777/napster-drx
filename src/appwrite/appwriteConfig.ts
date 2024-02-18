import { Client, Databases } from "appwrite";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65c15bc8bfb586129eb4");

export const DATABASE_ID = "65c16b42a63bdf7ae90b";
export const PLAYLIST_COLLECTION_ID = "65d075413f130b648306";
export const LISTEN_NOW_COLLECTION_ID = "65d0c650c240cf202af4";
export const TRENDING_COLLECTION_ID = "65d0d537137bf0bb6237";

export const db = new Databases(client);

export { ID } from "appwrite";
