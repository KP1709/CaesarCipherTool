import { useEffect, useState } from "react";

type DisplayErrorProps = {
    userInput: string;
}

function DisplayError({ userInput }: DisplayErrorProps) {
    const [errors, setErrors] = useState<string[]>([])

    useEffect(() => {
        const newErrors: string[] = []
        if (/\d/.test(userInput)) {
            newErrors.push('Contains numerical characters')
        }
        if (/[!@#$%^&*(),.?":{}|<>]/.test(userInput)) {
            newErrors.push('Contains special characters')
        }
        setErrors(newErrors)
    }, [userInput])

    return (
        <div>
            <span>Invalid characters in input</span>
            <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    )
}

export default DisplayError 