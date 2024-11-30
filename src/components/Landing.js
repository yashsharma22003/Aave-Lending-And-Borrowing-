import { ArrowUpOnSquareIcon, ArrowDownOnSquareIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';

const Landing = () => {

    return (
        <div className='flex-col h-screen flex justify-center '>
            <div className="mx-10">
                <h1 className="text-3xl font-bold">Access the full power of DeFi.</h1>
                <h4 className="text-lg font-semibold mt-2 flex ml-40">Aave is the world’s largest liquidity protocol.</h4>
                <h4 className="text-lg font-semibold flex ml-40">Supply, borrow, swap, stake and more..</h4>
            </div>
            <div className="flex justify-center w-screen">
                <div className="flex m-auto">
                    <Link href={"./market"}>
                        <button className="rounded-3xl border-black bg-black text-gray-50 border-4 p-1" > Get Started</button>
                    </Link>
                </div>
                <div className="flex flex-col m-auto p-4">
                    <h1 className="text-xl p-2">Through Aave You Can</h1>
                    <h1 className="text-sm flex ">
                        <ArrowUpOnSquareIcon className='size-5 mx-2' />
                        Supply</h1>
                    <h1 className="text-sm flex">
                        <ArrowDownOnSquareIcon className='size-5 mx-2' />
                        Borrow</h1>
                    <h1 className="text-sm flex">
                        <CurrencyDollarIcon className='size-5 mx-2' />
                        Redeem ITOK</h1>

                </div>
            </div>

        </div>
    );

}

export default Landing;