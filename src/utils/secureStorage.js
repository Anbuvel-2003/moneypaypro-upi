import * as Keychain from 'react-native-keychain';

/**
 * Saves an item securely in the keychain.
 * @param {string} key - The key to store.
 * @param {string} value - The value to store (must be a string).
 */
export const saveItem = async (key, value) => {
  try {
    await Keychain.setGenericPassword(key, value, { service: key });
    return true;
  } catch (error) {
    console.error(`Error saving item ${key}:`, error);
    return false;
  }
};

/**
 * Retrieves an item securely from the keychain.
 * @param {string} key - The key to retrieve.
 * @returns {string|null} - The stored value or null if not found.
 */
export const getItem = async (key) => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: key });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

/**
 * Removes an item from the keychain.
 * @param {string} key - The key to remove.
 */
export const removeItem = async (key) => {
  try {
    await Keychain.resetGenericPassword({ service: key });
    return true;
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
    return false;
  }
};
