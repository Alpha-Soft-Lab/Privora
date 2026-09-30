const variants = {
  primary: 'bg-paper text-ink hover:bg-white active:scale-[0.98]',
  outline: 'border border-line text-paper hover:border-mist active:scale-[0.98]',
  danger: 'bg-signal text-white hover:brightness-110 active:scale-[0.98]',
};

const Button = ({ variant = 'primary', className = '', children, ...props }) => (
  <button
    className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
