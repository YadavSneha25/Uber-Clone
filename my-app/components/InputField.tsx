import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, View, Text, StyleSheet, Image, TextInput, TextInputProps, ViewStyle, TextStyle, ImageStyle, Platform, Keyboard } from 'react-native';

// Define the types for the props
interface InputFieldProps extends TextInputProps {
  label: string;
  labelStyle?: TextStyle;
  icon?: any; // Replace 'any' with the specific type for your icon (e.g., ImageSourcePropType)
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconStyle?: ImageStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  ...props
}) => (
  <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"} style={styles.keyboardAvoidingView}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {/* Input container with icon */}
        <View style={[styles.inputContainer, containerStyle]}>
          {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
          <TextInput
            style={[styles.input, inputStyle]}
            secureTextEntry={secureTextEntry}
            {...props}   
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Jakarta-SemiBold', // Ensure the font is correctly linked
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // Neutral background color
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#d1d5db', // Border color for neutral state
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Jakarta-SemiBold', // Ensure the font is correctly linked
    fontSize: 15,
    paddingLeft: 10,
  },
});

export default InputField;
