"use client"
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import imageContact from "../../../public/imageContact.png"
export default function Page() {
  return (
    <section className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Hello, I'm Alejo Saez, I'm a fullstack developer.
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">
            If you're interested in contacting me to discuss
            the development of the app, you can do so through
            the following links:
          </p>

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
      </div>

      <img
  alt=""
  src={imageContact.src}
  className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
/>
    </section>
  );
}
