import { Term, Category, Sentiment } from './types';

export const terms: Term[] = [
  {
    id: 'mtr',
    acronym: 'MTR',
    fullName: 'Major Trend Reversal',
    category: Category.REVERSAL,
    sentiment: Sentiment.NEUTRAL,
    highlight: true,
    concept: 'Al Brooks 体系中的“圣杯”，高胜率反转设置。',
    logic: '趋势线被突破后，市场通常会尝试恢复原趋势（测试极值）。如果这次测试失败（形成双顶/双底），则意味着原趋势动能耗尽，反向力量接管。',
    strategy: '1. 等待突破：价格必须强力突破主要趋势线（通常5-10根K线）。\n2. 等待测试：价格回测原趋势极值（前高/前低）。\n3. 寻找信号：在次高/次低点（Lower High/Higher Low）出现反向反转K线（Signal Bar）。\n4. 入场：在信号K线下方/上方 1 Tick 处挂停止单（Stop Entry）。\n5. 止损：设在信号K线的另一端外。',
    example: '强劲多头趋势持续了2小时。随后出现一波猛烈的抛售，打破了上升趋势线，跌幅明显。多头试图恢复趋势，价格反弹并去测试前高，但此次反弹动能减弱，形成了一个“双顶”结构，且收出一根带长上影线的阴线。此时在K线低点下方做空，预期趋势反转。'
  },
  {
    id: 'wedge',
    acronym: 'W',
    fullName: 'Wedge Reversal',
    category: Category.REVERSAL,
    sentiment: Sentiment.NEUTRAL,
    highlight: true,
    concept: '由三段推动 (3 Pushes) 组成的趋势衰竭形态。',
    logic: '这是最强的反转信号之一。市场三次尝试推动价格均未能引发加速（斜率变缓，重叠增多），说明动能衰竭。',
    strategy: '1. 计数：在趋势方向寻找三段明显的推动波（3 Pushes）。\n2. 观察重叠：这三段推动通常伴随着K线重叠，显示通道收窄。\n3. 信号确认：第3推结束后，必须出现一根强有力的反向反转K线。\n4. 目标：通常是楔形的起点或通道底部。',
    example: '价格创出新高（第1推），随后回调。再次上涨创出新高（第2推），但回调较深。第三次勉强创出新高（第3推），不仅突破幅度小，而且立即形成了一个由两根大阴线组成的“反转包容”形态。这是绝佳的做空点，意味着多头陷阱。'
  },
  {
    id: 'h1l1',
    acronym: 'H1/L1',
    fullName: 'One-Legged Move (High 1 / Low 1)',
    category: Category.TREND,
    sentiment: Sentiment.NEUTRAL,
    highlight: true,
    concept: '趋势中的第一次回调入场点。H1为多头回调买点，L1为空头回调卖点。',
    logic: '在极强趋势（Spike阶段）中，市场通常不会深度回调。第一次微小的停顿往往是唯一上车的机会。',
    strategy: '1. 趋势确认：确保市场处于极强的“尖峰”阶段，几乎没有重叠K线。\n2. 识别回调：等待出现第一根收盘价逆势或暂停的K线。\n3. 挂单交易：\n   • H1 (多头)：在回调K线高点上方 1 Tick 挂买入停止单。\n   • L1 (空头)：在回调K线低点下方 1 Tick 挂卖出停止单。',
    example: '市场开盘后连续出现4根大阳线（强趋势）。第5根K线是一根小实体阴线（暂停）。虽然它是一根阴线，但这只是强趋势中的第一次喘息。交易者在第5根K线的高点上方挂单。当第6根K线突破该高点时，买单成交，随后趋势继续爆发。'
  },
  {
    id: 'slp',
    acronym: 'SLP',
    fullName: 'Second Leg Push',
    category: Category.TREND,
    sentiment: Sentiment.NEUTRAL,
    concept: '市场的大多数运动都包含“两段式”（Two legs）。',
    logic: '如果你错过了一段强趋势，不要急，等待回调。回调结束后通常会有 Second Leg（第二腿）去测试前极值。复杂的调整通常包含两段（ABC调整）。',
    strategy: '1. 识别第一腿：确定一段清晰的趋势运动。\n2. 等待两段式回调：市场回调一段，反弹，再回调一段（形成H2/L2）。\n3. 入场：在第二段回调结束出现信号K线时入场，这是高胜率点位。',
    example: '牛市爆发（第一腿），随后开始回调。价格下跌几根K线（A段），尝试反弹但失败，随后再次下跌（B段），刚好测试均线支撑并收出阳线。这就是“第二腿回调结束”，是完美的H2买入点。'
  },
  {
    id: 'mc',
    acronym: 'MC',
    fullName: 'Micro Channel',
    category: Category.TREND,
    sentiment: Sentiment.NEUTRAL,
    concept: '极强的趋势形态。多头微通道指连续多根K线低点不断抬高。',
    logic: '这代表一方完全控制局面，甚至没有任何像样的回调。所有的买单都在市价成交，没人愿意等待回调。',
    strategy: '1. 顺势：只做顺势单，可以市价追入（Buy the Close）。\n2. 禁忌：严禁逆势摸顶猜底。\n3. 离场/反转：必须等待微通道线被跌破，且后续反弹形成更低的高点（LOWER HIGH）后，才考虑反转交易。',
    example: '图表上出现了连续8根K线，每一根的低点都高于前一根，且收盘价大多在最高点附近。这是一个多头微通道。此时任何做空的尝试（认为涨太多了）都会被碾压。正确的做法是买入收盘价，直到某根K线跌破前一根的低点。'
  },
  {
    id: 'mm',
    acronym: 'MM',
    fullName: 'Measured Move',
    category: Category.TREND,
    sentiment: Sentiment.NEUTRAL,
    concept: '基于之前的波动幅度来预测未来的目标位。公式 Leg 1 = Leg 2。',
    logic: '算法交易和机构倾向于以对称的幅度运动。这是一种自我实现的预言。',
    strategy: '1. 测量：计算第一段强劲趋势（Spike）的垂直幅度。\n2. 投射：从回调结束点（或突破点）向上/向下投射等距离。\n3. 执行：在目标位附近挂限价单（Limit Order）止盈，或寻找反转信号。',
    example: '股价从$100迅速涨到$110 (涨幅$10)。随后回调并在$105企稳。预期的第二腿目标位是 $105 + $10 = $115。当价格到达$115时，许多程序化交易会自动平仓，导致价格停顿或反转。'
  },
  {
    id: 'horn',
    acronym: 'HORN',
    fullName: 'Horn Pattern',
    category: Category.REVERSAL,
    sentiment: Sentiment.NEUTRAL,
    concept: '两根长针（影线）K线夹着一根小K线，形状像牛角。',
    logic: '这表明市场在短时间内两次尝试突破某一个价位都失败了。第一次失败是试探，第二次失败确认了该价位的强拒绝（Rejection）。',
    strategy: '1. 识别形态：K线1长影线，K线2小实体内包，K线3长影线反向测试。\n2. 入场：在第3根K线的收回方向挂停止单。\n3. 止损：设在影线的极端点之外。',
    example: '在底部支撑位，K线A向下刺透后快速收回，留长下影线。K线B是一根犹豫的小十字星。K线C再次向下猛跌，试图击穿K线A的低点，但瞬间被买盘托起，收盘同样留长下影线。这构成了牛角形态，是强力买入信号。'
  },
  {
    id: 'ioi',
    acronym: 'IOI',
    fullName: 'Inside-Outside-Inside',
    category: Category.PATTERN,
    sentiment: Sentiment.NEUTRAL,
    concept: '连续三根K线：基准线 -> 外包线 -> 内包线。代表极致的波动率收缩。',
    logic: '市场在极短的时间内经历了“扩张（Outside）”到“收缩（Inside）”的过程。这是一个微观的三角形，能量积蓄到了极点，即将爆发。',
    strategy: '1. 突破模式：在IOI组合的最高点上方挂买单，最低点下方挂卖单（OCO订单）。\n2. 止损：一旦一边成交，止损设在形态的另一端。\n3. 预期：通常会跟随一根大实体的趋势K线。',
    example: '大阳线后，紧接着一根吞没前一根的大阴线（Outside），制造恐慌。但紧接着第三根K线完全收缩在第二根阴线的范围内（Inside），市场突然安静。这是暴风雨前的宁静。如果在高点上方挂单成交，通常意味着多头重新夺回控制权。'
  },
  {
    id: 'mb',
    acronym: 'MB',
    fullName: 'Mother Bar',
    category: Category.PATTERN,
    sentiment: Sentiment.NEUTRAL,
    concept: '一根大实体K线，后面紧跟着一个或多个内包线（Inside Bar）。',
    logic: '市场在大波动后进入暂时的休整。大K线（母亲）保护着后面的小K线（孩子）。这通常是一个中继形态。',
    strategy: '1. 顺势：通常预期价格会顺着Mother Bar的方向突破。\n2. 陷阱：如果价格反向突破Mother Bar的边界但无法站稳，往往是假突破。\n3. 操作：在Mother Bar的高点上方挂买单，或在Inside Bar群的边界挂单。',
    example: '一根巨大的看涨趋势棒（Mother Bar）。随后跟了3根小K线，全部位于Mother Bar的上半部分。这意味着多头非常强势，拒绝深度回调。在Mother Bar高点上方挂单，一旦突破，往往会开启新一轮上涨。'
  },
  {
    id: 'midt',
    acronym: 'MidTF',
    fullName: 'Midline Test',
    category: Category.PATTERN,
    sentiment: Sentiment.NEUTRAL,
    concept: '测试交易区间的中间位置（50%回撤位）。',
    logic: '交易区间（Trading Range）中，50%位置是公允价值区。价格会被磁力吸到这里，但也容易在这里失去方向。',
    strategy: '1. 止盈：如果你在区间边缘开仓，50%位置是第一止盈点。\n2. 观望：尽量避免在区间中部开新仓，因为胜率接近50/50，且止损很难设置。\n3. 回调：在强趋势中，50%回撤往往是机构加仓的位置。',
    example: '价格在$100到$120之间震荡。你在$100买入。当价格到达$110（中线）时，你应该平掉一半仓位锁定利润，并将剩余仓位的止损上移。不要在$110处追高，因为随时可能跌回$100。'
  },
  {
    id: 'oioud',
    acronym: 'OIO/UD',
    fullName: 'Outside-Inside-Outside',
    category: Category.PATTERN,
    sentiment: Sentiment.NEUTRAL,
    concept: '复杂的K线重叠形态：外包 -> 内包 -> 外包。',
    logic: '这是一种扩大的震荡，代表市场极度困惑，多空双方都在试图控制局面但都失败了。这种形态也被称为“扩音器”或“喇叭口”的微观版。',
    strategy: '1. 观望：这是最难交易的形态之一，容易两头打脸。\n2. 等待：等待随后出现的清晰微通道或连续强K线后再入场。\n3. 二次突破：如果非要交易，通常等待该形态被突破后的第一次回调（Second Entry）。',
    example: 'K线1吞没了前一根（Outside），K线2缩量（Inside），K线3又吞没了K线2（Outside）。这显示市场在漫无目的地剧烈扫荡。所有的止损单（高点上、低点下）都被扫掉了。此时最好的操作就是什么都不做。'
  },
  {
    id: 'pausebo',
    acronym: 'PauseBO',
    fullName: 'Pause Bars after Breakout',
    category: Category.BREAKOUT,
    sentiment: Sentiment.BULLISH,
    concept: '强力突破后，紧接着出现一根小十字星或小实体K线。',
    logic: '新手常误以为这是上涨乏力要反转，但实际上这是“中继信号”。市场在消化突破，确认新的价格水平被接受。',
    strategy: '1. 辨识：寻找大实体趋势K线后的极小K线。\n2. 入场：在暂停K线的高点上方挂买单（多头趋势）。\n3. 止损：设在突破K线的底部。',
    example: '一根大阳线突破了盘整区间的阻力位。紧接着第二根K线是一根极小的十字星，完全位于大阳线的上影线附近。这是强势的表现，说明没人急着获利了结。在大阳线高点上方买入，期待趋势加速。'
  },
  {
    id: 'sx',
    acronym: 'SX',
    fullName: 'Sell Climax',
    category: Category.REVERSAL,
    sentiment: Sentiment.BULLISH,
    concept: '空头趋势末端，出现极大的阴线，远离均线。',
    logic: '这是最后的恐慌盘抛售。虽看着吓人，但通常意味着所有想卖的人都卖了，空头力量耗尽，市场即将进入震荡或反弹。',
    strategy: '1. 止盈：如果你持有空单，必须立刻平仓。\n2. 逆势：激进交易者可以在高潮K线收盘后，等待一根阳线反弹做多（Scalp）。\n3. 等待：通常等待至少10根K线两段式调整（TBTL）后再考虑做空。',
    example: '市场阴跌了一整天。突然在收盘前出现了一根平时3倍大小的巨型阴线，直接击穿所有支撑。这时候千万不要追空！这通常是机构在接恐慌盘。下一根K线很可能直接高开反弹。'
  },
  {
    id: 'tri',
    acronym: 'TRI',
    fullName: 'Triangle',
    category: Category.PATTERN,
    sentiment: Sentiment.NEUTRAL,
    concept: '高点降低，低点抬高，K线在这个区域内收敛。',
    logic: '多空力量逐渐平衡，市场在寻找公允价格。随着区间收窄，突破在即。',
    strategy: '1. 边界：画出上下收敛的趋势线。\n2. 突破模式：价格往往会在三角形的后1/3处突破。\n3. 假突破：三角形突破失败的概率高达50%。建议等待一根实体K线收在边界外再进场，或者交易突破后的回调。',
    example: '价格波动幅度越来越小，形成了一个收敛三角形。在这个区域内交易很难获利。突然一根大阳线收盘价明显高于上边界趋势线。这是一个突破信号，可以在收盘价买入，或等待回踩上趋势线不破时加仓。'
  },
  {
    id: 'w1p',
    acronym: 'W1P',
    fullName: 'Wedge First Pullback',
    category: Category.REVERSAL,
    sentiment: Sentiment.NEUTRAL,
    concept: '楔形反转成功后，价格先反转，然后出现的第一次回调。',
    logic: '反转很难一次成功（V型反转很少）。第一波反转确立了新趋势的可能性，随后的回调（Higher Low）是确认支撑，这是最安全的入场点。',
    strategy: '1. 确认反转：看到楔形后出现强力反向K线。\n2. 等待回调：不要追第一波。等待价格回落，通常会测试均线。\n3. 入场：在回调形成更高低点（HL）并出现顺势信号K线时买入。',
    example: '看涨楔形底部确认，价格猛烈反弹冲破均线。随后价格缓慢下跌了3-4根K线，但没有跌破前低，并收出一根阳线。这就是W1P。在此处买入，止损设在前低下方，胜率极高。'
  },
  {
    id: 'wbo',
    acronym: 'WBO',
    fullName: 'Wedge Breakout (Failed Wedge)',
    category: Category.BREAKOUT,
    sentiment: Sentiment.NEUTRAL,
    concept: '出现了楔形，但价格没有反转，而是强势突破了楔形的边界线继续原趋势。',
    logic: '这代表趋势极强，这是一个失败的反转形态（Failed Reversal）。当反转失败时，原本的逆势交易者会被迫止损，从而推动价格加速向原方向运行。',
    strategy: '1. 止损反转：如果你做了楔形反转单，一旦价格强力突破楔形边界，立刻止损。\n2. 顺势追单：反手开仓顺应原趋势。失败的楔形往往会导致测量运动（Measured Move）。',
    example: '看跌楔形形成，大家都预期要跌。结果价格非但没跌，反而拉出一根大阳线突破了楔形上轨。这时候空头全部被套。你应该立刻反手做多，预期价格会再涨一段等距波幅。'
  },
  {
    id: 'xt',
    acronym: 'XT',
    fullName: 'Expanding Triangle',
    category: Category.PATTERN,
    sentiment: Sentiment.NEUTRAL,
    concept: '高点越来越高，低点越来越低（喇叭口）。',
    logic: '市场处于极度不稳和扩大的波动中。每一次突破新高/新低都失败并反向剧烈运动。这是机构在清洗散户止损。',
    strategy: '1. 边缘交易：只在创新高卖出，创新低买入（Fade breakouts）。\n2. 止盈要快：这种形态很难走出持续趋势，通常是震荡。\n3. 回避：对于新手，这是最危险的形态，建议空仓观望。',
    example: '价格突破了前高，你刚追多，它立刻大跌跌破前低。你刚止损反手做空，它又大涨创新高。这就是扩散三角形。正确的做法是在它创新高出现阴线时做空，目标看前低。'
  },
  {
    id: 'fbo',
    acronym: 'fBO',
    fullName: 'Failed Breakout',
    category: Category.BREAKOUT,
    sentiment: Sentiment.NEUTRAL,
    concept: '价格突破了重要位（前高/前低/趋势线），但无法收盘在由外，或下一根K线立刻逆转。',
    logic: '突破缺乏跟风盘，原有区间力量强大。这通常是“聪明钱”在利用流动性诱多或诱空。',
    strategy: '1. 识别陷阱：突破K线留下长影线，或第二根K线完全吞没突破K线。\n2. 逆向交易：在假突破确认后，向相反方向开仓。\n3. 目标：通常是区间的另一端。',
    example: '价格在盘整区间顶部徘徊。突然一根K线冲破阻力位，看起来要大涨。但在该K线收盘前，价格快速回落，留下长长的上影线，收盘价回到区间内。这是一个经典的空头信号。在低点下方做空。'
  },
  {
    id: 'fh1',
    acronym: 'fH1/fL1',
    fullName: 'Failed H1/L1',
    category: Category.BREAKOUT,
    sentiment: Sentiment.NEUTRAL,
    concept: '顺势入场（H1/L1）触发后，价格立刻跌破信号棒的止损位。',
    logic: '顺势设置失败，意味着逆势力量很强。那些在H1买入的多头现在被困住了（Trapped），他们的止损盘将成为下跌的燃料。',
    strategy: '1. 观察触发：H1买单成交。\n2. 观察失败：价格没有上涨，反而掉头跌破H1信号K线的低点。\n3. 反手：在该低点下方挂卖单，做空。',
    example: '多头趋势回调。H1买入信号触发，你进场做多。但下一根K线直接是一根大阴线，跌破了你的止损位。不要只是止损离场，应该立刻反手做空，因为这可能是一个反转的开始。'
  },
  {
    id: 'frev',
    acronym: 'fRev+fA2',
    fullName: 'Failed Reversal + Failed A2',
    category: Category.TREND,
    sentiment: Sentiment.NEUTRAL,
    concept: '空头尝试反转失败，再次尝试又失败。',
    logic: '如果对手盘两次尝试改变趋势都失败了，说明原趋势非常强劲，对手盘将放弃抵抗。双重失败 = 高概率趋势恢复。',
    strategy: '1. 第一次失败：观察到反转形态被破坏。\n2. 第二次失败：观察到第二次反转企图（A2）也未能推动价格。\n3. 进场：坚决顺应原趋势进场，这通常会带来一波快速行情。',
    example: '下跌趋势中，多头制造了一个双底反弹（Rev 1），但被均线压回。多头不死心，再次尝试构建一个更高的底部（A2），结果再次被大阴线击穿。此时空头应果断加仓，因为多头已经耗尽了子弹。'
  },
  {
    id: 'hh1',
    acronym: 'hH1/hL1',
    fullName: 'Hard Trend H1/L1',
    category: Category.TREND,
    sentiment: Sentiment.NEUTRAL,
    concept: '在极强的趋势中（Hard Trend），只要有微小的停顿或回调就进场。',
    logic: '强趋势（Runaway Trend）中，回调往往非常浅，甚至只是一两根十字星。如果你等待标准的回调，你会踏空整个行情。',
    strategy: '1. 激进：不要等待完美信号K线。只要看到价格停顿，就在高点挂单买入。\n2. 止损：需要使用宽止损（Catastrophic Stop），因为入场点可能不够精确。\n3. 周期：可以切换到更小的时间周期去寻找入场点。',
    example: '市场呈现垂直拉升，连续10根阳线。你想买，但觉得太高了想等回调。结果它只横盘了2根K线就继续涨了。在Hard Trend中，那2根横盘K线就是你的入场机会，稍微突破高点就必须进场。'
  }
];
