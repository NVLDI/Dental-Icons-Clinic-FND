// drawerStyle.js
import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

export default StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  newsSection: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  newsTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  newsItem: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
});
