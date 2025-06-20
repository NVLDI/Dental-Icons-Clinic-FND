// AcceptedScreenFND.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  RefreshControl
} from 'react-native';
import styles from './acceptedStyle';
import { useAcceptedLogic } from './AcceptedScreenBND';
import { FontAwesome } from '@expo/vector-icons';

const AcceptedScreen = () => {
  const logic = useAcceptedLogic();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={logic.refreshLoading} onRefresh={logic.handleRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Accepted Requests</Text>

        {logic.accept.map((item) => (
          <View key={item.request_no} style={styles.card}>
            <Text style={styles.cardTitle}>{item.patient_name}</Text>
            <Text style={styles.cardText}>Procedure: {item.procedure_plan?.replace(/[{}"]+/g, '')}</Text>
            <TouchableOpacity style={styles.button} onPress={() => logic.openModal(item)}>
              <Text style={styles.buttonText}>Mark as Finished</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Finish Modal */}
      <Modal visible={logic.modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Finish Service</Text>
            <TextInput
              style={styles.input}
              placeholder="Any comments?"
              value={logic.inputText}
              onChangeText={logic.setInputText}
            />
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity key={value} onPress={() => logic.setRating(value)}>
                  <FontAwesome
                    name={logic.rating >= value ? 'star' : 'star-o'}
                    size={24}
                    color="#f1c40f"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => logic.handleFinish(logic.selectedItem)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#6c757d' }]} onPress={logic.closeModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AcceptedScreen;
