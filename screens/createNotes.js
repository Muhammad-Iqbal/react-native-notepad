

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';


import { Container, Header, Right, Left, Title, Text, Icon, Button, Body, Content, Textarea, Form } from 'native-base'

export default class Notepad extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);

        this.state = {
            stext:''
        }
        
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
                                    
                                    this.props.navigation.state.params.onGoBack(this.state.stext);
                                    this.props.navigation.goBack()
                                }
                            }
                        >
                            <Icon name='ios-add' />
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    <Form>
                        <Textarea style={{fontSize:18,fontFamily:"ArialHebrew-Bold"}} rowSpan={15} onChangeText={(text) => this.setState({stext:text})} placeholder="Start Typing" />
                    </Form>
                </Content>
            </Container>
        );
    }
}
