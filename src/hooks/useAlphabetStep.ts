import { useReducer } from "react";

type State = {
    step: number;
};

const initialStepState: State = {
    step: 0
};

type Action = {
    type: 'increment_step' | 'decrement_step';
};

const adjustStepReducer = (state: State, action: Action): State => {
    const { type } = action;

    switch (type) {
        case 'increment_step':
            if (state.step === 25) return { ...state, step: state.step };
            else return { step: state.step + 1 };
        case 'decrement_step':
            if (state.step === 0) return { ...state, step: state.step };
            else return { step: state.step - 1 };
        default:
            return state;
    }
};

const useAlphabetStep = () => {
    const [state, dispatch] = useReducer(adjustStepReducer, initialStepState);
    return {
        increment_step: () => dispatch({ type: 'increment_step' }),
        decrement_step: () => dispatch({ type: 'decrement_step' }),
        step: state.step,
    };
};

export default useAlphabetStep;