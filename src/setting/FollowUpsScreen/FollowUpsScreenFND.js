// FollowUpsScreenFND.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { fetchFollowUpsData } from './FollowUpsScreenBND';
import styles from './followupsStyle';

const FollowUpsScreen = ({ navigation }) => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchFollowUpsData(setFollowUps, setError, setLoading);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFollowUpsData(setFollowUps, setError, setLoading);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const filteredList = followUps.filter((item) =>
    item.patient_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

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
              placeholder="Search patient..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          ) : (
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Follow-Ups</Text>
          )}

          <TouchableOpacity style={styles.searchButton} onPress={() => setSearchVisible(!isSearchVisible)}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {filteredList.map((item) => (
          <TouchableOpacity key={item.request_no} style={styles.card} onPress={() => openModal(item)}>
            <Text style={styles.cardTitle}>{item.patient_name}</Text>
            <Text style={styles.cardSubtitle}>{item.service_category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Patient Info</Text>
            <Text style={styles.modalText}>Name: {selectedItem?.patient_name}</Text>
            <Text style={styles.modalText}>Clinic: {selectedItem?.clinic_name}</Text>
            <Text style={styles.modalText}>Date: {selectedItem?.appointment_date_time}</Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome name="calendar" size={22} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome name="phone" size={22} color="#28a745" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="chat" size={22} color="#17a2b8" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FollowUpsScreen;
