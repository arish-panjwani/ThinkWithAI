import Header from '@components/Header/Header';
import TextView from '@components/TextView/TextView';
import {Colors} from '@resources/Colors';
import {CommonStyles} from '@resources/CommonStyles';
import {Strings} from '@resources/Strings';
import axios from 'axios';
import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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
  marginVerticalThree,
  flexDirectionRow,
} = CommonStyles;

const {EMAIL, PROFILE_DETAILS, MOBILE_NUMBER, LOGOUT} = Strings;

const {primaryColor, errorColor, darkBgColor, textInputBgColor, labelColor} =
  Colors;

const ChatScreen = (props: any) => {
  const [data, setData] = useState([]);
  const {route, navigation} = props;
  const {params} = route;
  const {title} = params;
  const apiKey = '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';
  const apiUrl =
    'https://api.openai.com/v1/engines/text-davinci-002/completions';
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const text = response.data.choices[0].text;
    setData([
      ...data,
      {type: 'user', text: textInput},
      {type: 'bot', text: text},
    ]);
    setTextInput('');
  };

  return (
    // <SafeAreaView style={[flexOne, {backgroundColor: darkBgColor}]}>
    //   <View style={[marginHorizontalSeven]}>
    //     <Header navigation={navigation} title={title} />
    //   </View>
    //   <FlatList
    //     data={data}
    //     keyExtractor={(item, index) => index.toString()}
    //     style={styles.body}
    //     renderItem={({item}) => (
    //       <View style={{flexDirection: 'row', padding: 10}}>
    //         <Text
    //           style={{
    //             fontWeight: 'bold',
    //             fontSize: 16,
    //             color: item.type === 'user' ? '#F652A0' : '#059DC0',
    //           }}>
    //           {item.type === 'user' ? 'Yan' : 'Wally'}
    //         </Text>
    //         <Text style={styles.bot}>: {item.text}</Text>
    //       </View>
    //     )}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Talk to Wally"
    //     value={textInput}
    //     onChangeText={text => setTextInput(text)}
    //   />
    //   <TouchableOpacity style={styles.botton} onPress={handleSend}>
    //     <Text style={styles.bottonText}>SEND TALK</Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
    <SafeAreaView style={[flexOne, {backgroundColor: darkBgColor}]}>
      <View style={[flexOne, marginHorizontalSeven]}>
        <Header navigation={navigation} title={title} />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          style={{backgroundColor: 'red'}}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: item.type === 'user' ? '#F652A0' : '#059DC0',
                }}>
                {item.type === 'user' ? 'Yan' : 'Wally'}
              </Text>
              <Text style={styles.bot}>: {item.text}</Text>
            </View>
          )}
        />
        <TextInput
          style={[paddingHorizontalThree, marginVerticalThree, styles.input]}
          placeholder="Ask your AI Buddy"
          value={textInput}
          onChangeText={text => setTextInput(text)}
        />
        <TouchableOpacity style={styles.botton} onPress={handleSend}>
          <Text style={styles.bottonText}>SEND TALK</Text>
        </TouchableOpacity>
        <View />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6DECE0',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4C5270',
    marginTop: 70,
    marginBottom: 10,
  },
  bot: {
    fontSize: 16,
    color: '#4C5270',
  },
  input: {
    backgroundColor: '#BCECE0',
    width: '95%',
    marginBottom: 10,
    height: 60,
    fontSize: 16,
    color: '#4C5270',
    borderRadius: 10,
  },
  botton: {
    backgroundColor: '#F652A0',
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: '#4C5270',
    borderRadius: 10,
    marginBottom: 20,
  },
  bottonText: {
    fontSize: 20,
    color: '#4C5270',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
