import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';



class Contact extends Component {

    constructor(props) {
        super(props);
        
    }

    static navigationOptions = {
        title: 'Contact'
    }

    render() {
      
        return (
            <ScrollView></ScrollView>
        );
    }
}

export default Contact;