"""Rebuild the fictional, self-contained ZCode practice archive."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import re

root = Path(__file__).resolve().parent.parent
content = (root / 'content.js').read_text()
skill = re.search(r'const SKILL_TEMPLATE = `([\s\S]*?)`;', content).group(1)
rules = re.search(r'const PROJECT_RULES = `([\s\S]*?)`;', content).group(1)
files = {
'开始练习.txt': '''ZCode 办公练习包
所有人物、邮件、项目均为教学虚构。本练习不连接真实邮箱。

1. 解压后，在 ZCode 中打开“办公练习”目录。
2. 先阅读 AGENTS.md，确认其中的协作约定。
3. 告诉 Agent 只读取 inbox/ 的两份资料，生成带来源的待办表和客户回复草稿，写入 output/。
4. 日期有冲突时分别列出，不自行选择；未明确的负责人、日期或金额写待确认。
5. 保留原件，不发送邮件。检查生成文件，再对照“参考答案.txt”。
6. templates/meeting-brief/SKILL.md 是可选方法模板，没有自动安装。
   用户级技能可安装到 ~/.zcode/skills/meeting-brief/SKILL.md，随后在设置中刷新并启用。
   你也可以通过“设置 → 技能 → 新建技能”让 ZCode 帮你创建。

这是教学项目布局，不要求真实工作一定使用这些目录名称。
''',
'AGENTS.md': rules + '\n',
'inbox/会议记录-1015.txt': '''【第 1 段】2026-10-15，秋季活动筹备会。参会：王岚、陈默。
【第 2 段】王岚负责宣传初稿，争取 10 月 23 日完成，最终日期尚未确认。
【第 3 段】场地报价 8,000 元，不含运费。陈默负责询问运费，未约定回复日期。
【第 4 段】客户回复由谁发送，本次会议未确定。
''',
'inbox/客户来信-1016.txt': '''【第 1 段】发件人：林青（教学虚构客户）
【第 2 段】我们希望在 10 月 22 日收到宣传初稿，请确认是否可行。
【第 3 段】请确认场地报价是否包含运费；希望你们在回复中说明。
''',
'output/请将产物放在这里.txt': '本目录用于保存待办表和邮件草稿，不要覆盖 inbox/ 中的原始资料。\n',
 'templates/meeting-brief/SKILL.md': skill + '\n',
 'templates/周报模板.md': '# 本周工作简报\n\n## 已确认进展\n\n## 风险与待确认\n\n## 下周行动\n\n## 来源\n',
 '参考答案.txt': '''先完成，再对照。没有唯一的措辞，检查事实和证据是否正确即可。

待办示例：
- 宣传初稿 | 王岚 | 10 月 23 日是内部意向，客户期望 10 月 22 日，待对齐 | 会议记录第 2 段、客户来信第 2 段
- 询问运费 | 陈默 | 截止日期未指定 | 会议记录第 3 段
- 确认客户回复安排 | 负责人待确认 | 日期待确认 | 会议记录第 4 段

金额：场地报价 8,000 元，不含运费；总费用未确定。来源：会议记录第 3 段。

客户回复草稿示例：
主题：宣传初稿时间与费用确认
林青您好，收到您希望于 10 月 22 日收到宣传初稿的需求。我们内部目前以 10 月 23 日为争取完成的时间，尚未最终确认，正在核对能否满足 22 日的安排。
目前场地报价为 8,000 元，不含运费，我们正在补充确认运费及总费用。确认后再向您反馈交付时间和完整费用。
谢谢。

注意：这只是本地草稿，尚未发送。没有编造收件邮箱、附件或发送成功状态。
'''
}
archive = root / 'downloads/zcode-office-practice.zip'
archive.parent.mkdir(exist_ok=True)
with ZipFile(archive, 'w', ZIP_DEFLATED) as z:
    for name, text in files.items():
        z.writestr('办公练习/' + name, text)
with ZipFile(archive) as z:
    assert z.testzip() is None
print(f'Created {archive.name}: {len(files)} files')
