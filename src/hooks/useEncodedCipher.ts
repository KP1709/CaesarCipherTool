import { useMemo, useState } from "react";

type MappedStringType = {
    value: string;
    letter: {
        letterChar: boolean;
        capital: boolean;
        mappedLetter?: string;
    };
    specialChar: boolean | 'space';
    number: boolean;
    index: number | null;
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const mapAlphabet = (shift: number): string[] => {
    const normalizedShift = ((shift % 26) + 26) % 26; // Ensure shift is always positive and within 0-25
    return [...alphabet.slice(-normalizedShift), ...alphabet.slice(0, -normalizedShift)];
};

const encodedCipher = (entry: string, step: number) => {
    const mappedAlphabet = mapAlphabet(step);
    const userEntry = entry;
    let mappedString: MappedStringType[] = [];
    let encodedUserEntry: string[] = [];
    let userEntrySplit: string[] = [];

    userEntrySplit = userEntry.split("");

    const defaultMappedString: MappedStringType = {
        value: '', letter: { letterChar: false, capital: false }, specialChar: false, number: false, index: null
    };

    userEntrySplit.forEach(value => {
        if (value.match(/^[A-Z]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, letter: { letterChar: true, capital: true } });
            return;
        }
        if (value.match(/^[a-z]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, letter: { letterChar: true, capital: false } });
            return;
        }
        if (value.match(/^[0-9]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, number: true });
            return;
        }
        if (value.match(/^['\-+=_`¬\/!@#$%^&*(),.?":{}|<>\u2010-\u2015\u2212]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, specialChar: true });
            return;
        }
        // Accepting a space + line break
        if (value.match(/^[ \n]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, specialChar: 'space' });
            return;
        }
    });

    mappedString.forEach(item => {
        let { letter: { letterChar, capital, mappedLetter }, value, index } = item;

        if (!letterChar) return encodedUserEntry.push(value);

        if (letterChar) {
            index = alphabet.indexOf(capital ? value.toLowerCase() : value);
            if (typeof index === 'number') {
                encodedUserEntry.push(capital ?
                    mappedLetter = mappedAlphabet[index].toUpperCase() :
                    mappedLetter = mappedAlphabet[index].toLowerCase());
                return;
            }

            encodedUserEntry.push(value);
        }
    });

    return encodedUserEntry.join('');
};

const useEncodedCipher = (entry: string = "", step: number = 0) => {
    const [userEntry, setUserEntry] = useState(entry);
    const [userStep, setUserStep] = useState(step);

    const cipherString = useMemo(() => encodedCipher(userEntry, userStep), [userEntry, userStep]);
    const mappedAlphabet = useMemo(() => mapAlphabet(userStep), [userStep]);

    return { cipherString, setUserEntry, setUserStep, mappedAlphabet, userStep };
};

export default useEncodedCipher;



