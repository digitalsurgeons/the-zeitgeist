import { FaTwitter, FaInstagram } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="px-4 py-10 mx-auto mt-20 overflow-hidden max-w-7xl sm:px-6 lg:px-8">
      <p className="mt-8 text-base text-center text-gray-300">
        &copy; {new Date().getFullYear()} The Zeitgeist. All rights reserved.
        <br />
        Made with love by{' '}
        <a
          className="text-teal-400"
          href="https://www.digitalsurgeons.com/"
          title="Brand Innovation Agency and Design Studio"
        >
          Digital Surgeons
        </a>
        .
      </p>
    </footer>
  )
}
