import Header from "@/components/Header";
import '@rainbow-me/rainbowkit/styles.css';
import Footer from '@/components/Footer';
import { MarketProvider } from "./marketContext";
export default function MarketLayout({ children, assetsToBorrow, assetsToSupply, borrows, supplies }) {

    return (<>      <div>
        <MarketProvider>
            {children}
            <div className="h-screen flex justify-center items-center space-x-10 border-black">

                <div>

                    {supplies}
                    {assetsToSupply}
                </div>
                <div className="space-y-10">
                    {borrows}
                    {assetsToBorrow}
                </div>
            </div>
        </MarketProvider>
    </div>
    </>
    )

}