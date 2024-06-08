import React from 'react'
import Link from 'next/link'
import siteMetadata from '@/data/SiteMetaData'
import Image from 'next/image'
import { useIntl } from 'react-intl'
import { FaPhone } from "react-icons/fa";
export default function Footer() {
  return (
    <footer>
      <div className="py-12 w-screen md:py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-14">

          {/* Top area: Blocks */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">

            {/* 1st block */}

            <div className="md:col-span-5 lg:col-span-6">
              <div className="mb-2 flex gap-4 items-center">
                {/* Logo */}
                <Link href="/" className="inline-block" aria-label="Cruip">
                  <Image
                    src={siteMetadata.logo}
                    alt="/"
                    width="100"
                    height="100"
                  />
                </Link>
                <Link href="tel: 84977678999" className="inline-block" aria-label="Cruip">
                  <div className="text-white flex items-center justify-center text-xl font-bold rounded-full gap-2 bg-red-600 p-3">
                    <FaPhone /> HOTLINE
                  </div>
                </Link>
              </div>
              <div className="text-gray-100">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</div>
            </div>
            {/*1st, 2nd, 3rd blocks */}
            <div className="md:col-span-10 lg:col-span-12 grid sm:grid-cols-3 gap-8">

              {/* 1nd block */}
              <div className="text-sm">
                <h6 className="text-white font-bold uppercase mb-1">
                  {'Footer.block1.line1'}
                </h6>
                <ul className="list-disc marker:text-white">
                  <li className="mb-2">
                    <Link href="/" className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {'Footer.block1.line2'}
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="../public/postal_license" className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {'Footer.block1.line3'}
                    </Link>
                  </li>
                </ul>
              </div>
              {/* 2nd block */}
              <div className="text-sm">
                <h6 className="text-white font-bold uppercase mb-1">
                  {'Footer.block2.line1'}
                </h6>
                <ul className="list-disc marker:text-white">
                  <li className="mb-1">
                    <Link href="https://TD Group.net.vn" className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {'Footer.block2.line2'}
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="https://delivery.TD Group.net.vn" className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {'Footer.block2.line3'}
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="https://app.TD Group.net.vn" className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {'Footer.block2.line4'}
                    </Link>
                  </li>
                </ul>
              </div>
              {/* 3th block */}
              <div className="text-sm">
                <h6 className="text-white font-bold uppercase mb-1">
                  {'Footer.block3.line1'}
                </h6>
                <ul className="list-disc marker:text-white">
                  <li className="mb-1">
                    <Link href="/" className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {'Footer.block3.line2' + siteMetadata.address}
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/" className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {'Footer.block3.line3' + siteMetadata.phone}
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/" className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {'Footer.block3.line4' + siteMetadata.email}
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">

            {/* Social links */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li>
                <Link href={siteMetadata.twitter} className="flex justify-center items-center text-red-800 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 rounded-full transition duration-150 ease-in-out"
                  aria-label="Twitter">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link href={siteMetadata.facebook} className="flex justify-center items-center text-red-800 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 rounded-full transition duration-150 ease-in-out"
                  aria-label="Facebook">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link href={siteMetadata.linkedin} className="flex justify-center items-center text-red-800 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 rounded-full transition duration-150 ease-in-out"
                  aria-label="Linkedin">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link href={`mailto:${siteMetadata.email}`} className="flex w-8 h-8  justify-center items-center text-red-800 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 rounded-full transition duration-150 ease-in-out"
                  aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="fill-current" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z">
                    </path>
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="text-gray-400 text-sm mr-4">&copy; TD Group.com. All rights reserved.</div>

          </div>

        </div>
      </div>
    </footer>
  )
}
