import TextView from '@components/TextView/TextView';
import {CHAT_SCREEN_KEY, PROFILE_DETAILS_KEY} from '@navigation/Routes';
import {Colors} from '@resources/Colors';
import {CommonStyles} from '@resources/CommonStyles';
import {Strings} from '@resources/Strings';
import {DashboardProps, FunctionReturnAnyWithParams} from '@resources/Types';
import {ResponsiveFontValue as RFValue} from '@utils/ResponsiveFonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '@utils/ResponsiveScreen';
import React, {useCallback, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import {Button, Modal, Portal, Provider} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {
  flexOne,
  marginHorizontalTen,
  marginTopFour,
  paddingVerticalOne,
  borderRadiusThreeHalf,
  alignSelfCenter,
  marginTopThree,
  textAlignCenter,
  alignItemsCenter,
  paddingHorizontalOne,
  flexDirectionRow,
  marginHorizontalFour,
  borderWidthPointTwo,
  paddingPointTwoFive,
  paddingHorizontalTwo,
  justifyContentCenter,
  marginTopZero,
  borderWidthPointFive,
} = CommonStyles;

const {DASHBOARD, WELCOME_TO_FUTURE, KEEP_NAME_MSG, GIVE_NAME_TITLE, NAME_EG} =
  Strings;

const {
  white,
  darkBgColor,
  primaryColor,
  textInputBgColor,
  placeHolderColor,
  commonTextColor,
  errorColor,
  black,
} = Colors;

const Dashboard = (props: DashboardProps) => {
  const {navigation, route} = props;
  const {params} = route;

  const [showGiveNameModal, setGiveNameModal] = useState(false);
  const [showRandomNameModal, setRandomNameModal] = useState(false);
  const [aiName, setAIName] = useState('');

  const navigateTo = useCallback((key: any, param: any) => {
    navigation.navigate(key, param);
  }, []);

  const commonButtonView = useCallback(
    (
      title: string,
      setState?: FunctionReturnAnyWithParams,
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
          onPress={() => setState!(true)}
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

  const renderCommonModal = useCallback(
    (
      stateVal: boolean,
      setState: Function,
      childView: FunctionReturnAnyWithParams,
      height?: Number,
    ) => {
      const containerStyle = {
        backgroundColor: 'white',
        // flex: 1,
        height: height || '70%',
        marginTop: 100,
      };

      return (
        <Portal>
          <View style={{flex: 1}}>
            <Modal
              visible={stateVal}
              onDismiss={undefined}
              contentContainerStyle={[
                containerStyle,
                borderWidthPointFive,
                alignItemsCenter,
                {
                  backgroundColor: textInputBgColor,
                  borderRadius: 20,
                  margin: 20,
                  borderColor: 'teal',
                },
              ]}>
              <View style={{flex: 1}}>{childView()}</View>
              <TouchableOpacity
                onPress={() => {
                  setState(false);
                }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  backgroundColor: 'teal',
                  position: 'absolute',
                  bottom: -80,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextView color={white} subHeading>
                  X
                </TextView>
              </TouchableOpacity>
            </Modal>
          </View>
        </Portal>
      );
    },
    [],
  );

  const onPressStartChatting = useCallback(() => {
    setGiveNameModal(false);
    navigateTo(CHAT_SCREEN_KEY, {title: aiName});
  }, []);

  const giveNameView = useCallback(() => {
    const errorStyle = false
      ? [
          {borderColor: errorColor},
          paddingPointTwoFive,
          borderRadiusThreeHalf,
          borderWidthPointTwo,
        ]
      : [
          {borderColor: white, borderBottomWidth: hp(0.05)},
          paddingHorizontalTwo,
        ];
    return (
      <View style={[marginHorizontalFour]}>
        <TextView style={[marginTopFour, textAlignCenter]} color={white} title>
          {GIVE_NAME_TITLE}
        </TextView>
        <View style={[marginTopThree, justifyContentCenter, alignItemsCenter]}>
          <TextView style={textAlignCenter} color={white} largeDescription>
            {"Set my AI buddy's name \n as \n"}
          </TextView>
          <View style={[errorStyle]}>
            <TextInput
              value={aiName}
              onChangeText={val => setAIName(val)}
              placeholder={NAME_EG}
              placeholderTextColor={placeHolderColor}
              // autoCapitalize={"none"}
              style={[
                textAlignCenter,
                marginTopZero,
                {
                  width: wp(35),
                  fontSize: RFValue(19),
                  color: commonTextColor,
                  backgroundColor: textInputBgColor,
                  flexWrap: 'wrap',
                  fontWeight: 'bold',
                },
              ]}
            />
          </View>
          <Button
            mode="elevated"
            style={marginTopFour}
            onPress={onPressStartChatting}>
            Start Chatting
          </Button>
        </View>
      </View>
    );
  }, [aiName]);

  const randomNameView = useCallback(() => {}, []);

  const featuresView = useCallback(() => {
    return (
      <View style={marginTopFour}>
        {commonButtonView(
          'Give a Name 🤩',
          setGiveNameModal,
          'large',
          undefined,
        )}
        {/* {onGiveNamePress()} */}
        {commonButtonView(
          'Get Random 🙈',
          setRandomNameModal,
          'large',
          undefined,
        )}
      </View>
    );
  }, [commonButtonView]);

  const onSettingsPress = useCallback(() => {
    navigateTo(PROFILE_DETAILS_KEY, params);
  }, []);

  return (
    <Provider>
      <SafeAreaView style={[flexOne, {backgroundColor: darkBgColor}]}>
        <View style={[flexOne]}>
          <View
            style={[
              marginTopThree,
              flexDirectionRow,
              alignItemsCenter,
              marginHorizontalFour,
            ]}>
            <TextView
              color={white}
              medium
              subHeading
              style={[flexOne, textAlignCenter, alignSelfCenter]}>
              {DASHBOARD}
            </TextView>
            <TouchableOpacity onPress={onSettingsPress}>
              <AntDesign
                name="setting"
                style={{color: primaryColor, fontSize: 35}}
              />
            </TouchableOpacity>
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
      </SafeAreaView>
      {/* {renderNameModal()} */}

      {/* Give a Name Modal */}
      {showGiveNameModal &&
        renderCommonModal(
          showGiveNameModal,
          setGiveNameModal,
          giveNameView,
          '60%',
        )}

      {/* Random Name Modal */}
      {showRandomNameModal &&
        renderCommonModal(
          showRandomNameModal,
          setRandomNameModal,
          randomNameView,
        )}
    </Provider>
  );
};

export default Dashboard;
