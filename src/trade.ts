import {
  DecreasePosition,
  IncreasePosition,
  LiquidatePosition
} from "../generated/GMXValut/GMXValut";
import { MarginTrade, User } from "../generated/schema";
import { getId, ONE_BI, TWO_BI, ZERO_BI } from "./utils";

export function _updateTradeIP(event: IncreasePosition) {
  let address = event.address.toHexString();
  let key = event.params.key.toHexString();
  let hash = event.transaction.hash.toHexString();

  let user = User.load(address);

  let trade;
  let userOpenTrades;

  if (user) {
    userOpenTrades = user.openTrades;
  }
  if (userOpenTrades.includes()) {
    trade = Trade.load();
  } else {
    trade;
  }
}
