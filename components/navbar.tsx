import Link from 'next/link';


const Navbar = () => {
  return (
    <nav className="bg-[#86D0C9] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-white text-2xl font-bold">
            NU World Cup
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/management" className="text-white hover:underline">
              Management Console
            </Link>
          </li>
          <li>
            <Link href="/tournaments" className="text-white hover:underline">
              Tournaments
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:underline">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/events" className="text-white hover:underline">
              Events
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="text-white hover:underline">
              Gallery
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;