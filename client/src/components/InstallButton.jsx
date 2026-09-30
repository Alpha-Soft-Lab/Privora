import { useInstallPrompt } from '../hooks/useInstallPrompt.js';
import { DownloadIcon } from './Icons.jsx';

const InstallButton = () => {
  const { canInstall, install } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <button
      onClick={install}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition hover:border-mist"
    >
      <DownloadIcon />
      Install app
    </button>
  );
};

export default InstallButton;
