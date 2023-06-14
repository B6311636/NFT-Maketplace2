
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { BaseLayout, Marketplace, NftList } from '@ui';
import { useNetwork } from '@hooks/web3';
import { ExclamationIcon } from '@heroicons/react/solid';

const Home: NextPage = () => {
  const { network } = useNetwork();

  return (
    <BaseLayout>
      <Marketplace />
    </BaseLayout>
  )
}

export default Home
