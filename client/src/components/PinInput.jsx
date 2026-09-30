import { useRef } from 'react';
import { CODE_LENGTH } from '../utils/constants.js';

const PinInput = ({ value = '', onChange, disabled }) => {
  const refs = useRef([]);
  const digits = Array.from({ length: CODE_LENGTH }, (_, i) => value[i] || '');

  const update = (next) => onChange(next.replace(/\D/g, '').slice(0, CODE_LENGTH));

  const handleInput = (i, e) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    if (!char) return;
    const next = digits.slice();
    next[i] = char;
    update(next.join(''));
    if (i < CODE_LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = digits.slice();
      if (next[i]) {
        next[i] = '';
        update(next.join(''));
      } else if (i > 0) {
        next[i - 1] = '';
        update(next.join(''));
        refs.current[i - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === 'ArrowRight' && i < CODE_LENGTH - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    update(pasted);
    refs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  return (
    <div className="flex w-full min-w-0 gap-2 sm:gap-3">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={digit}
          onChange={(e) => handleInput(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          disabled={disabled}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          className="aspect-square min-w-0 flex-1 rounded-2xl border border-line bg-white/5 text-center text-3xl font-semibold outline-none transition focus:border-white disabled:opacity-50 sm:text-4xl"
        />
      ))}
    </div>
  );
};

export default PinInput;