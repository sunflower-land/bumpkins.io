import jwt_decode from "jwt-decode";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { web3 } from "lib/web3";

type Request = {
  address: string;
  signature: string;
};

const API_URL = CONFIG.API_URL;

export async function loginRequest(request: Request) {
  const response = await window.fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      ...request,
    }),
  });

  if (response.status >= 400) {
    throw new Error(ERRORS.FAILED_REQUEST);
  }

  const { token } = await response.json();

  return { token };
}

const host = window.location.host.replace(/^www\./, "");
const LOCAL_STORAGE_KEY = `sb_wiz.zpcb.v2.${host}-${window.location.pathname}`;

type Session = {
  token: string;
};

/**
 * Address -> Session
 */
type Sessions = Record<string, Session>;

function getSession(address: string): Session | null {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!item) {
    return null;
  }

  const sessions = JSON.parse(item) as Sessions;

  return sessions[address];
}

export function saveSession(address: string, session: Session) {
  let sessions: Sessions = {};

  const item = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (item) {
    sessions = JSON.parse(item) as Sessions;
  }

  const newSessions = {
    ...sessions,
    [address]: session,
  };

  return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSessions));
}

export function removeSession(address: string) {
  let sessions: Sessions = {};

  const item = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (item) {
    sessions = JSON.parse(item) as Sessions;
  }

  delete sessions[address];

  return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessions));
}

export type Token = {
  address: string;
  exp: number;
  userAccess: {
    withdraw: boolean;
    createFarm: boolean;
    sync: boolean;
    mintCollectible: boolean;
    mintBumpkin: boolean;
  };
  discordId?: string;
};

export function decodeToken(token: string): Token {
  return jwt_decode(token);
}

/**
 * Reduce 4 hours as a buffer for a user session
 * This will mitigate people in the middle of their session becoming unauthorised
 */
const TOKEN_BUFFER_MS = 1000 * 60 * 60 * 4;

export function loadAuth() {
  const address = web3.myAccount as string;
  const session = getSession(address);

  if (session) {
    const token = decodeToken(session.token);

    const isFresh = token.exp * 1000 > Date.now() + TOKEN_BUFFER_MS;

    // Migration from token that did not have user access
    const isValid = !!token.userAccess;

    if (isFresh && isValid) {
      // Raw token
      return { jwt: session.token, user: token };
    }
  }

  return null;
}

export function hasValidSession(): boolean {
  const address = web3.myAccount as string;
  const session = getSession(address);

  if (session) {
    const token = decodeToken(session.token);
    const isFresh = token.exp * 1000 > Date.now() + TOKEN_BUFFER_MS;
    const isValid = !!token.userAccess;

    if (isFresh && isValid) {
      return true;
    }
  }
  return false;
}

export async function login(): Promise<{ jwt: string; user: Token }> {
  const address = web3.myAccount as string;
  const session = getSession(address);

  if (session) {
    const token = decodeToken(session.token);

    const isFresh = token.exp * 1000 > Date.now() + TOKEN_BUFFER_MS;

    // Migration from token that did not have user access
    const isValid = !!token.userAccess;

    if (isFresh && isValid) {
      // Raw token
      return { jwt: session.token, user: decodeToken(session.token) };
    }
  }

  const timestamp = Math.floor(Date.now() / 8.64e7);

  const { signature } = await web3.signTransaction(timestamp);

  const { token } = await loginRequest({
    address,
    signature,
  });

  saveSession(address, { token });

  return { jwt: token, user: decodeToken(token) };
}
