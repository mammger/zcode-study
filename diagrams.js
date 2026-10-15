'use strict';

// These are original explanatory examples, not captured ZCode prompts or API traffic.
function figure(title, body, caption) {
 return `<figure class="explain-figure"><figcaption class="figure-title">${title}</figcaption>${body}<p class="figure-caption">${caption}</p></figure>`;
}
function journey(cards){
 return `<ol class="concept-journey">${cards.map(([label,title,body])=>`<li><span>${label}</span><b>${title}</b><p>${body}</p></li>`).join('')}</ol>`;
}
function explanationDiagram(type) {
 if(type==='model-lifecycle')return figure('训练积累能力；使用时带入本次材料', `
 <div class="learning-lanes"><div class="learning-lane"><span class="lane-label">训练时</span><div><b>大量例子</b><small>文字、知识、任务示范</small></div><span class="journey-arrow" aria-hidden="true">→</span><div class="learning-model"><b>调整模型参数</b><small>积累可用于新任务的能力</small></div></div><div class="learning-lane"><span class="lane-label">使用时</span><div><b>你的要求 + 来信</b><small>这一次要处理的材料</small></div><span class="journey-arrow" aria-hidden="true">→</span><div class="learning-model"><b>模型逐步生成</b><small>运用已有参数和当前输入</small></div></div></div><div class="reply-preview"><span>本次输出</span><p>“感谢来信，交付日期仍在确认中。”</p></div>`, '“记住这次对话”通常依靠应用保存并带入记录，不是现场改变模型参数。');
 if(type==='skill-loading')return figure('一本方法手册，怎样进入本次任务？', journey([
 ['① 找到方法','名称 + 描述','meeting-brief：用于整理会议记录'],
 ['② 加载说明','按需读正文','区分决定、意向、待确认；每条附来源'],
 ['③ 处理本次材料','说明 + 当前记录','模型按方法整理，工具读写文件']
 ]), '复用的是方法。每次的资料、目标和工具能力仍需具备。');
 if(type==='role-handoff')return figure('一次委派：交材料 → 独立核查 → 带着依据返回', journey([
 ['主 Agent','交代核查范围','发送会议与来信：只核对初稿日期'],
 ['资料核查员','在自己的上下文处理','会议是 23 日意向；客户希望 22 日'],
 ['主 Agent','接回结果再起草','保留日期冲突，回复“正在确认”']
 ]), '交接内容是任务、材料、结论与出处；子智能体不自动继承主对话的一切。');
 if(type==='case-result')return figure('同一组材料，怎样变成可跟进的结果？', `
 <div class="case-pairs"><div class="case-pair"><div><span>会议记录 · 第 2 段</span><p>王岚负责初稿，争取 <b>10 月 23 日</b>完成。</p><span>客户来信 · 第 1 段</span><p>希望 <b>10 月 22 日</b>收到初稿。</p></div><span class="journey-arrow" aria-hidden="true">→</span><div><span class="status-chip">日期待确认</span><p>负责人：王岚<br>内部意向：23 日<br>客户期望：22 日</p><small>两种说法都保留，并分别标注来源。</small></div></div><div class="case-pair"><div><span>场地报价 · 费用栏</span><p>场地 <b>8,000 元</b>，不含运费。</p></div><span class="journey-arrow" aria-hidden="true">→</span><div><span class="status-chip">总额待确认</span><p>已知场地费：8,000 元<br>缺失：运费</p><small>来源：场地报价费用栏。</small></div></div></div><div class="reply-preview"><span>回复草稿 · 尚未发送</span><p>感谢来信，我们正在确认初稿日期及运费，确认后回复。</p></div>`, '交付留下事实、来源和待确认项，便于下一步跟进。');

 if(type==='comparison') return figure('同一个目标：整理会议记录，交付待办表', `
 <div class="compare-grid">
  <div class="compare-column"><span class="diagram-kicker">纯文字聊天</span><h3>你来衔接每一步</h3><ol class="flow-list"><li><b>你</b> 找到记录，复制给模型</li><li><b>模型</b> 生成一张文字表格</li><li><b>你</b> 保存文件，检查日期</li><li><b>你</b> 把问题贴回去，再修改</li></ol><p>主要交付：回答或建议</p></div>
  <div class="compare-column accent"><span class="diagram-kicker">具备工具的 Agent</span><h3>程序把步骤连接起来</h3><ol class="flow-list"><li><b>你</b> 交代目标、材料与边界</li><li><b>模型 → 工具</b> 读取指定记录</li><li><b>模型 → 工具</b> 写入并回读待办表</li><li><b>模型</b> 根据结果检查，再交付</li></ol><p>可以交付：实际产物与执行结果</p></div>
 </div><div class="diagram-callout">关键变化：获取材料 → 执行动作 → 检查结果 → 继续推进。</div>`, '上述动作需要相应的工具和授权。');
 if(type==='anatomy') return figure('拆开一个 Agent：模型在循环里，程序让循环运转', `
 <div class="request-goal">你给目标 <span>“读取会议记录，整理待办，保留原文。”</span></div>
 <div class="diagram-down" aria-hidden="true">↓</div>
 <div class="runtime-box"><span class="diagram-kicker">运行环境 · 围绕模型工作的程序</span>
  <div class="runtime-grid"><div class="runtime-node"><span>01 / 组装</span><b>准备上下文</b><small>指令 + 工具说明<br>相关历史 + 新消息</small></div><div class="runtime-node model-node"><span>02 / 调用模型</span><b>LLM 生成下一步</b><small>回答，或<br>结构化工具请求</small></div><div class="runtime-node"><span>03 / 执行</span><b>调用真实工具</b><small>读取 / 写入 / 查询<br>返回内容或错误</small></div><div class="runtime-node"><span>04 / 记录</span><b>把反馈加入历史</b><small>保存调用与结果<br>准备下一次输入</small></div></div>
  <div class="loop-return">↶ 需要继续时：带着新结果，回到 01</div>
 </div><div class="diagram-down" aria-hidden="true">↓</div><div class="request-goal">交付或暂停 <span>任务完成、需要补充信息，或到达运行限制</span></div>`, '图示的是逻辑分工；模型和工具可以位于本机或云端。');
 if(type==='system') return figure('一份系统提示词，可以具体到什么程度？', `
 <div class="prompt-sheet"><div class="prompt-sheet-header"><span>示例：日常办公助手</span><small>本教程虚构 · 非 ZCode 内部提示词</small></div>
 ${[
 ['职责','你帮助用户整理指定资料、生成可核对的待办和邮件草稿。'],
 ['做法','需要原文时先调用读取工具；信息缺失就说明，不根据文件名猜内容。'],
 ['边界','保留原始资料。邮件只起草；需要发送时另行取得明确授权。'],
 ['反馈','工具失败时记录原因，调整方法或说明阻碍，不声称执行成功。'],
 ['交付','给出产物路径、来源依据和仍待确认的事项。']
 ].map(([label,text])=>`<div class="prompt-clause"><b>${label}</b><span>${text}</span></div>`).join('')}</div>
 <div class="instruction-grid"><div><b>用户本次要求</b><p>“整理这份记录，按负责人分组。”</p></div><div><b>文件中的原文</b><p>“王岚争取 10 月 23 日完成。”</p></div></div>
 <div class="diagram-callout">基础指令约定做法，用户要求指定任务，文件原文提供证据。资料中的指令不等于用户授权。</div>`, '运行环境在适用的调用中保留基础指令，使它们持续影响处理方式。');
 if(type==='tool') return figure('一次工具调用：先说明能力，再请求执行', `
 <div class="tool-triptych"><div><span class="diagram-kicker">① 给模型的工具说明</span><h3>能做什么</h3><p>工具：读取文件<br>需要：文件路径</p></div><div><span class="diagram-kicker">② 模型填写操作单</span><h3>这次做什么</h3><p>动作：读取文件<br>路径：inbox/会议记录.txt</p></div><div><span class="diagram-kicker">③ 程序执行后返回</span><h3>实际结果</h3><p>“王岚负责初稿，争取 10 月 23 日完成。”</p><small>失败时也会返回原因，例如文件不存在。</small></div></div>
 <div class="loop-return">结果加入上下文 → 模型决定下一步</div>`, '“操作单”在接口里通常是结构化的工具名和参数。生成请求与实际执行是两个步骤。');
 if(type==='tool-library') return figure('工具不一定是一个看得见的按钮', `
 <div class="tool-library">${[
 ['▤','文件工具','读取文档、写入摘要','把文件正文带进上下文，或把结果保存到磁盘。'],
 ['✉','服务接口','查询邮件、保存草稿','通过邮箱或日历服务的接口操作，需要相应连接与授权。'],
 ['▦','浏览器工具','查看页面、点击、填表','通过网页完成操作，用截图或页面内容检查变化。'],
 ['⌘','代码与命令','计算、转换、批量处理','调用程序计算金额、转换格式；模型仍需检查输入和结果。']
 ].map(([icon,title,example,body])=>`<div><span class="library-icon" aria-hidden="true">${icon}</span><h3>${title}</h3><b>${example}</b><p>${body}</p></div>`).join('')}</div>`, '一个工具可以很小，也可以包装一整段程序。Skill 说明“怎样做得好”，工具提供“实际怎么执行”的能力。');
 if(type==='brief') return lab('一份任务说明，拆开看','不需要特殊句式，把判断标准说清楚就有帮助。', `<div class="prompt-sheet">${[
 ['目标','从本周会议记录提取需要跟进的事项。'],['资料','读取 inbox/ 下指定的会议记录和客户来信。'],['边界','保留原文，不发送邮件，不猜测缺失信息。'],['格式','待办表：事项、负责人、日期、来源、状态。'],['验收','每条有出处；日期冲突单独列出；说明未能读取的文件。']
 ].map(([k,v])=>`<div class="prompt-clause"><b>${k}</b><span>${v}</span></div>`).join('')}</div>`);
 if(type==='role') return lab('一份可复用的资料核查角色','职责要具体到能判断有没有完成。', `<div class="prompt-sheet">${[
 ['职责','核对指定材料中的日期、金额与冲突。'],['依据','只依据引用原文；读不到就说明，不补造事实。'],['交付','字段、各方说法、原文位置、待确认项。'],['工具','配置读取所需材料的工具；不需要发送权限。']
 ].map(([k,v])=>`<div class="prompt-clause"><b>${k}</b><span>${v}</span></div>`).join('')}</div>`);
 return chapterDiagram(type);
}

const AGENT_HISTORY = [
 ['user','用户要求','读取 inbox/会议记录.txt，整理待办表，保留原始资料。'],
 ['assistant','助手的工具请求','读取文件：inbox/会议记录.txt'],
 ['tool','工具结果','会议记录第 2 段：王岚负责初稿，争取 10 月 23 日完成。'],
 ['assistant','助手的工具请求','写入 output/待办表.md：初稿 | 王岚 | 10 月 23 日（意向，待确认）| 会议记录第 2 段'],
 ['tool','工具结果','写入成功：output/待办表.md'],
 ['assistant','助手的工具请求','读取文件：output/待办表.md'],
 ['tool','工具结果','初稿 | 王岚 | 10 月 23 日（意向，待确认）| 会议记录第 2 段'],
 ['assistant','助手回复','待办表已生成并回读核对。10 月 23 日是意向，最终日期待确认。文件：output/待办表.md。'],
 ['user','用户追问','再替我起草一段给王岚的确认消息，不要发送。']
];
const AGENT_CALLS = [
 {label:'① 读原文',end:1,added:0,turn:'用户第 1 轮 · 模型调用 1',title:'模型先收到工作要求，还没有读到文件',note:'规则和文件路径都在，但文件正文不在。模型需要请求读取，不能据此直接假设会议内容。',output:AGENT_HISTORY[1][2],action:'运行环境执行读取；把调用请求和读取结果追加进记录。'},
 {label:'② 写待办',end:3,added:1,turn:'用户第 1 轮 · 模型调用 2',title:'再次调用时，原要求和读取结果一起带上',note:'新输入不只是刚读到的一段文字。前面的任务、工具请求和返回内容共同解释了“为什么读、读到了什么”。',output:AGENT_HISTORY[3][2],action:'运行环境执行写入；把写入请求和成功或失败的结果追加进记录。'},
 {label:'③ 回读检查',end:5,added:3,turn:'用户第 1 轮 · 模型调用 3',title:'写入成功后，模型继续选择检查动作',note:'“写入成功”说明工具执行了保存。为了检查文件内容，模型请求回读；这还不是最终交付。',output:AGENT_HISTORY[5][2],action:'运行环境读取产物；把实际保存的内容带入下一次调用。'},
 {label:'④ 回复你',end:7,added:5,turn:'用户第 1 轮 · 模型调用 4',title:'原始证据和实际产物都在，才能对照交付',note:'模型可以比较会议原文与待办表，并说明仍未确认的日期。此处输出面向用户的回复，当前工具循环结束。',output:AGENT_HISTORY[7][2],action:'运行环境显示并保存助手回复，等待你的下一条消息。'},
 {label:'⑤ 你再追问',end:9,added:7,turn:'用户第 2 轮 · 模型调用 5',title:'你只补充一句话，应用仍需把前情带上',note:'因为相关历史还在，模型知道王岚负责什么，也知道日期尚未确定。这个续问只需要起草文字，不一定要调用工具。',output:'王岚你好，想确认一下初稿的最终完成日期。会议中提到争取 10 月 23 日，方便确认这个时间是否可行吗？',action:'向你展示草稿。没有调用发送工具，所以消息没有发送。'}
];
function agentWalkthrough() {
 return lab('展开看：每一次调用，模型究竟收到了什么？','选择一个阶段，查看完整资料包如何随任务增长。绿色边框标记相对上一次调用新增的记录。', `
 <div class="segments call-tabs" aria-label="选择模型调用阶段">${AGENT_CALLS.map((c,i)=>`<button class="segment" data-call="${i}" aria-pressed="${i===0}">${c.label}</button>`).join('')}</div>
 <div id="call-explanation" aria-live="polite"></div>
 <div class="packet-legend"><span>常驻：规则与工具说明</span><span>保留：已有记录</span><span class="new-legend">＋ 本次新增</span></div>
 <div class="packet-layout"><div class="request-packet"><div class="packet-heading"><b>输入 · 这次可见的上下文</b><small>简化为文字示意</small></div><div class="packet-fixed"><b>基础指令 / 系统提示词</b><p>先读原文；保留原始材料；意向不写成承诺；交付前核对。</p></div><div class="packet-fixed"><b>工具定义</b><p>读取文件：提供路径<br>写入文件：提供路径与内容</p></div><div id="packet-history"></div></div><div class="response-packet"><div class="packet-heading"><b>输出 · 模型的下一步</b></div><div class="model-badge">LLM</div><pre id="call-output"></pre><div class="execution-result"><b>接下来由运行环境做</b><p id="call-action"></p></div></div></div>
 <div class="lab-actions"><button class="button secondary small" id="call-prev">← 上一次调用</button><button class="button small" id="call-next">下一次调用 →</button><span id="call-counter" class="eyebrow"></span></div>
 <p class="hint">用普通文字展示输入、输出和执行反馈；不是内部思考记录或真实接口格式。</p>`)
 + lab('对话越来越长，为什么又会“忘记”？','聊天窗口里能翻到的内容，不一定全部在本次模型输入中。应用可能筛选、检索或压缩历史。', `
 <div class="segments"><button class="segment" data-memory="0" aria-pressed="true">完整记录</button><button class="segment" data-memory="1" aria-pressed="false">压缩后的上下文</button><button class="segment" data-memory="2" aria-pressed="false">只剩最新一句</button></div><div id="memory-view" aria-live="polite"></div>
 <p class="hint">ZCode 提供 /compact 压缩当前对话。摘要会舍弃细节；重要决定写入文件，需要精确日期或原句时，重新读取来源。这里不模拟实际 Token 数量或压缩比例。</p>`);
}
function bindAgent() {
 let selected=0;
 function draw(){
  const c=AGENT_CALLS[selected];
  $$('[data-call]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.call)===selected));
  $('#call-explanation').innerHTML=`<span class="diagram-kicker">${c.turn}</span><h4>${c.title}</h4><p>${c.note}</p>`;
  $('#packet-history').innerHTML=AGENT_HISTORY.slice(0,c.end).map(([role,label,body],i)=>`<div class="packet-message ${role} ${i>=c.added?'new-message':''}"><div><b>${label}</b>${i>=c.added?'<span class="new-tag">＋ 新增</span>':''}</div><p>${esc(body)}</p></div>`).join('');
  $('#call-output').textContent=c.output;$('#call-action').textContent=c.action;
  $('#call-prev').disabled=selected===0;$('#call-next').disabled=selected===AGENT_CALLS.length-1;
  $('#call-counter').textContent=`调用 ${selected+1} / ${AGENT_CALLS.length}`;
 }
 $$('[data-call]').forEach(b=>b.addEventListener('click',()=>{selected=Number(b.dataset.call);draw();}));
 $('#call-prev').addEventListener('click',()=>{selected--;draw();});$('#call-next').addEventListener('click',()=>{selected++;draw();});draw();
 segments('memory',n=>{
  const views=[
   ['保留相关原始记录','原要求 → 读文件 → 原文 → 写文件 → 回读结果 → 助手回复 → 最新追问',['原文：王岚负责初稿，争取 10 月 23 日完成。','产物：output/待办表.md，日期标为意向。','追问：替我起草确认消息，不要发送。'],'可以核对原句，但记录增长会占用上下文容量。'],
   ['用交接摘要替换部分旧记录','持续适用的规则 + 工作摘要 + 最近记录 + 最新追问',['摘要：待办表已保存；王岚负责初稿；日期待确认。','保留来源：inbox/会议记录.txt，第 2 段。','追问：替我起草确认消息，不要发送。'],'这个示例摘要漏掉了“10 月 23 日”。如果需要具体日期，就应回读原文，不能凭空补上。'],
   ['反例：没有带上相关前情','持续适用的规则 + 最新追问',['“再替我起草一段给王岚的确认消息，不要发送。”'],'此时不知道确认哪件事，也不知道日期。需要查找已有材料或向你询问。实际产品不一定采用这种方式；这是帮助理解上下文作用的对比。']
  ];
  const [title,flow,items,note]=views[n];
  $('#memory-view').innerHTML=`<div class="memory-flow"><b>${title}</b><p>${flow}</p></div><div class="memory-cards">${items.map(t=>`<div>${t}</div>`).join('')}</div><div class="diagram-callout">${note}</div>`;
 });
}

function guideRoadmap(){
 return `<section class="guide-roadmap" aria-label="从原理到应用的阅读路线"><div class="section-heading"><div><span class="eyebrow">WHY → HOW → USE</span><h2>每个功能，都从一个问题讲起</h2></div></div><div class="roadmap-grid">${[
 ['01','理解原理','它为什么会回答？怎样才会办事？',[['model','模型'],['context','上下文'],['agent','Agent']]],
 ['02','组织日常工作','资料放哪里？怎样少重复交代？',[['tools','工具'],['projects','项目'],['skills','Skill'],['roles','角色']]],
 ['03','把方法变成流程','步骤怎样衔接？什么时候启动？',[['workflows','流水线'],['automations','自动化'],['applications','完整案例']]]
 ].map(([num,title,why,links])=>`<div><span class="roadmap-number">${num}</span><h3>${title}</h3><p>${why}</p><div>${links.map(([id,text])=>`<a href="#${id}">${text} →</a>`).join('')}</div></div>`).join('')}</div><p class="roadmap-case">贯穿案例：同一个“秋季活动筹备”项目，从整理一份会议记录，走到持续跟进资料和每周简报。</p></section>`;
}
function applicationSection(l){
 const a=l.application;if(!a)return '';
 return `<section class="product-use" id="product-use" tabindex="-1" aria-labelledby="product-use-title"><span class="diagram-kicker">从原理到使用 · ZCODE</span><h2 id="product-use-title">${esc(a.title)}</h2><ol class="product-steps">${a.steps.map(([title,body])=>`<li><h3>${esc(title)}</h3><p>${esc(body)}</p></li>`).join('')}</ol><div class="office-example"><span class="diagram-kicker">办公示例 · 按自己的材料调整</span><div class="generated-text">${esc(a.example)}</div></div><div class="expected-result"><b>你应该得到什么</b><p>${esc(a.expected)}</p></div><div class="inline-sources"><span>操作依据</span>${a.sources.map(i=>`<a href="${SOURCES[i][1]}" target="_blank" rel="noopener noreferrer">${esc(SOURCES[i][0])} ↗</a>`).join('')}</div></section>`;
}
function chapterDiagram(type){
 if(type==='project-why')return figure('为什么建项目：把“重新找一遍”变成“从已有资料继续”', `<div class="compare-grid"><div class="compare-column"><span class="diagram-kicker">资料散在聊天与下载目录里</span><h3>每次重新拼背景</h3><ol class="flow-list"><li>找上次的会议记录</li><li>确认哪份报价是新版</li><li>重讲日期、格式和边界</li><li>从长聊天里翻产物</li></ol></div><div class="compare-column accent"><span class="diagram-kicker">围绕一个活动建立工作区</span><h3>每次定位所需材料</h3><ol class="flow-list"><li>原始材料放 inbox/</li><li>最新决定写入事实文件</li><li>协作规则放 AGENTS.md</li><li>新产物保存到 output/</li></ol></div></div>`, '项目提供稳定位置；模型仍要通过引用和读取取得内容。目录名称只是本教程的组织建议。');
 if(type==='project-layers')return figure('一份项目，多条任务；每次模型调用只拿需要的资料', `<div class="project-scope"><span class="diagram-kicker">工作区 / 秋季活动筹备</span><div class="project-resources"><span>▤ 会议与来信</span><span>▤ 最新报价</span><span>▤ AGENTS.md</span><span>▤ 已确认决定</span></div><div class="diagram-down" aria-hidden="true">↓ 按任务引用或读取 ↓</div><div class="project-tasks"><div><b>任务 A · 整理会议</b><p>会议记录 → 待办表</p></div><div><b>任务 B · 核对报价</b><p>报价 + 约定 → 差异清单</p></div><div><b>任务 C · 回复客户</b><p>来信 + 最新事实 → 草稿</p></div></div><div class="loop-return">产物与已确认事实写回项目 → 下次任务再引用</div></div>`, '项目 ≠ 一条长对话 ≠ 一次模型的上下文。项目内不同任务可复用文件，但不会自动共享全部对话细节。');
 if(type==='pipeline')return lab('一条办公流水线，信息怎样往下走？','点击阶段，查看输入、输出与异常处理。', `<div class="pipeline-graph" aria-label="提取材料、汇总核对、生成草稿、人工确认"><div class="pipeline-inputs"><span>会议记录</span><span>客户来信</span><span>场地报价</span></div><div class="diagram-down" aria-hidden="true">↓ 分别读取与提取，可按需要并行 ↓</div><div class="pipeline-stages">${['提取事实','汇总核对','生成草稿','确认交付'].map((t,i)=>`<button data-pipeline="${i}" aria-pressed="${i===0}"><small>0${i+1}</small><b>${t}</b></button>`).join('')}</div><div class="pipeline-branch">核对后分支：事实清楚 → 直接起草；存在冲突 → 标注待确认，再起草</div></div><div id="pipeline-detail" class="pipeline-detail" aria-live="polite"></div>`);
 if(type==='workflow-choices')return figure('四个不同的问题，四种不同的能力', `<div class="concept-comparison">${[
 ['Skill','每次按什么标准做？','会议摘要总要区分决定、意向和待确认。'],
 ['动态工作流','步骤与结果如何衔接？','分别提取材料 → 汇总冲突 → 生成草稿。'],
 ['目标模式 /goal','这一次怎样持续做到目标达成？','继续整理，直到指定材料都有清单与出处。'],
 ['定时任务','什么时候再次开始？','每周五 16:00 整理本周更新。']
 ].map(([name,q,example])=>`<div><b>${name}</b><span>${q}</span><p>${example}</p></div>`).join('')}</div>`, '保存方法、组织执行、持续推进和定时触发是不同层次；可以按实际需要组合。');
 if(type==='automation-boundary')return figure('流程与时钟，各解决一件事', `<div class="instruction-grid"><div><b>工作流 · 怎么做</b><p>读取 → 提取 → 核对 → 产物</p><small>可手动发起，不要求设定时间。</small></div><div><b>定时任务 · 何时做</b><p>项目 + 时间 + 本次指令</p><small>可执行普通任务指令，不要求预先建工作流。</small></div></div><div class="loop-return">实际执行 → 留下产物与历史 → 检查本次是否成功</div>`, '把一套方法写进定时任务的指令，与调用已保存动态工作流是不同做法。不能仅凭出现一个时间就判断两者已经连接。');
 if(type==='application-map')return figure('按遇到的问题，增加需要的功能', `<div class="application-ladder">${[
 ['给了要求，还是答非所问','补上下文','引用材料，给目标与判断标准','context'],
 ['它会说，但还不能操作','接工具','确认文件、邮箱或浏览器能力','tools'],
 ['明天又要重找资料','建项目','围绕活动保存原文、规则与产物','projects'],
 ['每次重复纠正同一方法','存 Skill','复用提取规则和交付格式','skills'],
 ['同一任务需要不同职责','定义角色','核查和起草各有清楚交接','roles'],
 ['步骤变多、批量结果要汇合','组织工作流','明确依赖、分支与输出','workflows'],
 ['每周都要记得亲自启动','设自动化','安排时间并查看运行记录','automations']
 ].map(([problem,choice,body,id])=>`<a href="#${id}"><span>${problem}</span><b>${choice} →</b><small>${body}</small></a>`).join('')}</div>`, '从当前工作遇到的困难出发，不需要为了用功能而把简单任务复杂化。');
 return '';
}
function bindChapterDiagrams(){
 if(!$('#pipeline-detail'))return;
 const stages=[
 ['原始材料','分别读会议、来信和报价，提取事实并注明位置。','每份材料的事实清单','读不到的材料明确列出，不能用猜测填补。'],
 ['各份事实清单','对齐负责人、日期和费用，保留不一致说法。','日期与费用差异表','例如 10 月 22 日与 23 日冲突，要进入待确认项。'],
 ['经过核对的事实与差异','根据可靠事实起草待办与回复，并保存产物。','待办表.md + 回复草稿.md','草稿可表达“正在确认”，不能擅自承诺具体日期。'],
 ['产物与待确认清单','人确认业务事实；需要发送时按明确授权执行。','确认后的文件或真实发送结果','在本教程案例中只生成本地草稿，不执行发送。']
 ];
 segments('pipeline',n=>{const [input,action,output,gate]=stages[n];$('#pipeline-detail').innerHTML=`<div><span>输入</span><p>${input}</p></div><div><span>这一步做什么</span><p>${action}</p></div><div><span>交给下一步</span><p>${output}</p></div><div class="pipeline-gate"><span>继续条件 / 异常出口</span><p>${gate}</p></div>`;});
}
