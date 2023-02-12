import TextView from '@components/TextView/TextView';
import {LOGIN_SCREEN_KEY} from '@navigation/Routes';
import {Colors} from '@resources/Colors';
import {CommonStyles} from '@resources/CommonStyles';
import {Strings} from '@resources/Strings';
import {DashboardProps, FunctionReturnAnyWithParams} from '@resources/Types';
import {widthPercentageToDP as wp} from '@utils/ResponsiveScreen';
import React, {useCallback} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
const {
  flexOne,
  marginHorizontalTen,
  marginTopFour,
  paddingVerticalOne,
  borderRadiusThreeHalf,
  alignSelfCenter,
  marginTopThree,
  marginBottomSix,
  textAlignCenter,
  alignItemsCenter,
  paddingHorizontalOne,
  flexDirectionRow,
} = CommonStyles;

const {DASHBOARD, LOGOUT, WELCOME_TO_FUTURE, KEEP_NAME_MSG} = Strings;

const {white, darkBgColor, primaryColor, errorColor} = Colors;

const Dashboard = (props: DashboardProps) => {
  const {navigation, route} = props;
  const {params} = route;

  const onLogoutPress: FunctionReturnAnyWithParams = useCallback(() => {
    navigation.navigate(LOGIN_SCREEN_KEY);
  }, [navigation]);

  const navigateTo = useCallback((key: any, param: any) => {
    navigation.navigate(key, param);
  }, []);

  const commonButtonView = useCallback(
    (
      title: string,
      // onPress?: FunctionReturnAnyWithParams,
      buttonSize?: string,
      bgColor?: string,
    ) => {
      let buttonWidth = wp(40);
      switch (buttonSize) {
        case 'extraSmall':
          buttonWidth = wp(15);
          break;
        case 'small':
          buttonWidth = wp(20);
          break;
        case 'medium':
          buttonWidth = wp(30);
          break;
        case 'large':
          buttonWidth = wp(45);
          break;
        case 'extraLarge':
          buttonWidth = wp(60);
          break;
        case 'xl':
          buttonWidth = wp(70);
          break;
        case 'xxl':
          buttonWidth = wp(80);
          break;
        default:
          buttonWidth = wp(40);
          break;
      }
      return (
        <TouchableOpacity
          // onPress={onPress}
          style={[
            {
              backgroundColor: bgColor || primaryColor,
              width: buttonWidth,
            },
            alignItemsCenter,
            alignSelfCenter,
            borderRadiusThreeHalf,
            paddingHorizontalOne,
            marginHorizontalTen,
            paddingVerticalOne,
            marginTopFour,
          ]}>
          <TextView color={white} title>
            {title}
          </TextView>
        </TouchableOpacity>
      );
    },
    [],
  );

  const featuresView = useCallback(() => {
    return (
      <View style={marginTopFour}>
        {commonButtonView('Give a Name 🤩', 'large', undefined)}
        {commonButtonView('Get Random 🙈', 'large', undefined)}
      </View>
    );
  }, [commonButtonView]);

  return (
    <>
      <SafeAreaView style={[flexOne, {backgroundColor: darkBgColor}]}>
        <View style={[flexOne]}>
          <View style={[marginTopThree, flexDirectionRow]}>
            <TextView
              color={white}
              medium
              subHeading
              style={[flexOne, textAlignCenter, alignSelfCenter]}>
              {DASHBOARD}
            </TextView>
            <TextView>S</TextView>
          </View>
          <TextView
            color={white}
            medium
            title
            style={[marginTopThree, textAlignCenter]}>
            {`Hi ${params.name}, ${WELCOME_TO_FUTURE}`}
          </TextView>
          <TextView
            color={white}
            medium
            title
            style={[marginTopThree, marginHorizontalTen, textAlignCenter]}>
            {KEEP_NAME_MSG}
          </TextView>
          {featuresView()}
        </View>
        <TouchableOpacity onPress={onLogoutPress}>
          <TextView
            color={errorColor}
            title
            bold
            style={[marginBottomSix, alignSelfCenter]}>
            {LOGOUT}
          </TextView>
        </TouchableOpacity>
      </SafeAreaView>
      {/* {renderNameModal()} */}
    </>
  );
};

export default Dashboard;
