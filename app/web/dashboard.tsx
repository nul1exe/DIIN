import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Dashboard = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}> D I I N</Text>
        <View style={styles.nav}>
          <Text style={styles.activeLink}>Dashboard</Text>
          <Text style={styles.link}>+ Tracker Device</Text>
          <FontAwesome name="user-circle" size={20} color="black" />
       
        </View> 
      </View>

      {/* Dashboard Boxes */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.largeBox}>
          <Text style={styles.boxText}>Commuter Feedback</Text>
          <MaterialIcons 
          name="feedback" 
          size={24} 
          color="black"
           style={{ marginLeft: 12 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallBox}>
          <Text style={styles.boxText}>Buses</Text>
          <Ionicons 
          name="bus" 
          size={20} 
          color="black"  
          style={{ marginLeft: 12 }}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallBox}>
          <Text style={styles.boxText}>Reports</Text>
          <Ionicons
            name="bar-chart" 
            size={20} 
            color="black"  
           style={{ marginLeft: 12 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2B705',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  activeLink: {
    color: '#D4A00D',
    fontWeight: 'bold',
  },
  link: {
    color: '#9C8E6E',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  largeBox: {
    width: '35%',
    height: 300,
    borderWidth: 1,
    borderColor: '#F2B705',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 50,
  },
  smallBox: {
    width: '30%',
    height: 100,
    borderWidth: 1,
    borderColor: '#F2B705',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    marginRight:10,
    marginBottom: 30,
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
