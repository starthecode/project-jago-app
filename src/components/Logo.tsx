import { FaHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        <FaHeart className="h-8 w-8 text-primary fill-primary" />
        <span className="text-2xl font-bold text-foreground">
          Jaago India Jaago
        </span>
      </Link>
    </div>
  );
}
