// ServiceScreenFND.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './serviceStyle';
import { useServiceScreenLogic } from './ServiceScreenBND';

const ServiceScreen = ({ navigation }) => {
  const logic = useServiceScreenLogic();

  if (logic.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (logic.error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>{logic.error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={logic.refreshLoading} onRefresh={logic.handleRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Patient Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          value={logic.patientName}
          onChangeText={logic.setPatientName}
        />

        <TextInput
          style={styles.input}
          placeholder="Medical History"
          value={logic.medicalHistory}
          onChangeText={logic.setMedicalHistory}
        />

        <TextInput
          style={styles.input}
          placeholder="Additional Procedure"
          value={logic.additionalProcedure}
          onChangeText={logic.setAdditionalProcedure}
        />

        <TextInput
          style={styles.input}
          placeholder="Additional Equipment"
          value={logic.additionalEquipment}
          onChangeText={logic.setAdditionalEquipment}
        />

        {/* Doctor Picker Trigger */}
        <TouchableOpacity
          style={styles.pickerInput}
          onPress={() => logic.setModalVisible(true)}
        >
          <Text>{logic.selectedDoctor?.name || 'Select Doctor'}</Text>
        </TouchableOpacity>

        {/* Specialist Picker Trigger */}
        <TouchableOpacity
          style={styles.pickerInput}
          onPress={() => logic.setSpModalVisible(true)}
        >
          <Text>
            {logic.selectedSpecialist.length > 0
              ? logic.selectedSpecialist.map((s) => s.name).join(', ')
              : 'Select Specialist'}
          </Text>
        </TouchableOpacity>

        {/* Procedure Picker Trigger */}
        <TouchableOpacity
          style={styles.pickerInput}
          onPress={() => logic.setPPModalVisible(true)}
        >
          <Text>{logic.selectedProcedure || 'Select Procedure'}</Text>
        </TouchableOpacity>

        {/* Tags for selected procedures */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {logic.selectedProcedureList.map((item, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Confirm button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm Service</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals would be implemented here... */}
      <Modal visible={logic.modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Doctor</Text>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => logic.setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            {Array.isArray(logic.filteredDoctorList) &&
           logic.filteredDoctorList.map((doc, idx) => (
    <TouchableOpacity
      key={idx}
      style={styles.listItem}
      onPress={() => {
        logic.setSelectedDoctor(doc);
        logic.setModalVisible(false);
      }}
    >
      <Text>{doc.name}</Text>
    </TouchableOpacity>
))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ServiceScreen;
