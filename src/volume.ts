import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  DailyData,
  HourlyData,
  TokenDailyData,
  WeeklyData,
} from "../generated/schema";
import {
  ONE_BI,
  TRADE_TYPES,
  ZERO_BI,
  _getDayId,
  _getHourId,
  _getWeekId,
} from "./utils";

export function _storeVolume(
  type: string,
  timestamp: BigInt,
  volume: BigInt
): void {
  let hourId = _getHourId(timestamp);
  let dayId = _getDayId(timestamp);
  let weekId = _getWeekId(timestamp);

  let hourlyData = HourlyData.load(hourId);
  let dailyData = DailyData.load(dayId);
  let weeklyData = WeeklyData.load(weekId);

  if (hourlyData === null) {
    hourlyData = new HourlyData(hourId);
    for (let i = 0; i < TRADE_TYPES.length; i++) {
      let _type = TRADE_TYPES[i];
      hourlyData.setBigInt(_type, BigInt.fromI32(0));
    }
  }
  if (dailyData === null) {
    dailyData = new DailyData(hourId);
    for (let i = 0; i < TRADE_TYPES.length; i++) {
      let _type = TRADE_TYPES[i];
      dailyData.setBigInt(_type, BigInt.fromI32(0));
    }
  }
  if (weeklyData === null) {
    weeklyData = new WeeklyData(hourId);
    for (let i = 0; i < TRADE_TYPES.length; i++) {
      let _type = TRADE_TYPES[i];
      weeklyData.setBigInt(_type, BigInt.fromI32(0));
    }
  }

  hourlyData.setBigInt(type, hourlyData.getBigInt(type).plus(volume));
  dailyData.setBigInt(type, dailyData.getBigInt(type).plus(volume));
  weeklyData.setBigInt(type, weeklyData.getBigInt(type).plus(volume));

  hourlyData.save();
  dailyData.save();
  weeklyData.save();
}

export function _storeTokenDailyData(
  type: string,
  timestamp: BigInt,
  token: Address,
  volume: BigInt,
  fee: BigInt = ZERO_BI
): void {
  let id = _getDayId(timestamp) + ":" + token.toHexString();
  let entity = TokenDailyData.load(id);

  if (entity == null) {
    entity = new TokenDailyData(id);
    entity.token = token;
    entity.totalVolume = ZERO_BI;
    entity.tradeCount = ZERO_BI;
    entity.fees = ZERO_BI;
    entity.timestamp = BigInt.fromString(_getDayId(timestamp));
    for (let i = 0; i < TRADE_TYPES.length; i++) {
      let _type = TRADE_TYPES[i];
      entity.setBigInt(_type, BigInt.fromI32(0));
    }
  }
  entity.totalVolume = entity.totalVolume.plus(volume);
  entity.tradeCount = entity.tradeCount.plus(ONE_BI);
  entity.fees = entity.tradeCount.plus(fee);
  entity.setBigInt(type, entity.getBigInt(type).plus(volume));
  entity.save();
}
