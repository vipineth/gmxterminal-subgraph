import { BigInt, Entity } from "@graphprotocol/graph-ts";
import {
  ClosePosition,
  DecreasePosition,
  IncreasePosition
} from "../generated/GMXValut/GMXValut";
import {
  MarginTrade,
  User,
  UserDayData,
  UserMonthlyData,
  UserWeeklyData
} from "../generated/schema";

import { ONE_BI, ZERO_BI, _getDayId, _getMonthlyId, _getWeekId } from "./utils";

export function _updateUser(event: IncreasePosition): void {
  let account = event.params.account.toHexString();
  let key = event.params.key.toHexString();
  let user = User.load(account);
  if (user === null) {
    user = new User(account);
    user.totalPnL = ZERO_BI;
    user.totalTrades = ZERO_BI;
    user.totalVolume = ZERO_BI;
    user.assetList = [];
    user.openTradesKey = [];
    user.openTrades = [];
    user.closedTrades = [];
    user.liquidatedTrades = [];
    user.feePaid = ZERO_BI;
  }
  if (!user.assetList.includes(event.params.indexToken.toHexString())) {
    user.assetList = user.assetList.concat([
      event.params.indexToken.toHexString()
    ]);
  }
  if (!user.openTradesKey.includes(key)) {
    user.openTradesKey = user.openTradesKey.concat([key]);
  }
  user.totalTrades = user.totalTrades.plus(ONE_BI);
}
