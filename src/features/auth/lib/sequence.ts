import { ConnectOptions } from "@0xsequence/provider";

export const SEQUENCE_CONNECT_OPTIONS: ConnectOptions = {
  app: "Bumpkins.io",
  settings: {
    theme: "dark",
    includedPaymentProviders: ["ramp"],
    lockFundingCurrencyToDefault: true,
    defaultFundingCurrency: "matic",
  },
};
