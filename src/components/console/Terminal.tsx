import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  exerciseTitle: string;
  onSubmit: (command: string) => void;
  isCorrect: boolean | null;
  isDisabled?: boolean;
  lastOutput?: string;
}

export function Terminal({
  exerciseTitle,
  onSubmit,
  isCorrect,
  isDisabled = false,
  lastOutput,
}: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'error' | 'success'; text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Add output to history when isCorrect changes
  useEffect(() => {
    if (isCorrect !== null && lastOutput) {
      setHistory((prev) => [
        ...prev,
        { type: isCorrect ? 'success' : 'error', text: lastOutput },
      ]);
    }
  }, [isCorrect, lastOutput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isDisabled) return;

    // Add command to history
    setHistory((prev) => [...prev, { type: 'input', text: input.trim() }]);
    onSubmit(input.trim());
    setInput('');
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-border/20">
      {/* macOS-style title bar */}
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="flex-1 text-center text-foreground-muted text-sm font-mono">
          {exerciseTitle}
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="bg-terminal-bg p-4 min-h-[300px] max-h-[400px] overflow-y-auto cursor-text"
      >
        {/* Welcome message */}
        <div className="text-terminal-output font-mono text-sm mb-4">
          <p>BreachReady Console Simulator v1.0</p>
          <p className="text-foreground-muted">Type the command to complete the exercise.</p>
          <p className="text-foreground-muted">---</p>
        </div>

        {/* Command history */}
        <div className="space-y-2">
          {history.map((item, index) => (
            <div key={index} className="font-mono text-sm">
              {item.type === 'input' && (
                <div className="flex items-start gap-2">
                  <span className="text-brand-accent">analyst@breachready:~$</span>
                  <span className="text-terminal-green">{item.text}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="text-terminal-output pl-4">{item.text}</div>
              )}
              {item.type === 'error' && (
                <motion.div
                  initial={{ backgroundColor: 'rgba(155, 35, 53, 0.3)' }}
                  animate={{ backgroundColor: 'transparent' }}
                  transition={{ duration: 0.8 }}
                  className="text-red-500 pl-4 rounded"
                >
                  {item.text}
                </motion.div>
              )}
              {item.type === 'success' && (
                <motion.div
                  initial={{ backgroundColor: 'rgba(212, 135, 10, 0.3)' }}
                  animate={{ backgroundColor: 'transparent' }}
                  transition={{ duration: 0.6 }}
                  className="text-brand-accent pl-4 rounded"
                >
                  {item.text}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-brand-accent font-mono text-sm">analyst@breachready:~$</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isDisabled}
              className="w-full bg-transparent text-terminal-green font-mono text-sm outline-none caret-terminal-green"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            {/* Blinking cursor when empty */}
            <AnimatePresence>
              {input === '' && !isDisabled && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute left-0 top-0 w-2 h-5 bg-terminal-green"
                />
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}
