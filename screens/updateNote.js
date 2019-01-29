

import React, { Component } from 'react';
import { Linking, Alert } from 'react-native';

import { Root, Container, Header, Right, Left, Title, Icon, Button, Body, Content, Textarea, Form, ActionSheet } from 'native-base'

import RNHTMLtoPDF from 'react-native-html-to-pdf';

var BUTTONS = ["Email", "PDF", "Project", "Cancel"];
var CANCEL_INDEX = 3;

export default class Notepad extends Component {
    static navigationOptions = {
        header: null
    }
    _exportemail(note) {
        url = 'mailto:?subject=Builder Helper Notes&body=' + note;
        Linking.openURL(url);
    }
    constructor(props) {
        super(props);

        this.state = {
            stext:''
        }
        
    }
    _exporttopdf(note){
        var options2 = {
            html: '<h1>Builder Helper PDF</h1><h5>'+note+'</h5>',
      
            fileName: 'test2',
            
            directory: 'docs',         
            base64: true,
      
            height: 800,
            width: 1056,               
            padding: 24,               
          };
      
          RNHTMLtoPDF.convert(options2).then((data2) => {
            Alert.alert(
              'filename' + options2.fileName,
              'filePath=' + data2.filePath
            );
          });
      
    }

    render() {
        return (
            <Root>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent
                                onPress={
                                    () => {
                                        this.props.navigation.state.params.onGoBack(this.props.navigation.state.params.data.item,this.state.stext);
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
                                            title: "Export Note"
                                        },
                                        buttonIndex => {
                                            if (BUTTONS[buttonIndex] === 'Email') {
                                                this._exportemail(this.props.navigation.state.params.data.item)
                                            }else if(BUTTONS[buttonIndex] === 'PDF'){
                                                this._exporttopdf(this.props.navigation.state.params.data.item)
                                            }
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
                                                { text: 'OK', onPress: () => {
                                                    this.props.navigation.state.params.onGoBack(this.props.navigation.state.params.data.item,'');
                                                    this.props.navigation.goBack()
                                                } },
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => this.props.navigation.goBack(),
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
                            <Textarea style={{ fontSize: 18, fontFamily: "ArialHebrew-Bold" }} rowSpan={25} onChangeText={(text) => this.setState({stext:text})} defaultValue={this.props.navigation.state.params.data.item} />
                        </Form>
                    </Content>
                </Container>
            </Root>
        );
    }
}
