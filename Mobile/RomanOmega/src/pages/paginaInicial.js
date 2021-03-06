import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../services/api';

import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    FlatList,
    AsyncStorage
} from 'react-native';

export default class PaginaInicial extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            listaProjetos: []
        }
    }

    carregarProjetos = async () => {
        await api.get('/projetos')
            .then(response => {
                this.setState({ listaProjetos: response.data });
            })
            .catch(function (error) {
                console.warn(error);
            })
    }

    componentDidMount() {
        this.carregarProjetos();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.userName}>Bruno Salles</Text>
                    <Icon name="clear" size={25} color='#000' onPress={
                        () => {
                            AsyncStorage.removeItem('usr-roman')
                            this.props.navigation.navigate('Login')
                        }
                    } />
                </View>

                <View style={styles.main}>
                    <FlatList
                        data={this.state.listaProjetos}
                        keyExtractor={item => item.id}
                        renderItem={this.renderizaItem}
                    />
                </View>
            </ScrollView>

        );
    }

    renderizaItem = ({ item }) => (
        <View style={styles.containerCard}>
            <View style={styles.card}>
                <View style={styles.card__header}>
                    <Text>{item.usuarioNome}</Text>
                    <Text>{item.temaNome}</Text>
                </View>
                <View style={styles.card__main}>
                    <Text>
                        Lorem ipsum dolor sit amet enucnuee euueuceue ceuceuhece ccuechuecheu
                </Text>
                </View>
                <View style={styles.card__footer}>
                    <Text>Projeto: {item.nome}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },

    header: {
        height: 55,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.4,
        borderColor: "#000",
        marginBottom: 40
    },

    userName: {
        color: '#000',
        fontSize: 16
    },

    main: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    containerCard: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        borderRadius: 4,
        borderWidth: 0.4,
        borderColor: "#000",
        width: '80%',
        height: 300,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'space-around',

    },

    card__header: {
        width: '100%',
        height: 45,
        borderColor: '#000',
        borderBottomWidth: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#BF1BDC',
        fontWeight: 'bold'
    },

    card__main: {
        padding: 7,
        height: 210,
    },

    card__footer: {
        fontSize: 5,
        width: '100%',
        height: 45,
        borderTopWidth: 0.4,    
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
});