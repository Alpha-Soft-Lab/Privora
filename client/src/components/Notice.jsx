import Logo from './Logo.jsx';

const Notice = ({ title, message, children }) => (
  <div className="mx-auto flex min-h-full max-w-md flex-col items-start justify-center gap-6 px-6">
    <Logo size={44} showName={false} />
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-mist">{message}</p>
    </div>
    <div className="flex flex-wrap gap-3">{children}</div>
  </div>
);

export default Notice;
