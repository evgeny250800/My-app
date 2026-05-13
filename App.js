import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Modal } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('list'); // 'list' или 'chat'
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привет! Как продвигается код?', type: 'left' }
  ]);
  const [inputText, setInputText] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [chats, setChats] = useState([{ id: 1, name: 'Брат Лёха', lastMsg: 'Норм?' }]);

  // Функция отправки сообщения
  const sendMessage = () => {
    if (inputText.trim().length > 0) {
      setMessages([...messages, { id: Date.now(), text: inputText, type: 'right' }]);
      setInputText('');
    }
  };

  // Функция добавления чата
  const addChat = () => {
    if (phoneNumber.length > 0) {
      setChats([{ id: Date.now(), name: `+${phoneNumber}`, lastMsg: 'Новый чат' }, ...chats]);
      setPhoneNumber('');
      setAddModalVisible(false);
    }
  };

  if (screen === 'list') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Telegram</Text>
          <TouchableOpacity onPress={() => setAddModalVisible(true)}>
            <Text style={{color: '#517da2', fontSize: 18}}>Добавить</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {chats.map(chat => (
            <TouchableOpacity key={chat.id} style={styles.chatItem} onPress={() => setScreen('chat')}>
              <View style={styles.avatar}><Text style={{color: '#fff'}}>{chat.name[0]}</Text></View>
              <View>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatLastMsg}>{chat.lastMsg}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Окно добавления номера */}
        <Modal visible={isAddModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContent}>
            <View style={styles.modalCard}>
              <Text style={{fontSize: 20, marginBottom: 15, color: '#fff'}}>Введите номер</Text>
              <TextInput 
                style={styles.modalInput} 
                keyboardType="phone-pad" 
                placeholder="79991234567" 
                placeholderTextColor="#666"
                onChangeText={setPhoneNumber}
              />
              <TouchableOpacity style={styles.btn} onPress={addChat}><Text style={{color: '#fff'}}>Создать чат</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}><Text style={{color: '#ff4444', marginTop: 10}}>Отмена</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('list')}>
          <Text style={{color: '#517da2', fontSize: 18}}>Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Брат Лёха</Text>
        <View style={{width: 40}} />
      </View>
      <ScrollView style={styles.chatBox}>
        {messages.map(msg => (
          <View key={msg.id} style={msg.type === 'left' ? styles.messageLeft : styles.messageRight}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={inputText}
          onChangeText={setInputText}
          placeholder="Сообщение" 
          placeholderTextColor="#666" 
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>▲</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e1621' },
  header: { padding: 20, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: '#17212b', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  chatItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#17212b', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#517da2', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  chatName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  chatLastMsg: { color: '#8db5cf', fontSize: 14 },
  chatBox: { flex: 1, padding: 15 },
  messageLeft: { backgroundColor: '#182533', padding: 10, borderRadius: 15, marginBottom: 10, alignSelf: 'flex-start', maxWidth: '80%' },
  messageRight: { backgroundColor: '#2b5278', padding: 10, borderRadius: 15, marginBottom: 10, alignSelf: 'flex-end', maxWidth: '80%' },
  messageText: { color: '#fff', fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#17212b' },
  input: { flex: 1, backgroundColor: '#0e1621', color: '#fff', borderRadius: 20, paddingHorizontal: 15, height: 40 },
  sendBtn: { backgroundColor: '#517da2', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  modalContent: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' },
  modalCard: { backgroundColor: '#17212b', padding: 30, borderRadius: 20, width: '80%', alignItems: 'center' },
  modalInput: { backgroundColor: '#0e1621', color: '#fff', width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 },
  btn: { backgroundColor: '#517da2', padding: 10, borderRadius: 10, width: '100%', alignItems: 'center' }
});
