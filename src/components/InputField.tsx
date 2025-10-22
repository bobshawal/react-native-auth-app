import React, { useState }  from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    label: string
    value: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    error?: string
}

export default function InputField({ label, value, onChangeText, secureTextEntry, error }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = secureTextEntry;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                style={[styles.input, error && styles.errorInput]}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword && !showPassword}
                autoCapitalize="none"
            />
            {isPassword && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#666" />
                </TouchableOpacity>
            )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginTop: 4,
    },
})