import { useEffect, useRef } from "react";
import "./auth.css"; // если стили общие

const AuthInputCode = ({
    valueArray,
    setValueArray,
    error,
    onComplete,
    resetError,
    length = 6,
}) => {
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("Text").trim();
        if (new RegExp(`^[0-9a-zA-Z]{${length}}$`).test(pasted)) {
            const chars = pasted.split("");
            setValueArray(chars);
            resetError();
            inputRefs.current[length - 1]?.focus();
            onComplete(chars.join(""));
        }
    };

    const handleChange = (i, val) => {
        if (!/^[0-9a-zA-Z]?$/.test(val)) return;
        const updated = [...valueArray];
        updated[i] = val;
        setValueArray(updated);
        resetError();

        if (val && i < length - 1) inputRefs.current[i + 1]?.focus();
        if (updated.every((c) => c.length === 1)) {
            onComplete(updated.join(""));
        }
    };

    const handleKeyDown = (i, e) => {
        if (e.key === "Backspace" && !valueArray[i] && i > 0) {
            inputRefs.current[i - 1]?.focus();
        }
    };

    return (
        <div
            className={`code-input-wrapper ${error ? "error" : ""}`}
            onPaste={handlePaste}
        >
            {valueArray.map((val, i) => (
                <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={val}
                    ref={(el) => (inputRefs.current[i] = el)}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="code-input-cell"
                />
            ))}
        </div>
    );
};

export default AuthInputCode;
