// HomeScreenFND.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import styles from './style';
import { useHomeScreenData, formatDateTime } from './HomeScreenBND';

const HomeScreen = ({ navigation }) => {
  const {
    count,
    todayTask,
    upcomingTask,
    followUpsTask,
    refreshLoading,
    handleRefresh,
  } = useHomeScreenData();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTaskVisible, setModalTaskVisible] = useState(false);
  const [modalUpcomingVisible, setModalUpcomingVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const openTaskModal = (item) => {
    setSelectedItem(item);
    setModalTaskVisible(true);
  };
  const openUpcomingModal = (item) => {
    setSelectedItem(item);
    setModalUpcomingVisible(true);
  };
  const closeModals = () => {
    setModalVisible(false);
    setModalTaskVisible(false);
    setModalUpcomingVisible(false);
    setSelectedItem(null);
  };

  const renderCard = (item, onPress) => (
    <TouchableOpacity key={item.request_no} style={styles.followUpCard} onPress={() => onPress(item)}>
      <Icon name="person" size={24} color="#555" />
      <Text style={styles.followUpName}>{item.patient_name}</Text>
      <Text style={styles.followUpDate}>{formatDateTime(item.appointment_date_time).month} {formatDateTime(item.appointment_date_time).day}</Text>
    </TouchableOpacity>
  );

  const renderModalContent = (visible, onClose, labelKey, timeKey) => (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.clinicName}>{selectedItem?.dr_name ? `Dr. ${selectedItem.dr_name}` : 'N/A'}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.detailsBox}>
              <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {selectedItem?.patient_name}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {selectedItem?.procedure_plan?.replace(/[{}"]/g, '')}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Additional Procedure:</Text> {selectedItem?.additional_procedure}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Equipment:</Text> {selectedItem?.equipment}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Medical History:</Text> {selectedItem?.medical_history}</Text>
            </View>
            {selectedItem?.[timeKey] && (() => {
              const { month, day, time } = formatDateTime(selectedItem[timeKey]);
              return (
                <View style={styles.dateTimeBox}>
                  <Text style={styles.dateTimeTextSmall}>{month}</Text>
                  <Text style={styles.dateTimeText}>{day}</Text>
                  <Text style={styles.dateTimeTextSmall}>{time}</Text>
                </View>
              );
            })()}
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.leftButtons}>
              {labelKey === 'followup_appointment_date_time' && (
                <TouchableOpacity style={styles.acceptButton}><MaterialIcons name="check" size={16} color="white" /></TouchableOpacity>
              )}
              <TouchableOpacity style={styles.rescheduleButton}><FontAwesome name="calendar" size={16} color="white" /></TouchableOpacity>
            </View>
            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.iconButton}><FontAwesome name="phone" size={24} color="#28a745" /></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}><MaterialIcons name="chat" size={24} color="#007bff" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={handleRefresh} />}>
        <View style={styles.grid}>
          {count.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, {
                backgroundColor: item.name === 'Accepted' ? '#fcec5d' : '#6fe374',
              }]}
              onPress={() => navigation.navigate(item.name === 'Finished' ? 'FinishedService' : 'Accepted')}
            >
              <Icon name={item.icon} size={30} color="#333" />
              <Text style={styles.cardCount}>{item.count}</Text>
              <Text style={styles.cardName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Section title="Follow-Ups" subtitle="Showing follow-ups for the next 7 days" data={followUpsTask} renderItem={(item) => renderCard(item, openModal)} />
        <Section title="Today's Task" data={todayTask} renderItem={(item) => renderCard(item, openTaskModal)} />
        <Section title="Upcoming Task" subtitle="Showing upcoming task for the next 7 days" data={upcomingTask} renderItem={(item) => renderCard(item, openUpcomingModal)} />
      </ScrollView>

      {renderModalContent(modalVisible, closeModals, 'followup_appointment_date_time', 'followup_appointment_date_time')}
      {renderModalContent(modalTaskVisible, closeModals, 'appointment_date_time', 'appointment_date_time')}
      {renderModalContent(modalUpcomingVisible, closeModals, 'appointment_date_time', 'appointment_date_time')}
    </SafeAreaView>
  );
};

const Section = ({ title, subtitle, data, renderItem }) => (
  <View style={styles.followUpSection}>
    <View style={styles.headerContainer}>
      <View style={styles.line} />
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.line} />
    </View>
    {subtitle && <Text style={styles.subHeaderText}>{subtitle}</Text>}
    {data?.length > 0 ? (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.followUpContainer}>
        {data.map(renderItem)}
      </ScrollView>
    ) : (
      <Text style={styles.noFollowUpsText}>No {title} available</Text>
    )}
  </View>
);

export default HomeScreen;
