// NotificationScreenFND.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from './notificationStyle';

const staticNotifications = [
  { id: '1', title: 'New message from admin', description: 'Click to read your messages.', isRead: false, timestamp: '5 mins ago' },
  { id: '2', title: 'Appointment Reminder', description: 'Your appointment is scheduled for tomorrow.', isRead: true, timestamp: '1 hour ago' },
  { id: '3', title: 'Dental Offer', description: 'Get 20% off on next cleaning.', isRead: true, timestamp: 'Yesterday' },
];

const NotificationScreen = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [notificationsList, setNotificationsList] = useState(staticNotifications);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);

  const handleNotificationPress = (id) => {
    const updated = notificationsList.map((item) =>
      item.id === id ? { ...item, isRead: !item.isRead } : item
    );
    setNotificationsList(updated);
  };

  const filtered = notificationsList.filter((item) =>
    item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.isRead && styles.unread]}
      onPress={() => handleNotificationPress(item.id)}
    >
      <Feather name="bell" size={24} style={styles.icon} />
      <View style={styles.notificationContent}>
        <Text style={[styles.title, !item.isRead && styles.unreadTitle]}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop}>
        <StatusBar backgroundColor="#6c757d" barStyle="light-content" />
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {isSearchVisible ? (
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search Notifications..."
              autoFocus
            />
          ) : (
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Notifications</Text>
          )}

          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </SafeAreaView>
    </>
  );
};

export default NotificationScreen;
