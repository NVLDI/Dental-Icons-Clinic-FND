// FollowUpsScreenFND.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  RefreshControl,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './followUpsStyle';
import { useFollowUpsLogic } from './FollowUpsScreenBND';

const FollowUpScreen = () => {
  const logic = useFollowUpsLogic();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={logic.refreshLoading} onRefresh={logic.handleRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {logic.followUps.map((item) => (
          <TouchableOpacity
            key={item.request_no}
            style={styles.card}
            onPress={() => logic.openModal(item)}
          >
            <Text style={styles.name}>{item.patient_name}</Text>
            <Text style={styles.dateText}>{item.followup_appointment_date_time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Follow-Up Modal */}
      <Modal visible={logic.modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.name}>{logic.selectedItem?.patient_name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => logic.setCalendarModalVisible(true)}
            >
              <Text style={styles.buttonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#6c757d' }]} onPress={logic.closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Calendar Modal */}
      <Modal visible={logic.calendarModalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.calendarHeader}>Select Date</Text>
            <CalendarPicker onDateChange={logic.onDateChange} />
            {Platform.OS !== 'ios' && (
              <DateTimePicker
                value={logic.selectedTime}
                mode="time"
                display="default"
                onChange={logic.onTimeChange}
              />
            )}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={logic.handleRescheduleConfirm}>
                <Text style={styles.actionBtnText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#dc3545' }]}
                onPress={() => logic.setCalendarModalVisible(false)}
              >
                <Text style={styles.actionBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FollowUpScreen;
