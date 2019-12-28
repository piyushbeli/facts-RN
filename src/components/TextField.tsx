import { colors, typos } from '@styles';
import * as React from 'react';
import { StyleSheet, Text, View, KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface IActionButtonProps {
    error?: string;
    secureTextEntry?: boolean;
    onChangeText?: Function;
    onBlur?: Function;
    keyboardType?: KeyboardTypeOptions
    nonEditable?: boolean;
    textContentType?: any 
}

type IProps = IActionButtonProps;

type IState = {}

class TextField extends React.Component<IProps, IState> {
    _textInput: any;

    constructor(props: IProps) {
        super(props);
    }
    
    onChangeText = (value: any) => {
        this.setState({
            value: value
        }, () => {
            if (this.props.onChangeText) {
                this.props.onChangeText(value);
            }
        });
    }

    onBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    clear = () => {
        if (this._textInput) {
            this._textInput.clear();
        }
    }
    
    render() {
        const { error, secureTextEntry, nonEditable } = this.props;
        return (
            <View style={styles.container}>
                <TextInput 
                    ref={input => { this._textInput = input }}
                    style={[styles.input]}
                    editable={!nonEditable}
                    onChangeText={this.onChangeText} 
                    onBlur={this.onBlur} 
                    secureTextEntry={secureTextEntry}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    autoCapitalize={'none'}
                    textContentType={this.props.textContentType ? this.props.textContentType : "none"}/>
                { error ? <Text style={styles.error}>{error}</Text> : null }
            </View>
        )    
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
    },
    input: {
        ...typos.PRIMARY,
        borderRadius: 5,
        borderColor: colors.LIGHT_GRAY,
        height: 40,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    error: {
        ...typos.CAPTION,
        color: colors.ERROR, 
        marginTop: 3,
    },
});

export { TextField };