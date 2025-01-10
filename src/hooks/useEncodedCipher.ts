import { useMemo, useState } from "react"

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function mapAlphabet(shift: number): string[] {
    const normalizedShift = ((shift % 26) + 26) % 26; // Ensure shift is always positive and within 0-25
    return [...alphabet.slice(-normalizedShift), ...alphabet.slice(0, -normalizedShift)];
}

function encodedCipher(entry: string, step: number) {
    const mappedAlphabet = mapAlphabet(step)
    const userEntry = entry
    let mappedStringIndex: number[] = []
    let encodedUserEntry: string[] = []
    let output: string[] = []

    output = userEntry.split("")

    output.map(letter => {
        mappedStringIndex.push(alphabet.indexOf(letter))
    })

    mappedStringIndex.forEach(value => {
        if (value === -1) encodedUserEntry.push(" ")
        else encodedUserEntry.push(mappedAlphabet[value])
    })

    return encodedUserEntry.join('')
}

export function useEncodedCipher(entry: string = "", step: number = 0) {
    const [userEntry, setUserEntry] = useState(entry)
    const [userStep, setUserStep] = useState(step)

    const cipherString = useMemo(() => encodedCipher(userEntry, userStep), [userEntry, userStep]);
    const mappedAlphabet = useMemo(() => mapAlphabet(userStep), [userStep]);

    return { cipherString, setUserEntry, setUserStep, mappedAlphabet, userStep }
}



