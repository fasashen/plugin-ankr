export declare enum Blockchains {
    ARBITRUM = "arbitrum",
    AVALANCHE = "avalanche",
    BASE = "base",
    BSC = "bsc",
    ETH = "eth",
    FANTOM = "fantom",
    FLARE = "flare",
    GNOSIS = "gnosis",
    LINEA = "linea",
    OPTIMISM = "optimism",
    POLYGON = "polygon",
    POLYGON_ZKEVM = "polygon_zkevm",
    ROLLUX = "rollux",
    SCROLL = "scroll",
    SYSCOIN = "syscoin",
    TELOS = "telos",
    XAI = "xai",
    XLAYER = "xlayer",
    STORY_MAINNET = "story_mainnet",
    AVALANCHE_FUJI = "avalanche_fuji",
    BASE_SEPOLIA = "base_sepolia",
    ETH_HOLESKY = "eth_holesky",
    ETH_SEPOLIA = "eth_sepolia",
    OPTIMISM_TESTNET = "optimism_testnet",
    POLYGON_AMOY = "polygon_amoy",
    STORY_TESTNET = "story_testnet"
}
export declare const blockchains: readonly string[];
export type BlockchainTag = Blockchains;
export declare const blockchainInfoMap: Record<Blockchains, {
    tag: Blockchains;
    fullName: string;
    isTestnet?: boolean;
}>;
export declare function getBlockchainTagFromName(name: string): BlockchainTag | undefined;
export declare function isTestnet(blockchain: BlockchainTag): boolean;
