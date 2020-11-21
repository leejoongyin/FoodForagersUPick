import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
// import { SelectMultipleButton, SelectMultipleGroupButton } from "react-native-selectmultiple-button";

function PreferencesScreen({ navigation }) {
  const [value, onChangeText] = React.useState('');
  // const multipleGroupData = [
  //   { value: "$" },
  //   { value: "$$" },
  //   { value: "$$$" }
  // ];
  // const ios_blue = "#007AFF";
  // this.state = {
  //   multipleSelectedData: [],
  //   multipleSelectedData_group: selectedValues1,
  //   multipleSelectedData_group_limited: []
  // };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Input Preferences</Text>
      <Text>Where would you like to eat?*</Text>
      <TextInput
        placeholder="Enter zipcode"
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Text>When would you like to eat?*</Text>
      <TextInput
        placeholder="Enter time"
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Text>Budget</Text>
      {/* <SelectMultipleGroupButton
        containerViewStyle={{
          justifyContent: "flex-start"
        }}
        highLightStyle={{
          borderColor: "gray",

          backgroundColor: "transparent",

          textColor: "gray",

          borderTintColor: ios_blue,

          backgroundTintColor: "transparent",

          textTintColor: ios_blue
        }}
        onSelectedValuesChange={selectedValues =>
          this._groupButtonOnSelectedValuesChange(selectedValues)
        }
        group={multipleGroupData}
      />; */}
      <Text>Dietary Requirements</Text>
      <Text>Cuisine</Text>
      <Text>Type of Restaurant</Text>
      <Text>Rating</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default PreferencesScreen;