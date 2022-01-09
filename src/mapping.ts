import {
  BuyUSDG,
  ClosePosition,
  CollectMarginFees,
  CollectSwapFees,
  DecreaseGuaranteedUsd,
  DecreasePoolAmount,
  DecreasePosition,
  DecreaseReservedAmount,
  DecreaseUsdgAmount,
  DirectPoolDeposit,
  IncreaseGuaranteedUsd,
  IncreasePoolAmount,
  IncreasePosition,
  IncreaseReservedAmount,
  IncreaseUsdgAmount,
  LiquidatePosition,
  SellUSDG,
  Swap,
  UpdateFundingRate,
  UpdatePnl,
  UpdatePosition
} from "../generated/GMXValut/GMXValut";
import {
  AddLiquidity,
  RemoveLiquidity
} from "../generated/GlpManager/GlpManager";

import { BigInt } from "@graphprotocol/graph-ts";
import { _storeChainlinkPrice } from "./chainlink";
import { _getDayId, _getHourId, _getWeekId } from "./utils";
import {
  _addDecreasePosition,
  _addIncreasePosition,
  _addLiquidityTx,
  _removeLiquidityTx,
  _updateLiquidationTransaction,
  _updateSwapTransaction
} from "./transactions";
import { _storeTokenDailyData, _storeVolume } from "./volume";
import { _updateUser } from "./user";
import { _updateTradeIP } from "./trade";

export function handleIncreasePosition(event: IncreasePosition): void {
  _storeVolume("margin", event.block.timestamp, event.params.sizeDelta);
  _storeTokenDailyData(
    "margin",
    event.block.timestamp,
    event.params.indexToken,
    event.params.sizeDelta,
    event.params.fee
  );
  _addIncreasePosition(event);
  _updateUser(event);
  _updateTradeIP(event);
}

export function handleDecreasePosition(event: DecreasePosition): void {
  _storeVolume("margin", event.block.timestamp, event.params.sizeDelta);
  _storeTokenDailyData(
    "margin",
    event.block.timestamp,
    event.params.indexToken,
    event.params.sizeDelta,
    event.params.fee
  );
  _addDecreasePosition(event);
}

export function handleLiquidatePosition(event: LiquidatePosition): void {
  _storeVolume("liquidation", event.block.timestamp, event.params.size);
  _storeTokenDailyData(
    "liquidation",
    event.block.timestamp,
    event.params.indexToken,
    event.params.size
  );
  _updateLiquidationTransaction(event);
}

export function handleSwap(event: Swap): void {
  _updateSwapTransaction(event);
}
export function handleBuyUSDG(event: BuyUSDG): void {
  let volume = event.params.usdgAmount.times(
    BigInt.fromString("1000000000000")
  );
  _storeVolume("glpMint", event.block.timestamp, volume);
  _storeTokenDailyData(
    "glpMint",
    event.block.timestamp,
    event.params.token,
    event.params.usdgAmount
  );
}
export function handleSellUSDG(event: SellUSDG): void {
  let volume = event.params.usdgAmount.times(
    BigInt.fromString("1000000000000")
  );
  _storeVolume("glpBurn", event.block.timestamp, volume);
  _storeTokenDailyData(
    "glpBurn",
    event.block.timestamp,
    event.params.token,
    event.params.usdgAmount
  );
}
export function handleAddLiquidity(event: AddLiquidity): void {
  _addLiquidityTx(event);
}
export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  _removeLiquidityTx(event);
}

export function handleClosePosition(event: ClosePosition): void {
  //   _updateUserCP(event);
}
export function handleUpdatePosition(event: UpdatePosition): void {}
export function handleCollectMarginFees(event: CollectMarginFees): void {}

export function handleCollectSwapFees(event: CollectSwapFees): void {}

export function handleDecreaseGuaranteedUsd(
  event: DecreaseGuaranteedUsd
): void {}

export function handleDecreasePoolAmount(event: DecreasePoolAmount): void {}

export function handleDecreaseReservedAmount(
  event: DecreaseReservedAmount
): void {}

export function handleDecreaseUsdgAmount(event: DecreaseUsdgAmount): void {}

export function handleDirectPoolDeposit(event: DirectPoolDeposit): void {}

export function handleIncreaseGuaranteedUsd(
  event: IncreaseGuaranteedUsd
): void {}

export function handleIncreasePoolAmount(event: IncreasePoolAmount): void {}

export function handleIncreaseReservedAmount(
  event: IncreaseReservedAmount
): void {}

export function handleIncreaseUsdgAmount(event: IncreaseUsdgAmount): void {}

export function handleUpdateFundingRate(event: UpdateFundingRate): void {}

export function handleUpdatePnl(event: UpdatePnl): void {}
