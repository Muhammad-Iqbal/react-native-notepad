

import React, { Component } from 'react';
import { Platform, StyleSheet, View,Alert } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Root, Container, Header, Right, Left, Title, Text, Icon, Button, Body, Content, Textarea, Form, ActionSheet } from 'native-base'


var BUTTONS = [
    { text: "Email", icon: "ios-mail", iconColor: "#2c8ef4" },
    { text: "PDF", icon: "analytics", iconColor: "#f42ced" },
    { text: "Project", icon: "aperture", iconColor: "#ea943b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Notepad extends Component {
    static navigationOptions = {
        header: null
    }


    render() {


        console.log(this.props.navigation.state.params.data.item.name)
        return (
            <Root>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent
                                onPress={
                                    () => {
                                        this.props.navigation.goBack()
                                    }
                                }
                            >
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Update Note</Title>
                        </Body>
                        <Right>
                            <Button transparent
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: BUTTONS,
                                            cancelButtonIndex: CANCEL_INDEX,
                                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                            title: "Export Note"
                                        },
                                        buttonIndex => {
                                            this.setState({ clicked: BUTTONS[buttonIndex] });
                                        }
                                    )}
                            >
                                <Icon name='ios-share-alt' />
                            </Button>

                            <Button transparent
                                onPress={
                                    () => {
                                        Alert.alert(
                                            'Delete Note',
                                            'Are you sure you want to delele this note ?',
                                            [
                                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                
                                            ],
                                            { cancelable: false },
                                        );
                                    }
                                }
                            >
                                <Icon name='ios-trash' />
                            </Button>

                        </Right>
                    </Header>
                    <Content padder>
                        <Form>
                            <Textarea style={{ fontSize: 18, fontFamily: "ArialHebrew-Bold" }} rowSpan={25} value={this.props.navigation.state.params.data.item.name} />
                        </Form>
                    </Content>
                </Container>
            </Root>
        );
    }
}
