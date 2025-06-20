// privacyStyle.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeAreaTop: {
    backgroundColor: '#007bff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#007bff',
  },
  backButton: {
    padding: 8,
  },
  searchButton: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
  },
  switchLabel: {
    fontSize: 14,
  },
  menuButton: {
    marginTop: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
