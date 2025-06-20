// DrawerContentFND.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Avatar, ActivityIndicator } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import styles from './drawerStyle';
import { useDrawerLogic } from './DrawerContentBND';

const DrawerContent = (props) => {
  const { userName, userEmail, newsUpdates, loading } = useDrawerLogic();

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        <View style={styles.userSection}>
          <Avatar.Text size={64} label={userName?.charAt(0) || '?'} />
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        <DrawerItemList {...props} />

        <View style={styles.newsSection}>
          <Text style={styles.newsTitle}>Dental News</Text>
          {loading ? (
            <ActivityIndicator />
          ) : (
            newsUpdates.map((article, index) => (
              <Text key={index} style={styles.newsItem}>
                • {article.title.length > 60 ? article.title.slice(0, 60) + '...' : article.title}
              </Text>
            ))
          )}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;
