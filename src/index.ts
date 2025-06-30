import { Plugin } from "@elizaos/core";
import { actionGetAccountBalance } from "./actions/actionGetAccountBalance";
import { actionGetBlockchainStats } from "./actions/actionGetBlockchainStats";
import { actionGetCurrencies } from "./actions/actionGetCurrencies";
import { actionGetInteractions } from "./actions/actionGetInteractions";
import { actionGetNFTHolders } from "./actions/actionGetNFTHolders";
import { actionGetNFTMetadata } from "./actions/actionGetNFTMetadata";
import { actionGetNFTsByOwner } from "./actions/actionGetNFTsByOwner";
import { actionGetNFTTransfers } from "./actions/actionGetNFTTransfers";
import { actionGetTokenHolders } from "./actions/actionGetTokenHolders";
import { actionGetTokenHoldersCount } from "./actions/actionGetTokenHoldersCount";
import { actionGetTokenPrice } from "./actions/actionGetTokenPrice";
import { actionGetTokenTransfers } from "./actions/actionGetTokenTransfers";
import { actionGetTransactionsByAddress } from "./actions/actionGetTransactionsByAddress";
import { actionGetTransactionsByHash } from "./actions/actionGetTransactionsByHash";

// ElizaOS v2 Plugin Export
const actions = [
  actionGetTokenHolders,
  actionGetTokenHoldersCount,
  actionGetTokenPrice,
  actionGetTokenTransfers,
  actionGetAccountBalance,
  actionGetTransactionsByAddress,
  actionGetTransactionsByHash,
  actionGetBlockchainStats,
  actionGetCurrencies,
  actionGetInteractions,
  actionGetNFTHolders,
  actionGetNFTTransfers,
  actionGetNFTMetadata,
  actionGetNFTsByOwner,
];

const ankrPlugin: Plugin = {
  name: "plugin-ankr",
  description: "Ankr Plugin for web3",
  config: {
    ANKR_API_KEY: {
      type: "string",
      minLength: 1,
      description: "ANKR_API_KEY is required",
    },
  },
  actions,
  evaluators: [],
};

export { actions, ankrPlugin };
export default ankrPlugin;
