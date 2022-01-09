import {
  BigInt,
  Address,
  TypedMap,
  ethereum,
  store,
  log,
  BigDecimal
} from "@graphprotocol/graph-ts";

export function _getHourId(timestamp: BigInt): string {
  let hourTimestamp = (timestamp.toI32() / 3600) * 3600;
  return hourTimestamp.toString();
}
export function _getDayId(timestamp: BigInt): string {
  let dayTimestamp = (timestamp.toI32() / 86400) * 86400;
  return dayTimestamp.toString();
}
export function _getWeekId(timestamp: BigInt): string {
  let weekTimestamp = (timestamp.toI32() / 604800) * 604800;
  return weekTimestamp.toString();
}
export function _getMonthlyId(timestamp: BigInt): string {
  let weekTimestamp = (timestamp.toI32() / 2592000) * 2592000;
  return weekTimestamp.toString();
}

export const ZERO_BD = BigDecimal.fromString("0");
export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const TWO_BI = BigInt.fromI32(2);

export const TRADE_TYPES = new Array<string>(5);
TRADE_TYPES[0] = "margin";
TRADE_TYPES[1] = "swap";
TRADE_TYPES[2] = "glpMint";
TRADE_TYPES[3] = "glpBurn";
TRADE_TYPES[4] = "liquidation";

export function getId(name: string, ev: ethereum.Event): string {
  return name + "-" + ev.transaction.hash.toHex();
}
