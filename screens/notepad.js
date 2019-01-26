

import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Alert } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Container, Header, Right, Left, Title, Text, Icon, Button, Body, Content, ListItem } from 'native-base'

import CreateNotes from './createNotes'
import UpdateNote from './updateNote'
class Notepad extends Component {
    static navigationOptions = {
        header: null
    }

    handleClick() {
        Alert.alert("I am clicked");
        // Call method from parent
        //this.props.onPress();
    }

    constructor() {
        super();
        this.state = {
            data: [
                { name: "Interstellar", header: false },
                { name: "Dark Knight", header: false },
                { name: "Pop", header: false },
                { name: "Pulp Fiction", header: false },
                { name: "Burning Train", header: false },
            ]
        };
    }
    componentWillMount() {
        var arr = [];
        this.state.data.map(obj => {
            if (obj.header) {
                arr.push(this.state.data.indexOf(obj));
            }
        });
        arr.push(0);
        this.setState({
            stickyHeaderIndices: arr
        });
    }
    renderItem = ({ item }) => {

        return (
            <ListItem button={true} onPress={()=>{this.props.navigation.navigate("UpdateNote",{data:{item}})}} style={{ marginLeft: 0 }}>
                <Body>
                    <Text>{item.name}</Text>
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
                                /* Navigate to the web view with params */
                                this.props.navigation.navigate("CreateNote");
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
                        keyExtractor={item => item.name}
                    />
                </Content>
            </Container>
        );
    }
}

export default createStackNavigator({
    Notepad: Notepad,
    CreateNote: CreateNotes,
    UpdateNote:UpdateNote
}, {
        navigationOptions: {
            header: null
        }
    });
