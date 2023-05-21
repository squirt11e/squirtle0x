import Link from 'next/link';
import { BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="mt-auto">
      <ul className="flex flex-row flex-wrap gap-4 justify-end">
        <li className="flex flex-col">
          <Link href="https://twitter.com/squirtle0x">
            <BsTwitter size="1.5em" className="text-teal hover:text-lightBlue transition-colors" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
