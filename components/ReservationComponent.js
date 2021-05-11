import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Animated,
    Alert, PanResponder, Picker, Switch, Button, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false,
            showModal: false,
            scaleValue: new Animated.Value(0)
        };
    }

    static navigationOptions = {
        title: 'Reserve Campsite'    //Title on the top 
    }

    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal}); // this will make toggle model showmodal: false to true
    // }

    handleReservation() {
        console.log(JSON.stringify(this.state));    // add to json
        // this.toggleModal();                        //when click search button, toggle modal 

        let message = `Number of Campers: ${this.state.campers}
                    \n Hike-In? ${this.state.hikeIn}
                    \n Date: ${this.state.date.toLocaleDateString('en-US')}` 
        Alert.alert(
            'Begin Search',
            message,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        console.log('Reservation Search Canceled');
                        this.reservationForm;
                    },
                    style: 'Cancel'
                },
                {
                    text: 'OK', 
                    onPress: () => {
                        this.presentLocalNotification(this.state.date); 
                        this.resetForm(); 
                    }
                }
            ], 
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false,
            // showModal: false                  //show modal is false again, 
        });
    }

    //Animation

    animate(){
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }
        ).start();
    }

    componentDidMount() {
        this.animate();
    }     

    render() {
        return (
            <ScrollView>
                <Animated.View style={{transform: [{scale: this.state.scaleValue}]}}> 
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.campers}
                        onValueChange={itemValue => this.setState({campers: itemValue})}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike-In?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.hikeIn}
                        trackColor={{true: '#5637DD', false: null}}
                        onValueChange={value => this.setState({hikeIn: value})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <Button
                        onPress={() =>
                            this.setState({showCalendar: !this.state.showCalendar})
                        }
                        title={this.state.date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    />
                </View>
                {this.state.showCalendar && (
                    <DateTimePicker
                        value={this.state.date}
                        format='YYYY-MM-DD'
                        mode={'date'}
                        display='default'
                        onChange={(event, selectedDate) => {
                            selectedDate && this.setState({date: selectedDate, showCalendar: false});
                        }}
                        style={styles.formItem}
                    />
                )}
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title='Search'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>

                

                {/* <Modal                         //set up modal
                    animationType={'slide'}   // slide or fade or none
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Search Campsite Reservations</Text>
                        <Text style={styles.modalText}>
                            Number of Campers: {this.state.campers}
                        </Text>
                        <Text style={styles.modalText}>
                            Hike-In?: {this.state.hikeIn ? 'Yes' : 'No'}
                        </Text>
                        <Text style={styles.modalText}>
                            Date: {this.state.date.toLocaleDateString('en-US')}
                        </Text>
                        <Button
                            onPress={() => {
                                this.toggleModal();   //not showing modal
                                this.resetForm();       //reset Form
                            }}
                            color='#5637DD'
                            title='Close'
                        />
                    </View>
                </Modal> */}
                </Animated.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
      },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;