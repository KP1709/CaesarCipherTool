import { useMemo, useState } from "react"

type MappedStringType = {
    value: string;
    letter: {
        letter: boolean;
        capital: boolean;
        mappedLetter?: string
    }
    specialChar: boolean | 'space';
    number: boolean;
    index: number | null;
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function mapAlphabet(shift: number): string[] {
    const normalizedShift = ((shift % 26) + 26) % 26; // Ensure shift is always positive and within 0-25
    return [...alphabet.slice(-normalizedShift), ...alphabet.slice(0, -normalizedShift)];
}

function encodedCipher(entry: string, step: number) {
    const mappedAlphabet = mapAlphabet(step)
    const userEntry = entry
    let mappedString: MappedStringType[] = []
    let encodedUserEntry: string[] = []
    let userEntrySplit: string[] = []

    userEntrySplit = userEntry.split("")

    const defaultMappedString: MappedStringType = {
        value: '', letter: { letter: false, capital: false}, specialChar: false, number: false, index: null 
    }

    userEntrySplit.forEach(value => {
        if (value.match(/^[A-Z]*$/)) {
            mappedString.push({...defaultMappedString, value: value, letter:{ letter: false, capital: false}})
        }
        else if (value.match(/^[a-z]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, letter: {letter: true,capital: false }})
        }
        else if (value.match(/^[0-9]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, number: true})
        }
        else if (value.match(/^['-+=_`¬\/!@#$%^&*(),.?":{}|<>]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, specialChar: true})
        }
        // Accepting a space + line break
        else if (value.match(/^[ \n]*$/)) {
            mappedString.push({ ...defaultMappedString, value: value, specialChar: 'space', number: false})
        }
    })

    mappedString.forEach(item => {
        if (item.letter.letter) {
            item.index = alphabet.indexOf(item.letter.capital ? item.value.toLowerCase() : item.value);
            if (typeof item.index === 'number') {
                encodedUserEntry.push(item.letter.capital ?
                    item.letter.mappedLetter = mappedAlphabet[item.index].toUpperCase() :
                    item.letter.mappedLetter = mappedAlphabet[item.index].toLowerCase())
            }
            else {
                encodedUserEntry.push(item.value);
            }
        }
        else {
            encodedUserEntry.push(item.value);
        }
    });

    return encodedUserEntry.join('')
}

export function useEncodedCipher(entry: string = "", step: number = 0) {
    const [userEntry, setUserEntry] = useState(entry)
    const [userStep, setUserStep] = useState(step)

    const cipherString = useMemo(() => encodedCipher(userEntry, userStep), [userEntry, userStep]);
    const mappedAlphabet = useMemo(() => mapAlphabet(userStep), [userStep]);

    return { cipherString, setUserEntry, setUserStep, mappedAlphabet, userStep }
}



