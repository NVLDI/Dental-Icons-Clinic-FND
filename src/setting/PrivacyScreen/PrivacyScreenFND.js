// PrivacyScreenFND.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, Button, Provider } from 'react-native-paper';
import styles from './privacyStyle';

const PrivacyScreen = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDataCollectionEnabled, setDataCollectionEnabled] = useState(false);
  const [isAccountVisibilityPublic, setAccountVisibilityPublic] = useState(true);
  const [isLocationSharingEnabled, setLocationSharingEnabled] = useState(false);
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isTwoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState('1 Month');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);
  const handleSaveChanges = () => alert('Privacy settings saved successfully!');

  return (
    <Provider>
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
              placeholder="Search Privacy Settings..."
              autoFocus
            />
          ) : (
            <Text style={styles.topBarTitle}>Privacy</Text>
          )}

          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Data Collection */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Data Collection</Text>
            <Text style={styles.settingDescription}>
              Enable or disable data collection for improving your experience.
            </Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable Data Collection</Text>
              <Switch value={isDataCollectionEnabled} onValueChange={setDataCollectionEnabled} />
            </View>
          </View>

          {/* Account Visibility */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Account Visibility</Text>
            <Text style={styles.settingDescription}>
              Choose whether your account is visible to others.
            </Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Public Account</Text>
              <Switch value={isAccountVisibilityPublic} onValueChange={setAccountVisibilityPublic} />
            </View>
          </View>

          {/* Location Sharing */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Location Sharing</Text>
            <Text style={styles.settingDescription}>
              Control whether the app can access your location.
            </Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable Location Sharing</Text>
              <Switch value={isLocationSharingEnabled} onValueChange={setLocationSharingEnabled} />
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Text style={styles.settingDescription}>
              Allow the app to send you notifications.
            </Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable Notifications</Text>
              <Switch value={isNotificationsEnabled} onValueChange={setNotificationsEnabled} />
            </View>
          </View>

          {/* Two-Factor Auth */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
            <Text style={styles.settingDescription}>
              Enhance your account security.
            </Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable 2FA</Text>
              <Switch value={isTwoFactorAuthEnabled} onValueChange={setTwoFactorAuthEnabled} />
            </View>
          </View>

          {/* Retention Policy */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Data Retention</Text>
            <Text style={styles.settingDescription}>Choose how long to retain your data.</Text>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button style={styles.menuButton} onPress={() => setMenuVisible(true)}>
                  {dataRetentionPeriod}
                </Button>
              }
            >
              {['1 Week', '1 Month', '3 Months', '6 Months', '1 Year'].map((option) => (
                <Menu.Item
                  key={option}
                  onPress={() => {
                    setDataRetentionPeriod(option);
                    setMenuVisible(false);
                  }}
                  title={option}
                />
              ))}
            </Menu>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default PrivacyScreen;
