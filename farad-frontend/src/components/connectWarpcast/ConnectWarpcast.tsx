import {
    DynamicWidget,
    useDynamicContext,
    useSocialAccounts,
  } from '@dynamic-labs/sdk-react-core';
  import { ProviderEnum } from '@dynamic-labs/types';
  import { FarcasterIcon, GoogleIcon, TwitterIcon } from '@dynamic-labs/iconic';

export default function ConnectWarpcast() {
  const { error, isProcessing, signInWithSocialAccount } = useSocialAccounts();

    return (
        <>
        <button onClick={() => signInWithSocialAccount(ProviderEnum.Farcaster)} className='flex justify-between items-center glass p-2 rounded-lg'>
          <FarcasterIcon width={32} height={32} />
          <span className='text-xl ml-2 pr-2 text-slate-300'>Sign in with Farcaster</span>
        </button>
        </>
    )
}