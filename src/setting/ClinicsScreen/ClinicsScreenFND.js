// ClinicsScreenFND.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchSessionAndClinic } from './ClinicsScreenBND';
import styles from './clinicsStyle';

const ClinicsScreen = ({ navigation }) => {
  const [clinic, setClinic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(false);

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchSessionAndClinic(setClinic, setError, setLoading);
  }, []);

  const handleRefresh = () => {
    setRefreshLoading(true);
    fetchSessionAndClinic(setClinic, setError, setLoading);
    setTimeout(() => setRefreshLoading(false), 2000);
  };

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);

  const filteredData = clinic.filter((item) =>
    item.dr_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop}>
        <StatusBar backgroundColor="#007bff" barStyle="light-content" />
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {isSearchVisible ? (
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search Doctor..."
              autoFocus
            />
          ) : (
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Clinics</Text>
          )}

          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={handleRefresh} />}
      >
        {filteredData.map((item) => (
          <TouchableOpacity key={item.doctor_id} style={styles.doctorCard} onPress={() => openModal(item)}>
            <Text style={styles.doctorName}>{item.dr_name}</Text>
            <Text style={styles.specialization}>{item.specialization}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Doctor Info</Text>
            <Text style={styles.modalText}>Name: {selectedItem?.dr_name}</Text>
            <Text style={styles.modalText}>Specialization: {selectedItem?.specialization}</Text>
            <Text style={styles.modalText}>Email: {selectedItem?.email}</Text>
            <Text style={styles.modalText}>Phone: {selectedItem?.phone}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ClinicsScreen;
