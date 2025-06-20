// DeclineScreenFND.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  RefreshControl
} from 'react-native';
import styles from './declineStyle';
import { useDeclineLogic } from './DeclineScreenBND';

const DeclineScreen = () => {
  const logic = useDeclineLogic();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.feed}
        refreshControl={<RefreshControl refreshing={logic.refreshLoading} onRefresh={logic.handleRefresh} />}
      >
        {logic.decline.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No Declined Services available</Text>
          </View>
        ) : (
          logic.decline.map((item) => (
            <TouchableOpacity
              key={item.request_no}
              style={styles.card}
              onPress={() => logic.openModal(item)}
            >
              <Text style={styles.name}>{item.patient_name}</Text>
              <Text style={styles.dateText}>{logic.formatDateTime(item.appointment_date_time).month} {logic.formatDateTime(item.appointment_date_time).day}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Modal for Declined Item */}
      <Modal visible={logic.modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}><Text style={{ fontWeight: 'bold' }}>Patient:</Text> {logic.selectedItem?.patient_name}</Text>
            <Text style={styles.modalText}><Text style={{ fontWeight: 'bold' }}>Procedure:</Text> {logic.selectedItem?.procedure_plan?.replace(/[{}"]+/g, '')}</Text>
            <Text style={styles.modalText}><Text style={{ fontWeight: 'bold' }}>Reason:</Text> {logic.selectedItem?.decline_reason || 'Not provided'}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={logic.closeModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DeclineScreen;
