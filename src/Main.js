import { WagmiConfig, createClient, configureChains } from "wagmi";

import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import App from "./App";
import { ConnectKitProvider } from "connectkit";

const bscTestnet = {
	id: 97,
	name: "BSC Testnet",
	network: "BSC Testnet",
	nativeCurrency: {
		decimals: 18,
		name: "BSC Testnet",
		symbol: "TBNB",
	},
	rpcUrls: {
		default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
	},
	blockExplorers: {
		default: { name: "BSCScan", url: "https://testnet.bscscan.com" },
	},
	testnet: true,
};

const { chains, provider } = configureChains([bscTestnet], [publicProvider()]);

const client = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: "wagmi",
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				qrcode: true,
			},
		}),
		new InjectedConnector({
			chains,
			options: {
				name: "Injected",
				shimDisconnect: true,
			},
		}),
	],
	provider,
});

function Main() {
	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider>
				<App />
			</ConnectKitProvider>
		</WagmiConfig>
	);
}

export default Main;
