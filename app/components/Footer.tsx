import Link from 'next/link';
import { BsGithub, BsPenFill, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="mt-auto">
      <ul className="flex flex-row flex-wrap gap-8 justify-end">
        <li className="flex flex-col">
          <Link href="https://twitter.com/squirtle0x">
            <BsTwitter size="1.5em" className="text-teal hover:text-lightBlue transition-colors" />
          </Link>
        </li>
        <li className="flex flex-col">
          <Link href="https://github.com/squirt11e">
            <BsGithub size="1.5em" className="text-teal hover:text-lightBlue transition-colors" />
          </Link>
        </li>
        <li className="flex flex-col">
          <Link href="https://mirror.xyz/squirt11e.eth">
            <BsPenFill size="1.5em" className="text-teal hover:text-lightBlue transition-colors" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
