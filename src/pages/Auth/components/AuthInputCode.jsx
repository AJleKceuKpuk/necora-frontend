import { useEffect, useRef } from 'react';


const AuthInputCode = ({
    valueArray,
    setValueArray,
    error,
    onComplete,
    resetError,
    length = 6,
    disabled = false,
}) => {
    const inputRefs = useRef([]);

    useEffect(() => {
        if (!disabled) inputRefs.current[0]?.focus();
    }, [disabled]);

    useEffect(() => {
        if (error) {
            setValueArray(Array(length).fill(''));
            inputRefs.current[0]?.focus();
        }
    }, [error, length, setValueArray]);

    const handlePaste = (e) => {
        if (disabled) return;
        e.preventDefault();
        const pasted = e.clipboardData.getData('Text').trim();
        if (new RegExp(`^[0-9]{${length}}$`).test(pasted)) {
            resetError();
            const chars = pasted.split('');
            setValueArray(chars);
            inputRefs.current[length - 1]?.focus();
            onComplete(chars.join(''));
        }
    };

    const handleChange = (i, val) => {
        if (disabled) return;
        if (!/^[0-9]?$/.test(val)) return;
        if (error) resetError();

        const updated = [...valueArray];
        updated[i] = val;
        setValueArray(updated);

        if (val && i < length - 1) {
            inputRefs.current[i + 1]?.focus();
        }
        if (updated.every(c => c.length === 1)) {
            onComplete(updated.join(''));
        }
    };

    const handleKeyDown = (i, e) => {
        if (disabled) return;
        if (e.key === 'Backspace' && !valueArray[i] && i > 0) {
            inputRefs.current[i - 1]?.focus();
        }
    };

    return (
        <div
            className={`auth__form-code ${error ? 'auth__form-code--error' : ''} ${disabled ? 'auth__form-code--disabled' : ''}`}
            onPaste={handlePaste}
        >
            {valueArray.map((val, i) => (
                <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={val}
                    ref={el => (inputRefs.current[i] = el)}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    disabled={disabled}
                    className="auth__form-code-cell"
                />
            ))}
        </div>
    );
};

export default AuthInputCode;
