import React, { Component } from 'react';
import { FlatList, Alert, AsyncStorage } from "react-native";
import { createStackNavigator } from 'react-navigation'

import { Container, Header, Right, Left, Title, Text, Icon, Button, Body, Content, ListItem } from 'native-base'

import CreateNotes from './createNotes'
import UpdateNote from './updateNote'
export class Notebook extends Component {
    static navigationOptions = {

        header: null
    }

    handleClick() {
        Alert.alert("I am clicked");
    }

    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    async loadNotes() {
        try {
            var notes = await AsyncStorage.getItem("@ReactNotes:notes");
            if (notes !== null) {
                console.log(notes)
                this.setState({ data: JSON.parse(notes) })
            }
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }


    async saveNotes(note) {
        try {
            console.log(note)
            let dummy = this.state.data
            dummy.push(note);
            await AsyncStorage.setItem("@ReactNotes:notes", JSON.stringify(dummy));
            this.loadNotes()
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
    async updateNote(note, newnote) {
        if (newnote != '') {
            let dummy = this.state.data.filter(item => item !== note)
            dummy.push(newnote);
            await AsyncStorage.setItem("@ReactNotes:notes", JSON.stringify(dummy));
            this.loadNotes()
        } else {
            let dummy = this.state.data.filter(item => item !== note)
            await AsyncStorage.setItem("@ReactNotes:notes", JSON.stringify(dummy));
            this.loadNotes()
        }
    }


    componentWillMount() {
        this.loadNotes();

    }
    renderItem = ({ item }) => {
        return (
            <ListItem button={true} key={Math.random() * (9999 - 1)} onPress={() => {
                this.props.navigation.navigate("UpdateNote", {
                    data: { item },
                    onGoBack: (note, newnote) => this.updateNote(note, newnote),
                })
            }}
                style={{ marginLeft: 0 }}>
                <Body>
                    <Text>{item}</Text>
                </Body>
            </ListItem>

        );

    };


    render() {

        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>Builder Notes</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => {
                                this.props.navigation.navigate("CreateNote", {
                                    onGoBack: (note) => this.saveNotes(note)
                                });
                            }}

                        >
                            <Icon name='create' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item}
                    />
                </Content>
            </Container>
        );
    }
}

export default createStackNavigator({
    Notepad: Notebook,
    CreateNote: CreateNotes,
    UpdateNote: UpdateNote
}, {
        navigationOptions: {
            header: null,
            tabBarIcon: ({ tintColor }) => (
                <Icon name='ios-copy' style={{ color: tintColor }} />
            ),
        }
    });
