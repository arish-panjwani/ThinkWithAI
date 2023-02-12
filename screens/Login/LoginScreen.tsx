/** @format */

import TextView from '@components/TextView/TextView';
import {DASHBOARD_SCREEN_KEY, SIGNUP_SCREEN_KEY} from '@navigation/Routes';
import {Colors} from '@resources/Colors';
import {CommonStyles} from '@resources/CommonStyles';
import {Strings} from '@resources/Strings';
import {
  FunctionReturnAnyWithParams,
  LoginScreenProps,
  ObjectOrArray,
} from '@resources/Types';
import {
  getPreferences,
  PREF_ALL_USER_CREDENTIALS,
  PREF_REMEMBERED_CREDENTIAL,
  setPreferences,
} from '@utils/AsyncStorageHelper';
import {ResponsiveFontValue as RFValue} from '@utils/ResponsiveFonts';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

const {
  flexOne,
  alignItemsCenter,
  justifyContentCenter,
  marginHorizontalSeven,
  marginTopFive,
  marginTopFour,
  marginTopOne,
  paddingHorizontalThree,
  marginRightTwo,
  alignSelfEnd,
  marginVerticalOne,
  paddingPointTwoFive,
  borderWidthPointTwo,
  paddingVerticalOne,
  borderRadiusThreeHalf,
  borderRadiusTwo,
  alignSelfCenter,
  textUnderline,
  flexDirectionRow,
  borderRadiusThree,
} = CommonStyles;

const {
  PASSWORD,
  LOGIN,
  EMAIL,
  NEED_AN_ACC,
  SIGN_UP_FIRST_CAP,
  EMAIL_PLACEHOLDER,
  PASS_PLACEHOLDER,
  LOGIN_SUCCESS,
  INVALID_EMAIL,
  INVALID_PASS,
  YAY,
  OK,
  INVALID_CREDENTIALS,
  THINK_WITH_AI,
  REMEMBER_ME,
} = Strings;

const {
  white,
  primaryColor,
  primaryDisabledColor,
  errorColor,
  darkBgColor,
  labelColor,
  textInputBgColor,
  placeHolderColor,
  commonTextColor,
} = Colors;

const LoginScreen: React.FC<LoginScreenProps> = props => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isRememberEnabled, setIsRememberEnabled] = useState(false);
  const existingUserData: ObjectOrArray = useRef<ObjectOrArray>([]);
  const rememberedData: ObjectOrArray = useRef<ObjectOrArray>([]);

  useEffect(() => {
    setRememberedData();
  }, []);

  const setRememberedData = async () => {
    rememberedData.current = await getPreferences(PREF_REMEMBERED_CREDENTIAL);
    if (![null, '', undefined].includes(rememberedData.current)) {
      const rememberedParsedData = JSON.parse(rememberedData.current);
      setEmail(rememberedParsedData.email);
      setPassword(rememberedParsedData.password);
      setIsRememberEnabled(true);
    }
  };

  const clearErrorStates = () => {
    setEmailError('');
    setPasswordError('');
  };

  const clearValueStates = () => {
    setEmail('');
    setPassword('');
  };

  const {navigation} = props;

  const isDisabled = email === '' || password === '';

  const labelValItem: FunctionReturnAnyWithParams = useCallback(
    (
      label: string,
      value: string,
      setValue: FunctionReturnAnyWithParams,
      validDataTxt: string,
      errorMsg: string,
      secureTextEntry = false,
    ): JSX.Element => {
      const isError = errorMsg !== '';
      const errorStyle = isError
        ? [
            {borderColor: errorColor},
            paddingPointTwoFive,
            borderRadiusThreeHalf,
            borderWidthPointTwo,
          ]
        : undefined;
      return (
        <View style={[justifyContentCenter, marginTopFour]}>
          <TextView description color={labelColor}>{`${label}:`}</TextView>
          <View style={[errorStyle, marginTopOne, borderRadiusThree]}>
            <TextInput
              onFocus={clearErrorStates}
              onChangeText={val => {
                val = val.trim();
                setValue(val);
              }}
              placeholder={validDataTxt}
              placeholderTextColor={placeHolderColor}
              autoCapitalize={'none'}
              style={[
                paddingHorizontalThree,
                paddingVerticalOne,
                borderRadiusTwo,
                {
                  fontSize: RFValue(19),
                  color: commonTextColor,
                  backgroundColor: textInputBgColor,
                },
              ]}
              value={value}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {errorMsg && errorMsg !== '' && (
            <View>
              <TextView color={errorColor} note>
                {errorMsg}
              </TextView>
            </View>
          )}
        </View>
      );
    },
    [],
  );

  const navigateTo: FunctionReturnAnyWithParams = useCallback(
    (key, params = undefined) => {
      setTimeout(() => {
        if (!isRememberEnabled) {
          clearValueStates();
        }
        clearErrorStates();
        navigation.navigate(key, params);
      }, 0);
    },
    [navigation, isRememberEnabled],
  );

  const validate: FunctionReturnAnyWithParams = useCallback(() => {
    let isValid = true;
    // Email Validation
    if (!(email.includes('@') && email.includes('.'))) {
      isValid = false;
      setEmailError(INVALID_EMAIL);
    }
    // Password Validation
    if (password.length < 6) {
      isValid = false;
      setPasswordError(INVALID_PASS);
    }

    return isValid;
  }, [email, password]);

  const getDataInPreference: FunctionReturnAnyWithParams =
    useCallback(async () => {
      const allUserData: string | null = await getPreferences(
        PREF_ALL_USER_CREDENTIALS,
      );
      const parsedAllData =
        allUserData && allUserData !== undefined && allUserData !== ''
          ? JSON.parse(allUserData)
          : [];

      existingUserData.current = parsedAllData.find(
        (item: {
          name: string;
          email: string;
          mobileNo: string;
          password: string;
        }): boolean => item.email === email,
      );

      // Check if data exists
      if (existingUserData?.current !== undefined) {
        // Check if data is correct
        if (existingUserData?.current?.password === password) {
          if (isRememberEnabled) {
            setPreferences(
              PREF_REMEMBERED_CREDENTIAL,
              JSON.stringify(existingUserData.current),
            );
          }
          return true;
        }
      }
      return false;
    }, [isRememberEnabled, email, password]);

  const onLoginSuccess = useCallback(() => {
    setPreferences(
      PREF_REMEMBERED_CREDENTIAL,
      isRememberEnabled ? JSON.stringify(existingUserData.current) : '',
    );
    navigateTo(DASHBOARD_SCREEN_KEY, existingUserData.current);
  }, [isRememberEnabled, navigateTo]);

  const onLoginPress: FunctionReturnAnyWithParams = useCallback(async () => {
    clearErrorStates();
    if (validate()) {
      if (await getDataInPreference()) {
        Alert.alert(YAY, LOGIN_SUCCESS, [
          {
            text: OK,
            onPress: onLoginSuccess,
          },
        ]);
      } else {
        setPasswordError(INVALID_CREDENTIALS);
      }
    }
  }, [getDataInPreference, onLoginSuccess, validate]);

  const renderInputFields = useCallback(() => {
    // setRememberedData();
    return (
      <>
        {labelValItem(EMAIL, email, setEmail, EMAIL_PLACEHOLDER, emailError)}
        {labelValItem(
          PASSWORD,
          password,
          setPassword,
          PASS_PLACEHOLDER,
          passwordError,
          true,
        )}
      </>
    );
  }, [email, emailError, labelValItem, password, passwordError]);

  return (
    <SafeAreaView style={[flexOne, {backgroundColor: darkBgColor}]}>
      <View style={[marginHorizontalSeven]}>
        <TextView
          color={white}
          subHeading
          medium
          style={[marginTopFive, alignSelfCenter]}>
          {THINK_WITH_AI}
        </TextView>
        {renderInputFields()}
        {!isDisabled && (
          <View style={[marginVerticalOne, marginRightTwo, alignSelfEnd]}>
            <ToggleSwitch
              isOn={isRememberEnabled}
              onColor={primaryColor}
              offColor={placeHolderColor}
              label={REMEMBER_ME}
              labelStyle={{
                color: isDisabled ? placeHolderColor : white,
              }}
              size="small"
              animationSpeed={500}
              onToggle={() => {
                setIsRememberEnabled(!isRememberEnabled);
              }}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={onLoginPress}
          disabled={isDisabled}
          style={[
            {
              backgroundColor: isDisabled ? primaryDisabledColor : primaryColor,
            },
            alignItemsCenter,
            borderRadiusThreeHalf,
            paddingVerticalOne,
            isDisabled ? marginTopFive : marginTopOne,
            marginHorizontalSeven,
          ]}>
          <TextView medium color={isDisabled ? placeHolderColor : white} title>
            {LOGIN}
          </TextView>
        </TouchableOpacity>
        <View style={[flexDirectionRow, marginTopOne, alignSelfCenter]}>
          <TextView color={labelColor}>{NEED_AN_ACC}</TextView>
          <TouchableOpacity
            onPress={() => {
              navigateTo(SIGNUP_SCREEN_KEY);
            }}>
            <TextView
              medium
              style={textUnderline}
              color={primaryColor}>{` ${SIGN_UP_FIRST_CAP}`}</TextView>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
