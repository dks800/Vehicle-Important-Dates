import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { FirebaseConfig } from "./keys";

initializeApp(FirebaseConfig);
const database = getDatabase();
export default database;
