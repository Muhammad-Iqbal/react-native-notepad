

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Container, Header, Right, Left, Title, Text, Icon, Button, Body, Content, Textarea, Form } from 'native-base'

export default class Notepad extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={
                                ()=>{
                                    this.props.navigation.goBack()
                                }
                            }
                            >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Note</Title>
                    </Body>
                    <Right>
                        <Button transparent
                        onPress={
                                ()=>{
                                    alert("Implement Save Button")
                                }
                            }
                        >
                            <Icon name='ios-add' />
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    <Form>
                        <Textarea style={{fontSize:18,fontFamily:"ArialHebrew-Bold"}} rowSpan={25}  placeholder="Start Typing" />
                    </Form>
                </Content>
            </Container>
        );
    }
}
