import Logo from '../../Logo';
import { UserProfile } from './UserProfile';

const DashHead = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4 w-lg">
          <div className="max-w-md w-md">
            <span className="text-sm text-muted-foreground hidden md:inline">
              Welcome,
            </span>
          </div>
          <UserProfile />
        </div>
      </div>
    </nav>
  );
};

export default DashHead;
