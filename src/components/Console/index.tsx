/* eslint-disable @typescript-eslint/naming-convention */
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Button from '@components/Button';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import {createLog, sanitizeConsoleInput, setUpdateLogsFunction} from '@libs/Console';
import type {Log} from '@libs/Console';

function Console() {
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        const addLog = (newLog: Log) => {
            setLogs((prevLogs) => [...prevLogs, newLog]);
        };

        setUpdateLogsFunction(addLog);

        // Clean up when the component unmounts
        return () => setUpdateLogsFunction(null);
    }, []);

    const handleExecute = () => {
        const sanitizedInput = sanitizeConsoleInput(input);

        const customLogs = createLog(sanitizedInput);
        setLogs((prevLogs) => [...prevLogs, ...customLogs]);
        setInput('');
    };

    return (
        <View style={{position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', height: 350, paddingHorizontal: 15, paddingTop: 10, borderTopWidth: 1, borderColor: 'black'}}>
            <TextInput
                onChangeText={setInput}
                value={input}
                placeholder="Enter command"
                autoGrowHeight
                autoCorrect={false}
                accessibilityRole="text"
            />
            <Button
                onPress={handleExecute}
                shouldShowRightIcon
                text="Execute"
                style={{marginVertical: 15}}
            />
            <ScrollView bounces={false}>
                {logs.map((log, index) => (
                    <View
                        style={{borderColor: 'black', borderBottomWidth: 1}}
                        key={index}
                    >
                        <Text style={{fontFamily: 'monospace', color: 'black'}}>{`${log.time.toLocaleTimeString()} [${log.level}] - ${log.message}`}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default Console;
