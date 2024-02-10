// Import the openDB method from the idb library
import { openDB } from "idb";

// Function to initialize the IndexedDB database
const initdb = async () =>
  // Open the 'jate' database with version 1
  openDB("jate", 1, {
    // Upgrade function called when the database is opened
    upgrade(db) {
      // Check if the object store 'jate' already exists
      if (db.objectStoreNames.contains("jate")) {
        // Log a message if the database already exists
        console.log("jate database already exists");
        return;
      }
      // Create the object store 'jate' with auto-incrementing key
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      // Log a message after creating the database
      console.log("jate database created");
    },
  });

// Function to add content to the database
export const putDb = async (content) => {
  // Open the 'jate' database
  const database = await openDB("jate", 1);
  // Start a read-write transaction
  const transaction = database.transaction("jate", "readwrite");
  // Get the object store
  const objectStore = transaction.objectStore("jate");
  // Put the content into the object store
  const result = await objectStore.put({ value: content });
  // Log a message after storing data
  console.log("Data stored in IndexedDB:", result);
};

// Function to retrieve all content from the database
export const getDb = async () => {
  // Open the 'jate' database
  const database = await openDB("jate", 1);
  // Start a read-only transaction
  const transaction = database.transaction("jate", "readonly");
  // Get the object store
  const objectStore = transaction.objectStore("jate");
  // Get all data from the object store
  const result = await objectStore.getAll();
  // Log a message after retrieving data
  console.log("Data retrieved from IndexedDB:", result);
  // Return the retrieved data
  return result.value;
};

// Initialize the database when the module is loaded
initdb();
