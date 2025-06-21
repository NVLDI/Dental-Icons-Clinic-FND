// ProfileScreenFND.js
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from './profileStyle';
import { useProfileLogic } from './ProfileScreenBND';

const ProfileScreen = () => {
  const {
    profile,
    loading,
    error,
    handleLogout,
    capitalizeEachWord,
  } = useProfileLogic();
  const renderStars = (rating) => {
  if (typeof rating !== 'number' || isNaN(rating)) {
    return <Text style={styles.noRatingText}>No rating available</Text>;
  }

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <View style={styles.starsContainer}>
      {stars.map((star) => (
        <Ionicons
          key={star}
          name={star <= Math.floor(rating) ? 'star' : 'star-outline'}
          size={20}
          color="#f1c40f"
        />
      ))}
    </View>
  );
};

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Avatar.Icon size={80} icon="account" style={styles.avatar} />
        <Text style={styles.name}>{capitalizeEachWord(profile.clinic_name)}</Text>
        <Text style={styles.field}>Email: {profile.email}</Text>
        <Text style={styles.field}>Location: {profile.geo_location}</Text>
        <Text style={styles.field}>Clinic Number: {profile.clinic_no}</Text>

        <View style={styles.badgeContainer}>
          <Badge>{profile.total_patients || 0} Patients</Badge>
          <Badge>{profile.total_requests || 0} Requests</Badge>
          <Badge>{profile.total_services || 0} Services</Badge>
        </View>

        {renderStars(profile.rating)}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
