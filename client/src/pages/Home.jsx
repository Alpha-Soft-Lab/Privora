import Logo from '../components/Logo.jsx';
import InstallButton from '../components/InstallButton.jsx';
import JoinRoomCard from '../components/JoinRoomCard.jsx';
import CreateRoomCard from '../components/CreateRoomCard.jsx';
import appConfig from '../config/appconfig.js';

const Home = () => (
  <div className="mx-auto flex min-h-full max-w-6xl flex-col px-4 py-6 sm:px-10">
    <header className="flex items-center justify-between">
      <Logo />
      <InstallButton />
    </header>

    <main className="grid flex-1 grid-cols-1 items-center gap-8 py-8 sm:py-10 lg:grid-cols-2 lg:gap-16">
      <section className="min-w-0 text-center lg:text-left">
        <p className="text-xs font-medium uppercase tracking-widest text-mist sm:text-sm">
          {appConfig.tagline}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Four digits open the door.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-mist sm:text-lg lg:mx-0">
          Enter the code someone shared with you, or start a new call and send
          them yours.
        </p>
      </section>

      <section className="mx-auto flex w-full min-w-0 max-w-md flex-col gap-6 rounded-3xl border border-line p-5 sm:p-8">
        <JoinRoomCard />

        <div className="flex items-center gap-4 text-mist">
          <span className="h-px flex-1 bg-line" />
          <span className="text-sm">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <CreateRoomCard />
      </section>
    </main>

    <footer className="py-4 text-center text-sm text-mist">
      {appConfig.name} · Powered by {appConfig.Poweredby}
    </footer>
  </div>
);

export default Home;