import TextView from '@components/TextView/TextView';
import {Colors} from '@resources/Colors';
import {CommonStyles} from '@resources/CommonStyles';
import {HeaderProps} from '@resources/Types';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {
  flexOne,
  marginTopThree,
  alignItemsCenter,
  marginHorizontalTwo,
  flexDirectionRow,
} = CommonStyles;

const {white} = Colors;

const Header = (props: HeaderProps) => {
  const {navigation, title} = props;
  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={[
        flexDirectionRow,
        marginHorizontalTwo,
        alignItemsCenter,
        marginTopThree,
      ]}>
      <TouchableOpacity onPress={onBackPress}>
        <TextView color={white} subHeading medium>
          🔙
        </TextView>
      </TouchableOpacity>
      <View style={[flexOne, alignItemsCenter]}>
        <TextView color={white} medium subHeading>
          {title}
        </TextView>
      </View>
    </View>
  );
};

export default Header;
