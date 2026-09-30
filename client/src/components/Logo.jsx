import appConfig from "../config/appconfig";

const Logo = ({ size = 40, showName = true }) => (
  <div className="flex items-center gap-3">
    <img
      src="/logo.png"
      alt="Private Calls logo"
      width={size}
      height={size}
      className="rounded-xl border border-line"
    />
    {showName && <span className="text-lg font-semibold tracking-tight">{appConfig.name}</span>}
  </div>
);

export default Logo;
