import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, View, Alert, Modal} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './EventCard.styles';

// Fetch
import { getOrganizationInfo } from '../../actions/organization';

// Context
import { UserContext } from '../../context/UserContext';

// Components
import Button from '../MainButton/MainButton.component';

const EventCard = (props) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const { userEvents, setUserEvents } = useContext(UserContext);
    const [organization, setOrganization] = useState('');

    const convertDateFormat = (date) => {
        return new Date(date).toString();
    }

    useEffect(() => {
        getOrganizationInfo(props.org).then(res => {
            setOrganization(res);
        })
    }, []);
    
    return(
        <View>
            <TouchableOpacity 
                style={styles.container} 
                onPress={() => {
                    setModalVisible(!isModalVisible)
                }}>
                <Text> {organization.org_name} </Text>
                <Text style={styles.title}> {props.title} </Text>
                <Image style={styles.image} resizeMode="contain" source={props.source}/>
                <Text style={styles.date}> {convertDateFormat(props.startDate)} </Text>
                <Text style={styles.date}> {convertDateFormat(props.endDate)} </Text>

                <Text> {props.link} </Text>
            </TouchableOpacity>
            
            <Modal animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onBackdropPress = { () => this.setState({isVisible:false})}>
                
                <View style={styles.containerPopUp}>
                    
                    <Text> {organization.org_name} </Text>
                    <Text style={styles.titlePopUp}> {props.title} </Text>
                    <Image style={styles.imagePopUp} resizeMode="contain" source={props.source} />
                    <Text style={styles.descPopUp}> {props.desc} </Text>
                    <Text style={styles.datePopUp}> {convertDateFormat(props.startDate)} </Text>
                    <Text style={styles.datePopUp}> {convertDateFormat(props.endDate)} </Text>
                    <Button
                        onPress={() => {
                            Alert.alert("You successfully have registered for " + props.title + " on " + props.startDate + "!");
                            setUserEvents([...userEvents, props.title]);
                            setModalVisible(!isModalVisible);
                        }}
                        style={{backgroundColor: '#92d050'}}
                        label="RSVP"
                    />
                    <Button
                        onPress={() => {
                            setModalVisible(!isModalVisible);
                        }}
                        style={{backgroundColor: '#CD5C5C'}}
                        label="Exit"
                    />
                </View>
            </Modal>
           
        </View>
    )
}

export default EventCard;