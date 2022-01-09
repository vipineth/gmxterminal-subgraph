import {
  AddLiquidity,
  RemoveLiquidity,
} from "../generated/GlpManager/GlpManager";
import {
  BuyUSDG,
  DecreasePosition,
  IncreasePosition,
  LiquidatePosition,
  Swap,
} from "../generated/GMXValut/GMXValut";
import {
  AddGLPLiquidity,
  RemoveGLPLiquidity,
  LiquidationTransaction,
  MarginTransaction,
  SwapTransaction,
} from "../generated/schema";

export function _addIncreasePosition(event: IncreasePosition): void {
  let id = event.transaction.hash.toHexString();
  let transaction = MarginTransaction.load(id);
  if (transaction === null) {
    transaction = new MarginTransaction(id);
  }
  transaction.account = event.params.account;
  transaction.collateralToken = event.params.collateralToken;
  transaction.indexToken = event.params.indexToken;
  transaction.collateralDelta = event.params.collateralDelta;
  transaction.sizeDelta = event.params.sizeDelta;
  transaction.fee = event.params.fee;
  transaction.key = event.params.key.toHexString();
  transaction.isLong = event.params.isLong;
  transaction.price = event.params.price;
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}
export function _addDecreasePosition(event: DecreasePosition): void {
  let id = event.transaction.hash.toHexString();
  let transaction = MarginTransaction.load(id);
  if (transaction === null) {
    transaction = new MarginTransaction(id);
  }
  transaction.account = event.params.account;
  transaction.collateralToken = event.params.collateralToken;
  transaction.indexToken = event.params.indexToken;
  transaction.collateralDelta = event.params.collateralDelta;
  transaction.sizeDelta = event.params.sizeDelta;
  transaction.fee = event.params.fee;
  transaction.key = event.params.key.toHexString();
  transaction.isLong = event.params.isLong;
  transaction.price = event.params.price;
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}
export function _updateLiquidationTransaction(event: LiquidatePosition): void {
  let id = event.transaction.hash.toHexString();
  let transaction = LiquidationTransaction.load(id);
  if (transaction === null) {
    transaction = new LiquidationTransaction(id);
  }
  transaction.key = event.params.key.toHexString();
  transaction.account = event.params.account;
  transaction.collateralToken = event.params.collateralToken;
  transaction.indexToken = event.params.indexToken;
  transaction.isLong = event.params.isLong;
  transaction.size = event.params.size;
  transaction.collateral = event.params.collateral;
  transaction.reserveAmount = event.params.reserveAmount;
  transaction.realisedPnl = event.params.realisedPnl;
  transaction.markPrice = event.params.markPrice;
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}
export function _updateSwapTransaction(event: Swap): void {
  let id = event.transaction.hash.toHexString();
  let transaction = SwapTransaction.load(id);
  if (transaction === null) {
    transaction = new SwapTransaction(id);
  }
  transaction.account = event.params.account;
  transaction.tokenIn = event.params.tokenIn;
  transaction.tokenOut = event.params.tokenOut;
  transaction.amountIn = event.params.amountIn;
  transaction.amountOut = event.params.amountOut;
  transaction.amountOutAfterFees = event.params.amountOutAfterFees;
  transaction.feeBasisPoints = event.params.feeBasisPoints;
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}
export function _addLiquidityTx(event: AddLiquidity): void {
  let id = event.transaction.hash.toHexString();
  let transaction = AddGLPLiquidity.load(id);
  if (transaction === null) {
    transaction = new AddGLPLiquidity(id);
  }
  transaction.account = event.params.account;
  transaction.account = event.params.account;
  transaction.token = event.params.token;
  transaction.amount = event.params.amount;
  transaction.aumInUsdg = event.params.aumInUsdg;
  transaction.glpSupply = event.params.glpSupply;
  transaction.usdgAmount = event.params.usdgAmount;
  transaction.mintAmount = event.params.mintAmount;
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}
export function _removeLiquidityTx(event: RemoveLiquidity): void {
  let id = event.transaction.hash.toHexString();
  let transaction = RemoveGLPLiquidity.load(id);
  if (transaction === null) {
    transaction = new RemoveGLPLiquidity(id);
  }
  transaction.account = event.params.account;
  transaction.token = event.params.token;
  transaction.glpAmount = event.params.glpAmount;
  transaction.amountOut = event.params.amountOut;
  transaction.aumInUsdg = event.params.aumInUsdg;
  transaction.glpSupply = event.params.glpSupply;
  transaction.usdgAmount = event.params.usdgAmount;
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}
