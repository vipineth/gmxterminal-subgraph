import { ChainlinkPrice } from "../generated/schema";
import { AnswerUpdated } from "../generated/ChainlinkAggregatorBTC/ChainlinkAggregator";

const WETH = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
const BTC = "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f";
const LINK = "0xf97f4df75117a78c1a5a0dbb814af92458539fb4";
const UNI = "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0";
const USDT = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";
const USDC = "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8";

export function _storeChainlinkPrice(
  token: string,
  event: AnswerUpdated
): void {
  let entity = new ChainlinkPrice(token);
  entity.tokenPrice = event.params.current;
  entity.updatedAt = event.params.updatedAt;
  entity.save();
}

export function handleAnswerUpdatedBTC(event: AnswerUpdated): void {
  _storeChainlinkPrice(BTC, event);
}

export function handleAnswerUpdatedETH(event: AnswerUpdated): void {
  _storeChainlinkPrice(WETH, event);
}

export function handleAnswerUpdatedUNI(event: AnswerUpdated): void {
  _storeChainlinkPrice(UNI, event);
}

export function handleAnswerUpdatedLINK(event: AnswerUpdated): void {
  _storeChainlinkPrice(LINK, event);
}
