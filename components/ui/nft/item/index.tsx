/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition, RadioGroup } from '@headlessui/react'
import { FunctionComponent, Fragment, useState } from 'react'
import { NftMeta, Nft } from "../../../../types/nft";
import { XIcon } from '@heroicons/react/solid';

type NftItemProps = {
  item: Nft;
  buyNft: (token: number, value: number) => Promise<void>;
}

function shortifyAddress(address: string) {
  return `0x****${address.slice(-4)}`
}

// function classNames(...classes: any[]) {
//   return classes.filter(Boolean).join(' ')
// }

const NftItem: FunctionComponent<NftItemProps> = ({ item, buyNft }) => {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true)
  }

  return (
    <>
      <div className="flex-shrink-0">
        <img
          className={`h-full w-full object-cover`}
          src={item.meta.image}
          alt="New NFT"
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center mt-2">
              {/* <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="/images/default_avatar.png"
                  alt=""
                />
              </div> */}
              {/* <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Creator</p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{shortifyAddress(item.creator)}</p>
              </div> */}
            </div>
          </div>
          <div className="block">
            <p className="text-xl font-semibold text-gray-900">{item.meta.name}</p>
          </div>
        </div>
        <div className="overflow-hidden mb-4">
          <dl className="-mx-4 -mt-4 flex flex-wrap">
            <div className="flex flex-col px-4 pt-4">
              <dt className="order-2 text-sm font-medium text-gray-500">Price</dt>
              <dd className="order-1 text-xl font-extrabold text-indigo-600">
                <div className="flex justify-center items-center">
                  {item.price}
                  <img className="h-6" src="/images/small-eth.webp" alt="ether icon" />
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <button
            onClick={() => {
              buyNft(item.tokenId, item.price);
            }}
            type="button"
            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Buy
          </button>
          <button
            type="button"
            onClick={openModal}
            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Preview
          </button>
        </div>
      </div>

      {/* Preview Pop Up */}
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
                        <img src={item.meta.image} className="object-cover object-center" />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{item.meta.name}</h2>
                        <div className="flex mt-1">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 mr-2">Created by</p>
                          <p className="text-xs mt-0.5 font-medium text-gray-500 group-hover:text-gray-700">{item.creator}</p>
                        </div>
                        <section aria-labelledby="information-heading" className="mt-2">
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>
                          <p className="flex text-2xl text-gray-900">
                            <img className="h-8" src="/images/small-eth.webp" alt="ether icon" />
                            {item.price}
                          </p>

                          {/* Reviews */}
                          <div className="mt-0">
                            <div className="flex items-center">
                              <h4 className="mr-5">Description: </h4>
                              <p className="mt-3 mb-3 text-base text-gray-500">{item.meta.description}</p>
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="options-heading" className="mt-10">
                          <div className='flex'>
                            {item.meta.attributes.map(attribute =>
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
                          <button
                            type="submit"
                            onClick={() => {
                              buyNft(item.tokenId, item.price);
                            }}
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Buy
                          </button>
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
    </>
  )
}

export default NftItem;
