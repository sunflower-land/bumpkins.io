/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface BumpkinMinterInterface extends utils.Interface {
  functions: {
    "addGameRole(address)": FunctionFragment;
    "executed(bytes32)": FunctionFragment;
    "feeWallet()": FunctionFragment;
    "freeBumpkinMintedAt(uint256)": FunctionFragment;
    "gameAddGameRole(address)": FunctionFragment;
    "gameMint(address,string,uint256[])": FunctionFragment;
    "gameRemoveGameRole(address)": FunctionFragment;
    "gameRoles(address)": FunctionFragment;
    "getItemAllowList(uint256[])": FunctionFragment;
    "itemAllowList(uint256)": FunctionFragment;
    "mintBumpkin(bytes,uint256,uint256,uint256,uint256[],string)": FunctionFragment;
    "mintedAt(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeGameRole(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setItemAllowList(uint256[],bool[])": FunctionFragment;
    "signer()": FunctionFragment;
    "transferFeeWallet(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "transferSigner(address)": FunctionFragment;
    "verify(bytes32,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addGameRole"
      | "executed"
      | "feeWallet"
      | "freeBumpkinMintedAt"
      | "gameAddGameRole"
      | "gameMint"
      | "gameRemoveGameRole"
      | "gameRoles"
      | "getItemAllowList"
      | "itemAllowList"
      | "mintBumpkin"
      | "mintedAt"
      | "owner"
      | "removeGameRole"
      | "renounceOwnership"
      | "setItemAllowList"
      | "signer"
      | "transferFeeWallet"
      | "transferOwnership"
      | "transferSigner"
      | "verify"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addGameRole",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "executed",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "feeWallet", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "freeBumpkinMintedAt",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "gameAddGameRole",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "gameMint",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "gameRemoveGameRole",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "gameRoles",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getItemAllowList",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "itemAllowList",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "mintBumpkin",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "mintedAt",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeGameRole",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setItemAllowList",
    values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<boolean>[]]
  ): string;
  encodeFunctionData(functionFragment: "signer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferFeeWallet",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferSigner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addGameRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "executed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeWallet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "freeBumpkinMintedAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gameAddGameRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "gameMint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "gameRemoveGameRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "gameRoles", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getItemAllowList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "itemAllowList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintBumpkin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintedAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeGameRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setItemAllowList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "signer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFeeWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface BumpkinMinter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BumpkinMinterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    feeWallet(overrides?: CallOverrides): Promise<[string]>;

    freeBumpkinMintedAt(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    gameAddGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    gameMint(
      account: PromiseOrValue<string>,
      tokenURI: PromiseOrValue<string>,
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    gameRemoveGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    gameRoles(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getItemAllowList(
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[boolean[]]>;

    itemAllowList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mintBumpkin(
      signature: PromiseOrValue<BytesLike>,
      deadline: PromiseOrValue<BigNumberish>,
      mintFee: PromiseOrValue<BigNumberish>,
      farmId: PromiseOrValue<BigNumberish>,
      itemIds: PromiseOrValue<BigNumberish>[],
      tokenURI: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintedAt(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setItemAllowList(
      itemIds: PromiseOrValue<BigNumberish>[],
      allowed: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    signer(overrides?: CallOverrides): Promise<[string]>;

    transferFeeWallet(
      _feeWallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verify(
      hash: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  addGameRole(
    _game: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executed(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  feeWallet(overrides?: CallOverrides): Promise<string>;

  freeBumpkinMintedAt(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  gameAddGameRole(
    _game: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  gameMint(
    account: PromiseOrValue<string>,
    tokenURI: PromiseOrValue<string>,
    itemIds: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  gameRemoveGameRole(
    _game: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  gameRoles(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getItemAllowList(
    itemIds: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<boolean[]>;

  itemAllowList(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mintBumpkin(
    signature: PromiseOrValue<BytesLike>,
    deadline: PromiseOrValue<BigNumberish>,
    mintFee: PromiseOrValue<BigNumberish>,
    farmId: PromiseOrValue<BigNumberish>,
    itemIds: PromiseOrValue<BigNumberish>[],
    tokenURI: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintedAt(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeGameRole(
    _game: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setItemAllowList(
    itemIds: PromiseOrValue<BigNumberish>[],
    allowed: PromiseOrValue<boolean>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferFeeWallet(
    _feeWallet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferSigner(
    _signer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verify(
    hash: PromiseOrValue<BytesLike>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    addGameRole(
      _game: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    executed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    feeWallet(overrides?: CallOverrides): Promise<string>;

    freeBumpkinMintedAt(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    gameAddGameRole(
      _game: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    gameMint(
      account: PromiseOrValue<string>,
      tokenURI: PromiseOrValue<string>,
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    gameRemoveGameRole(
      _game: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    gameRoles(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getItemAllowList(
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<boolean[]>;

    itemAllowList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mintBumpkin(
      signature: PromiseOrValue<BytesLike>,
      deadline: PromiseOrValue<BigNumberish>,
      mintFee: PromiseOrValue<BigNumberish>,
      farmId: PromiseOrValue<BigNumberish>,
      itemIds: PromiseOrValue<BigNumberish>[],
      tokenURI: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    mintedAt(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeGameRole(
      _game: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setItemAllowList(
      itemIds: PromiseOrValue<BigNumberish>[],
      allowed: PromiseOrValue<boolean>[],
      overrides?: CallOverrides
    ): Promise<void>;

    signer(overrides?: CallOverrides): Promise<string>;

    transferFeeWallet(
      _feeWallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    verify(
      hash: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    addGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    feeWallet(overrides?: CallOverrides): Promise<BigNumber>;

    freeBumpkinMintedAt(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    gameAddGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    gameMint(
      account: PromiseOrValue<string>,
      tokenURI: PromiseOrValue<string>,
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    gameRemoveGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    gameRoles(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getItemAllowList(
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    itemAllowList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mintBumpkin(
      signature: PromiseOrValue<BytesLike>,
      deadline: PromiseOrValue<BigNumberish>,
      mintFee: PromiseOrValue<BigNumberish>,
      farmId: PromiseOrValue<BigNumberish>,
      itemIds: PromiseOrValue<BigNumberish>[],
      tokenURI: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintedAt(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setItemAllowList(
      itemIds: PromiseOrValue<BigNumberish>[],
      allowed: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    signer(overrides?: CallOverrides): Promise<BigNumber>;

    transferFeeWallet(
      _feeWallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verify(
      hash: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    feeWallet(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    freeBumpkinMintedAt(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    gameAddGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    gameMint(
      account: PromiseOrValue<string>,
      tokenURI: PromiseOrValue<string>,
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    gameRemoveGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    gameRoles(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getItemAllowList(
      itemIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    itemAllowList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintBumpkin(
      signature: PromiseOrValue<BytesLike>,
      deadline: PromiseOrValue<BigNumberish>,
      mintFee: PromiseOrValue<BigNumberish>,
      farmId: PromiseOrValue<BigNumberish>,
      itemIds: PromiseOrValue<BigNumberish>[],
      tokenURI: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintedAt(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeGameRole(
      _game: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setItemAllowList(
      itemIds: PromiseOrValue<BigNumberish>[],
      allowed: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    signer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferFeeWallet(
      _feeWallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verify(
      hash: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
