import AsyncStorage from '@react-native-async-storage/async-storage';
import valZip from '../model/validateZip';

export default class localController {
  static async storeData(key,value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key,jsonValue).then(() => console.log(`localController.js: Stored {${key}: ${jsonValue}}`));
    } catch (e) {
      console.log(`Error storing data!\n${e}`)
    }
  }

  static async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key).then((key) => {
        return key;
      });
      return jsonValue ? JSON.parse(jsonValue) : null
    } catch(e) {
      console.log(`Error reading data!\n${e}`)
    }
  }

  static validateZip(zipcode) { return valZip(zipcode) }
}
