/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'

import { Nft } from '@_types/nft';
import { useOwnedNfts } from '@hooks/web3';
import { Fragment, useEffect, useState } from 'react';
import { BaseLayout, WalletBar } from '@ui';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

const tabs = [
  { name: 'Your Collection', href: '#', current: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Profile: NextPage = () => {
  const { nfts } = useOwnedNfts();
  const [price, setPrice] = useState('');
  const [activeNft, setActiveNft] = useState<Nft>();
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true)
  }

  useEffect(() => {
    if (nfts.data && nfts.data.length > 0) {
      setActiveNft(nfts.data[0]);
    }

    return () => setActiveNft(undefined)
  }, [nfts.data])

  console.log(activeNft);

  return (
    <BaseLayout>
      <WalletBar />
      <div className="h-full flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-gray-900">Your NFTs</h1>
                </div>
                <div className="mt-3 sm:mt-2">
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-gray-200">
                      <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? 'page' : undefined}
                            className={classNames(
                              tab.current
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {(nfts.data as Nft[]).map((nft) => (
                      <li
                        key={nft.tokenId}
                        onClick={() => setActiveNft(nft)}
                        className="relative">
                        <div
                          className={classNames(
                            nft.tokenId === activeNft?.tokenId
                              ? 'ring-2 ring-offset-2 ring-indigo-500'
                              : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                            'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                          )}
                        >
                          <img
                            src={nft.meta.image}
                            alt=""
                            className={classNames(
                              nft.tokenId === activeNft?.tokenId ? '' : 'group-hover:opacity-75',
                              'object-cover pointer-events-none'
                            )}
                          />
                          <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {nft.meta.name}</span>
                          </button>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                          {nft.meta.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>

            {/* Details sidebar */}
            <aside className="hidden w-96 my-20 rounded-lg bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
              {activeNft &&
                <div className="pb-16 space-y-6">
                  <div>
                    <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                      <img src={activeNft.meta.image} alt="" className="object-cover" />
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">
                          <span className="sr-only">Details for </span>
                          {activeNft.meta.name}
                        </h2>
                        <p className="text-sm font-medium text-gray-500">{activeNft.meta.description}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Information</h3>
                    <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                      {activeNft.meta.attributes.map((attr) => (
                        <div key={attr.trait_type} className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">{attr.trait_type}: </dt>
                          <dd className="text-gray-900 text-right">{attr.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="flex">
                    {/* <button
                      type="button"
                      className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Download Image
                    </button> */}
                    <button
                      disabled={activeNft.isListed}
                      onClick={openModal}
                      type="button"
                      className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {activeNft.isListed ? "Nft is listed" : "List Nft"}
                    </button>
                  </div>
                </div>
              }
            </aside>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full rounded-lg items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img src={activeNft?.meta.image} className="object-cover object-center" />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{activeNft?.meta.name}</h2>
                        <div className="flex mt-1">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 mr-2">Created by</p>
                          <p className="text-xs mt-0.5 font-medium text-gray-500 group-hover:text-gray-700">{activeNft?.creator}</p>
                        </div>
                        <section aria-labelledby="information-heading" className="mt-2">
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>
                          <p className="flex text-2xl text-gray-900">
                            <img className="h-8" src="/images/small-eth.webp" alt="ether icon" />
                            {activeNft?.price}
                          </p>

                          {/* Reviews */}
                          <div className="mt-0">
                            <div className="flex items-center">
                              <h4 className="mr-5">Description: </h4>
                              <p className="mt-3 mb-3 text-base text-gray-500">{activeNft?.meta.description}</p>
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="options-heading" className="mt-10">
                          <div className='flex'>
                            {activeNft?.meta.attributes.map(attribute =>
                              <div key={attribute.trait_type} className="flex flex-col px-4 pt-4">
                                <dt className="order-2 text-sm font-medium text-gray-500">
                                  {attribute.trait_type}
                                </dt>
                                <dd className="order-1 text-xl font-extrabold text-indigo-600">
                                  {attribute.value}
                                </dd>
                              </div>
                            )}
                          </div>
                          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div>
                              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price (ETH)
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  onChange={(e) => setPrice(e.target.value)}
                                  type="number"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                  placeholder="0.8"
                                />
                              </div>
                            </div>
                          </div>
                          {activeNft &&
                            <button
                              type="submit"
                              onClick={() => {
                                nfts.listNft(
                                  activeNft.tokenId,
                                  parseInt(price)
                                )
                              }}
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              {activeNft.isListed ? "Nft is listed" : "List Nft"}
                            </button>
                          }
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root >
    </BaseLayout>
  )
}

export default Profile
