import Header from '@components/Header/Header';
import TextView from '@components/TextView/TextView';
import {LOGIN_SCREEN_KEY} from '@navigation/Routes';
import {Colors} from '@resources/Colors';
import {CommonStyles} from '@resources/CommonStyles';
import {Strings} from '@resources/Strings';
import {DashboardProps, FunctionReturnAnyWithParams} from '@resources/Types';
import React, {useCallback} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';

const {
  marginHorizontalSeven,
  marginTopFive,
  marginTopFour,
  paddingHorizontalThree,
  paddingVerticalOne,
  borderRadiusThreeHalf,
  marginTopTwo,
  marginBottomSix,
  alignSelfCenter,
  flexOne,
  flexDirectionRow,
} = CommonStyles;

const {EMAIL, PROFILE_DETAILS, MOBILE_NUMBER, LOGOUT} = Strings;

const {primaryColor, errorColor, darkBgColor, textInputBgColor, labelColor} =
  Colors;

const ProfileDetails = (props: DashboardProps) => {
  const {route, navigation} = props;

  const renderItemDataView = useCallback(
    (label: string, value: string | number, style?: object) => {
      return (
        <View style={[style, paddingHorizontalThree, paddingVerticalOne]}>
          <TextView title bold color={labelColor}>{`${label}: `}</TextView>
          <TextView style={marginTopTwo} color={primaryColor}>
            {value}
          </TextView>
        </View>
      );
    },
    [],
  );

  const renderUserDataView: FunctionReturnAnyWithParams = useCallback(() => {
    const {params} = route;
    const {email, mobileNo} = params;

    return (
      <>
        <View
          style={[
            paddingHorizontalThree,
            paddingVerticalOne,
            marginTopFive,
            {backgroundColor: textInputBgColor},
            borderRadiusThreeHalf,
          ]}>
          {renderItemDataView(EMAIL, email)}
          {renderItemDataView(MOBILE_NUMBER, mobileNo, marginTopFour)}
        </View>
      </>
    );
  }, [route, renderItemDataView]);

  const onLogoutPress: FunctionReturnAnyWithParams = useCallback(() => {
    navigation.navigate(LOGIN_SCREEN_KEY);
  }, [navigation]);

  return (
    <SafeAreaView style={[flexOne, {backgroundColor: darkBgColor}]}>
      <View style={[flexOne, marginHorizontalSeven]}>
        <Header navigation={navigation} title={PROFILE_DETAILS} />
        {renderUserDataView()}
      </View>
      <TouchableOpacity
        style={[flexDirectionRow, alignSelfCenter]}
        onPress={onLogoutPress}>
        <View style={[marginBottomSix]}>
          <TextView color={errorColor} title medium>
            {LOGOUT}
          </TextView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileDetails;
