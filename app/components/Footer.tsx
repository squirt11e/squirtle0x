import Link from 'next/link';
import { BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="mt-auto">
      <h3 className="mb-2 text-lg font-semibold text-light">Socials</h3>

      <ul className="flex flex-row flex-wrap gap-4">
        <li className="flex flex-col">
          <Link href="https://twitter.com/squirtle0x">
            <BsTwitter size="1.25em" className="text-purple" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
