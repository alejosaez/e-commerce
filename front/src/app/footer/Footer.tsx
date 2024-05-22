import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black mx-auto px-4 sm:px-6 lg:px-6 mt-6">
      <div className="mx-auto px-2 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <div>
            <p className="font-medium text-gray-900">Services</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">
                  {" "}
                  1on1 Coaching{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">
                  {" "}
                  Company Review{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">
                  {" "}
                  Accounts Review{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75">
                  {" "}
                  HR Consulting{" "}
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-4 md:mt-8">

            <ul className="mt-8 flex justify-center gap-6">
              <li>
                <a
                  href="https://www.linkedin.com/in/alejo-saez-gebicki/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">LinkedIn</span>

                  <FaLinkedin size="2.3em" />
                 
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/alejosaez"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>
                  <SiGithub size="2.3em" />

                </a>
              </li>
            </ul>
          </div>

        </div>

        <p className="text-xs text-gray-300">
          &copy; 2024. Created by Alejo Saez Gebicki Full stack developer

        </p>
      </div>
    </footer>
  );
};

export default Footer;
