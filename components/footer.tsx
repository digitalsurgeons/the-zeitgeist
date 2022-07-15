import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="px-4 py-10 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
      <nav className="flex flex-col items-center gap-8">
        <ul className="flex gap-6 items-center text-lg mx-16 font-medium translate-y-[1px]">
          <li>
            <a
              href="#"
              className="text-white transition duration-300 hover:text-teal-500">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white transition duration-300 hover:text-teal-500">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white transition duration-300 hover:text-teal-500">
              <FaDiscord />
            </a>
          </li>
        </ul>
      </nav>
      <p className="mt-8 text-base text-center text-gray-300">
        &copy; 2022 The ZeitGeist. All rights reserved.
      </p>
    </footer>
  )
}
