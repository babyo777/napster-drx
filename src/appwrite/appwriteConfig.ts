import { Client, Databases } from "appwrite";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65c15bc8bfb586129eb4");

export const DATABASE_ID = "65c16b42a63bdf7ae90b";
export const PLAYLIST_COLLECTION_ID = "65d075413f130b648306";
export const ALBUM_COLLECTION_ID = "65e4ee1041c081071ca6";
export const LISTEN_NOW_COLLECTION_ID = "65d0c650c240cf202af4";
export const TRENDING_COLLECTION_ID = "65d0d537137bf0bb6237";
export const LIKE_SONG = "65daaf724f49c4ea1039";
export const FAV_ARTIST = "65e4b48e1e6c04f9d893";
export const INSIGHTS = "65d7e476ad0f598faa84";
export const ARTIST_INSIGHTS = "65d8e6554ce945db433b";
export const PLAYLIST_INSIGHTS = "65d8e65fc23147683f5b";
export const ALBUM_INSIGHTS = "65e16f879455cda020d4";
export const NEW_USER = "65d8aa90aa8c5dcaa2ce";
export const UPDATES = "65da232e478bcf5bbbad";
export const SPONSORS = "65e08a335e4df7351d5a";

export const db = new Databases(client);

export { ID } from "appwrite";
