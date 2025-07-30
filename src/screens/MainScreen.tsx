// src/screens/TravelJournalScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TravelJournalScreen = () => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        loadJournalEntries();
    }, []);

    const loadJournalEntries = async () => {
        try {
            const storedEntries = await AsyncStorage.getItem('travelJournalEntries');
            if (storedEntries) {
                setJournalEntries(JSON.parse(storedEntries));
            }
        } catch (error) {
            console.error('Error loading journal entries:', error);
            Alert.alert('Loading Failed', 'Could not load your journal entries.');
        }
    };

    const saveJournalEntries = async (entries) => {
        try {
            await AsyncStorage.setItem('travelJournalEntries', JSON.stringify(entries));
        } catch (error) {
            console.error('Error saving journal entries:', error);
            Alert.alert('Save Failed', 'Could not save your journal entry.');
        }
    };

    // --- Изменения здесь: генерация случайного ID ---
    const generateRandomId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    // --- Конец изменений ---

    const addEntry = async () => {
        if (!title.trim() || !notes.trim()) {
            Alert.alert('Missing Info', 'Please fill in both title and notes.');
            return;
        }

        const newEntry = {
            id: generateRandomId(), // Используем новую функцию для ID
            title: title.trim(),
            notes: notes.trim(),
            date: new Date().toISOString().split('T')[0], // Current date (YYYY-MM-DD)
        };

        const updatedEntries = [...journalEntries, newEntry];
        setJournalEntries(updatedEntries);
        await saveJournalEntries(updatedEntries);

        setTitle('');
        setNotes('');
        Alert.alert('Entry Added', 'Your journal entry has been saved!');
    };

    const deleteEntry = async (id) => {
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        const updatedEntries = journalEntries.filter(entry => entry.id !== id);
                        setJournalEntries(updatedEntries);
                        await saveJournalEntries(updatedEntries);
                        Alert.alert('Deleted', 'Journal entry has been deleted.');
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const renderJournalCard = ({ item }) => (
        <View style={styles.journalCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteEntry(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.cardDate}>{item.date}</Text>
            <Text style={styles.cardNotes}>{item.notes}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust as needed
        >
            <ScrollView style={styles.container}>
                <Text style={styles.screenTitle}>Your Travel Journal</Text>

                <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Add New Entry</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title (e.g., Summer Trip to Italy)"
                        placeholderTextColor="#999"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={[styles.input, styles.notesInput]}
                        placeholder="Write your notes here..."
                        placeholderTextColor="#999"
                        value={notes}
                        onChangeText={setNotes}
                        multiline={true}
                        numberOfLines={4}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addEntry}>
                        <Text style={styles.addButtonText}>Add Entry</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Your Entries</Text>
                {journalEntries.length === 0 ? (
                    <Text style={styles.noEntriesText}>No journal entries yet. Add one above!</Text>
                ) : (
                    <FlatList
                        data={journalEntries.slice().reverse()} // Display newest entries first
                        keyExtractor={(item) => item.id}
                        renderItem={renderJournalCard}
                        scrollEnabled={false} // Disable FlatList scrolling as it's inside a ScrollView
                    />
                )}

                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 16,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
        textShadowColor: '#fff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        color: '#fff',
        textShadowColor: '#fff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
        marginBottom: 8,
    },
    inputSection: {
        backgroundColor: '#222',
        borderRadius: 16,
        padding: 12,
        marginTop: 16,
    },
    input: {
        height: 50,
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 15,
        color: '#fff',
        backgroundColor: '#333',
        fontSize: 16,
    },
    notesInput: {
        height: 120, // Larger height for notes
        textAlignVertical: 'top', // Aligns text to the top for multiline
        paddingVertical: 15,
    },
    addButton: {
        backgroundColor: '#d9b43b',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    journalCard: {
        backgroundColor: '#222',
        borderRadius: 16,
        padding: 15,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    cardTitle: {
        color: '#d9b43b',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, // Allow title to take space
        paddingRight: 10, // Space from delete button
    },
    cardDate: {
        color: '#aaa',
        fontSize: 12,
        marginBottom: 8,
    },
    cardNotes: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 22,
    },
    deleteButton: {
        backgroundColor: '#ff5555',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    noEntriesText: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default TravelJournalScreen;
