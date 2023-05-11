import { ERRORS } from "lib/errors";
import { CONFIG } from "./config";
import { parseMetamaskError } from "./web3/utils";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Wallet } from "features/auth/lib/authMachine";
import { ethers } from "ethers";

/**
 * A wrapper of Web3 which handles retries and other common errors.
 */
export class BumpkinWeb3 {
  private web3: ethers.providers.Web3Provider | null = null;

  private account: string | null = null;

  private async initialiseContracts() {
    try {
      // TODO setup contracts
    } catch (e: any) {
      // Timeout, retry
      if (e.code === "-32005") {
        console.error("Retrying...");
        await new Promise((res) => window.setTimeout(res, 3000));
      } else {
        console.error(e);
        throw e;
      }
    }
  }

  public hasWeb3() {
    return !!(window as any).ethereum || !!(window as any).web3;
  }

  public async setupWeb3() {
    // TODO add type support
    if ((window as any).ethereum) {
      try {
        // Request account access if needed
        // await (window as any).ethereum.enable();
        this.web3 = new ethers.providers.Web3Provider((window as any).ethereum);
      } catch (error) {
        // User denied account access...
        console.error("Error inside setupWeb3", error);
      }
    } else {
      throw new Error(ERRORS.NO_WEB3);
    }
  }

  public async requestAccess() {
    await (window as any).ethereum.enable();
  }

  public async getAccount() {
    if (!this.web3) {
      throw new Error(ERRORS.NO_WEB3);
    }

    const maticAccounts = await this.web3.listAccounts();
    return maticAccounts[0];
  }

  public async loadAccount() {
    this.account = await this.getAccount();

    return this.account;
  }

  public async initialise(provider: any, retryCount = 0): Promise<void> {
    try {
      // Smooth out the loading state
      await new Promise((res) => setTimeout(res, 1000));
      this.web3 = new ethers.providers.Web3Provider(provider);
      await this.loadAccount();

      const chainId = (await this.web3?.getNetwork()).chainId;

      if (!(chainId === CONFIG.POLYGON_CHAIN_ID)) {
        throw new Error(ERRORS.WRONG_CHAIN);
      }

      await this.initialiseContracts();
    } catch (e: any) {
      // If it is a user error, we don't want to retry
      if (e.message === ERRORS.WRONG_CHAIN || e.message === ERRORS.NO_WEB3) {
        throw e;
      }

      // If it is not a known error, keep trying
      if (retryCount < 3) {
        await new Promise((res) => setTimeout(res, 2000));

        return this.initialise(retryCount + 1);
      }

      throw e;
    }
  }

  public async connectedToPolygon() {
    const chainId = (await this.web3?.getNetwork())?.chainId;

    return chainId === CONFIG.POLYGON_CHAIN_ID;
  }

  public async isWalletConnected() {
    const accounts = await this.web3?.listAccounts();
    if (accounts?.length) return true;

    return false;
  }

  public isAlchemy = false;

  public async overrideProvider(wallet: Wallet, provider: any) {
    this.isAlchemy = true;

    if (CONFIG.ALCHEMY_RPC) {
      console.log("Provider overridden");

      let web3;

      if (wallet === "METAMASK") {
        web3 = createAlchemyWeb3(CONFIG.ALCHEMY_RPC);
      } else {
        web3 = createAlchemyWeb3(CONFIG.ALCHEMY_RPC, {
          writeProvider: provider,
        });
      }

      this.web3 = new ethers.providers.Web3Provider(web3 as any);

      await this.initialiseContracts();
    }
  }

  public async signTransaction(nonce: number, account = this.account) {
    if (!this.web3) {
      throw new Error(ERRORS.NO_WEB3);
    }

    const message = this.generateSignatureMessage({
      address: account as string,
      nonce,
    });

    try {
      const signature = await this.web3.getSigner().signMessage(message);

      return {
        signature,
      };
    } catch (error: any) {
      const parsed = parseMetamaskError(error);
      throw parsed;
    }
  }

  private generateSignatureMessage({
    address,
    nonce,
  }: {
    address: string;
    nonce: number;
  }) {
    const MESSAGE = `🌻 Welcome to Sunflower Land! 🌻\n\nClick to sign in and accept the Sunflower Land\n📜 Terms of Service:\nhttps://docs.sunflower-land.com/support/terms-of-service\n\nThis request will not trigger a blockchain\ntransaction or cost any gas fees.\n\nYour authentication status will reset after\neach session.\n\n👛 Wallet address:\n${address.substring(
      0,
      19
    )}...${address.substring(24)}\n\n🔑 Nonce: ${nonce}`;
    return MESSAGE;
  }

  private getDefaultChainParam() {
    if (CONFIG.POLYGON_CHAIN_ID === 137) {
      return {
        chainId: `0x${Number(CONFIG.POLYGON_CHAIN_ID).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"],
      };
    } else {
      return {
        chainId: `0x${Number(CONFIG.POLYGON_CHAIN_ID).toString(16)}`,
        chainName: "Polygon Testnet Mumbai",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      };
    }
  }

  public async checkDefaultNetwork() {
    const chainId = (await this.web3?.getNetwork())?.chainId;
    return chainId === CONFIG.POLYGON_CHAIN_ID;
  }

  public async switchNetwork() {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        { chainId: `0x${Number(CONFIG.POLYGON_CHAIN_ID).toString(16)}` },
      ],
    });
  }

  public async addNetwork() {
    try {
      const defaultChainParam = this.getDefaultChainParam();
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...defaultChainParam,
          },
        ],
      });
    } catch (addError) {
      throw new Error(ERRORS.WRONG_CHAIN);
    }
  }

  public async initialiseNetwork() {
    try {
      await this.switchNetwork();
    } catch (e: any) {
      if (e.code === 4902) {
        await this.addNetwork();
      }
      const parsed = parseMetamaskError(e);

      throw parsed;
    }
  }

  public get myAccount() {
    return this.account;
  }

  public get provider(): ethers.providers.Web3Provider {
    return this.web3 as ethers.providers.Web3Provider;
  }

  public async addTokenToMetamask() {
    try {
      const tokenSymbol = "SFL";
      const tokenDecimals = 18;

      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: CONFIG.TOKEN_CONTRACT,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image:
              "https://github.com/sunflower-land/sunflower-land/blob/main/src/assets/brand/icon.png?raw=true",
          },
        },
      });
    } catch (error: any) {
      const parsed = parseMetamaskError(error);

      throw parsed;
    }
  }

  // public get eth() {
  //   return (
  //     this.provider?.eth ??
  //     new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/").eth
  //   );
  // }
}

export const web3 = new BumpkinWeb3();
