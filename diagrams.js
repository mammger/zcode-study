'use strict';

// These are original explanatory examples, not captured ZCode prompts or API traffic.
function figure(title, body, caption) {
 return `<figure class="explain-figure"><figcaption class="figure-title">${title}</figcaption>${body}<p class="figure-caption">${caption}</p></figure>`;
}
function explanationDiagram(type) {
 if(type==='comparison') return figure('同一个目标：整理会议记录，交付待办表', `
 <div class="compare-grid">
  <div class="compare-column"><span class="diagram-kicker">纯文字聊天</span><h3>你来衔接每一步</h3><ol class="flow-list"><li><b>你</b> 找到记录，复制给模型</li><li><b>模型</b> 生成一张文字表格</li><li><b>你</b> 保存文件，检查日期</li><li><b>你</b> 把问题贴回去，再修改</li></ol><p>主要交付：回答或建议</p></div>
  <div class="compare-column accent"><span class="diagram-kicker">具备工具的 Agent</span><h3>程序把步骤连接起来</h3><ol class="flow-list"><li><b>你</b> 交代目标、材料与边界</li><li><b>模型 → 工具</b> 读取指定记录</li><li><b>模型 → 工具</b> 写入并回读待办表</li><li><b>模型</b> 根据结果检查，再交付</li></ol><p>可以交付：实际产物与执行结果</p></div>
 </div><div class="diagram-callout">差别不只在回答更聪明，还在能获取新证据、改变外部状态，并根据反馈连续推进。相应地，耗时、成本和错误影响也可能增加。</div>`, '能力取决于具体工具、授权、模型和运行环境。不是所有叫 Agent 的产品都能完成上述动作。');
 if(type==='anatomy') return figure('拆开一个 Agent：模型在循环里，程序让循环运转', `
 <div class="request-goal">你给目标 <span>“读取会议记录，整理待办，保留原文。”</span></div>
 <div class="diagram-down" aria-hidden="true">↓</div>
 <div class="runtime-box"><span class="diagram-kicker">运行环境 · 围绕模型工作的程序</span>
  <div class="runtime-grid"><div class="runtime-node"><span>01 / 组装</span><b>准备上下文</b><small>指令 + 工具说明<br>相关历史 + 新消息</small></div><div class="runtime-node model-node"><span>02 / 调用模型</span><b>LLM 生成下一步</b><small>回答，或<br>结构化工具请求</small></div><div class="runtime-node"><span>03 / 执行</span><b>调用真实工具</b><small>读取 / 写入 / 查询<br>返回内容或错误</small></div><div class="runtime-node"><span>04 / 记录</span><b>把反馈加入历史</b><small>保存调用与结果<br>准备下一次输入</small></div></div>
  <div class="loop-return">↶ 需要继续时：带着新结果，回到 01</div>
 </div><div class="diagram-down" aria-hidden="true">↓</div><div class="request-goal">交付或暂停 <span>任务完成、需要补充信息，或到达运行限制</span></div>`, '这是一种常见的逻辑分工。模型和工具可运行在本机或云端，图中的位置不表示物理部署位置。');
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
 <div class="diagram-callout">同样是文字，身份不同：基础指令约定做法，用户要求指定任务，原文提供证据。资料里出现“忽略规则”也不因此变成用户授权。</div>`, '系统提示词持续生效，是因为运行环境在适用的模型调用中保留这些指令。它没有被“安装进模型大脑”；真实权限还需要程序和账号配置。');
 if(type==='tool') return figure('一次工具调用：说明 → 请求 → 执行结果', `
 <div class="tool-triptych"><div><span class="diagram-kicker">① 先让模型知道</span><h3>工具说明</h3><code>read_file</code><p>用途：读取一个文件<br>必填参数：path（路径）</p></div><div><span class="diagram-kicker">② 模型输出</span><h3>调用请求</h3><pre>{
  "name": "read_file",
  "arguments": {
    "path": "inbox/会议记录.txt"
  }
}</pre></div><div><span class="diagram-kicker">③ 程序实际执行</span><h3>工具反馈</h3><p>读取成功：<br>“王岚负责初稿，争取 10 月 23 日完成。”</p><small>也可能返回：文件不存在 / 无权访问</small></div></div>
 <div class="loop-return">反馈加入上下文 → 再调用模型 → 决定继续、调整或结束</div>`, '结构化请求类似一张填写好动作和参数的操作单。上述工具名与格式是教学示意；写出这张单不等于动作已执行。');
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
 if(type==='role') return lab('一个角色如何改变做事方式','以邮件草稿助手为例，职责、交付和工具范围需要互相配合。', `<div class="prompt-sheet">${[
 ['职责','根据指定来信与已确认事实起草回复。'],['风格','简洁、温和、专业，不擅自作出承诺。'],['交付','主题、正文、待确认事项，附重要事实来源。'],['边界','不补造事实，不发送消息，不覆盖原始材料。'],['工具','读取材料；如需在邮箱保存草稿，再配置相应服务和权限。']
 ].map(([k,v])=>`<div class="prompt-clause"><b>${k}</b><span>${v}</span></div>`).join('')}</div><p class="hint">这是一份角色说明示例，未在 ZCode 中创建角色。文字里的“只读”不能代替真实工具限制。</p>`);
 if(type==='workflow') return lab('一份每周简报，怎样从资料走到交付','工作流把步骤、依赖和异常处理提前说清楚。', `<ol class="workflow-explainer">${[
 ['收集资料','读取本周会议记录、进度和来信。','没有新材料 → 记录“本期无更新”。'],
 ['提取事实','整理进展、待办和风险，附原文位置。','信息缺失 → 标记待确认。'],
 ['核对来源','检查日期、金额和不同材料的冲突。','无法核实 → 保留差异，不自行选择。'],
 ['生成草稿','按日期保存周报与邮件草稿。','写入失败 → 报告实际错误。'],
 ['审核与交付','人确认内容，需要发送时再按授权执行。','防止重复发送，保留执行结果。']
 ].map(([title,body,branch])=>`<li><b>${title}</b><p>${body}</p><small>${branch}</small></li>`).join('')}</ol><div class="diagram-callout"><b>自动化加上触发时间：</b>例如每周五 16:00 启动这条流程。ZCode 本机任务需要电脑唤醒、应用运行；工作流本身不会让电脑关机后继续工作。</div>`);
 return '';
}

const AGENT_HISTORY = [
 ['user','用户要求','读取 inbox/会议记录.txt，整理待办表，保留原始资料。'],
 ['assistant','助手的工具请求','read_file(path: "inbox/会议记录.txt")'],
 ['tool','工具结果','会议记录第 2 段：王岚负责初稿，争取 10 月 23 日完成。'],
 ['assistant','助手的工具请求','write_file(path: "output/待办表.md", content: "初稿 | 王岚 | 10 月 23 日（意向，待确认）| 会议记录第 2 段")'],
 ['tool','工具结果','写入成功：output/待办表.md'],
 ['assistant','助手的工具请求','read_file(path: "output/待办表.md")'],
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
 <div class="packet-layout"><div class="request-packet"><div class="packet-heading"><b>输入 · 这次可见的上下文</b><small>简化为文字示意</small></div><div class="packet-fixed"><b>基础指令 / 系统提示词</b><p>先读原文；保留原始材料；意向不写成承诺；交付前核对。</p></div><div class="packet-fixed"><b>工具定义</b><p>read_file(path)：读取文件<br>write_file(path, content)：写入产物</p></div><div id="packet-history"></div></div><div class="response-packet"><div class="packet-heading"><b>输出 · 模型的下一步</b></div><div class="model-badge">LLM</div><pre id="call-output"></pre><div class="execution-result"><b>接下来由运行环境做</b><p id="call-action"></p></div></div></div>
 <div class="lab-actions"><button class="button secondary small" id="call-prev">← 上一次调用</button><button class="button small" id="call-next">下一次调用 →</button><span id="call-counter" class="eyebrow"></span></div>
 <p class="hint">记录名称与工具格式是概念表示，不对应某一家 API 的精确字段。图中展示的是输入、输出与执行反馈，不是模型的内部思考过程。</p>`)
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
