import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';



class About extends Component {

    constructor(props) {
        super(props);
        
    }

    static navigationOptions = {
        title: 'About'
    }

    render() {
      
        return (
            <ScrollView></ScrollView>
        );
    }
}

export default About;