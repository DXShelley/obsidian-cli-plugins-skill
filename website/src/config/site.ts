export type SiteLocale = 'zh-CN' | 'en';

interface SiteConfig {
  readonly version: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly nav: {
    readonly ariaLabel: string;
    readonly items: readonly { readonly label: string; readonly href: string }[];
  };
  readonly language: {
    readonly label: string;
    readonly zh: string;
    readonly en: string;
  };
  readonly hero: {
    readonly kicker: string;
    readonly title: string;
    readonly subtitle: string;
    readonly primary: { readonly label: string; readonly href: string };
    readonly secondary: { readonly label: string; readonly href: string };
    readonly panel: {
      readonly kicker: string;
      readonly title: string;
      readonly body: string;
      readonly chips: readonly string[];
    };
  };
  readonly sections: {
    readonly capabilities: { readonly eyebrow: string; readonly title: string };
    readonly workflow: { readonly eyebrow: string; readonly title: string };
    readonly install: { readonly eyebrow: string; readonly title: string; readonly body: string };
    readonly links: { readonly eyebrow: string; readonly title: string };
    readonly support: { readonly eyebrow: string; readonly title: string; readonly body: string };
  };
  readonly cards: readonly { readonly title: string; readonly body: string; readonly meta: string }[];
  readonly workflow: readonly { readonly step: string; readonly title: string; readonly body: string }[];
  readonly commands: readonly string[];
  readonly links: readonly {
    readonly title: string;
    readonly body: string;
    readonly href: string;
    readonly meta: string;
    readonly relation: string;
    readonly optionality: string;
  }[];
  readonly support: readonly { readonly title: string; readonly body: string; readonly image: string; readonly alt: string }[];
}

const VERSION = 'v1.0.0';
const imageManagerUrlZh = 'https://dxshelley.github.io/obsidian-image-manager/';
const imageManagerUrlEn = 'https://dxshelley.github.io/obsidian-image-manager/?lang=en';
const mediaClaimUrlZh = 'https://dxshelley.github.io/openclaw-obsidian-media-claim/';
const mediaClaimUrlEn = 'https://dxshelley.github.io/openclaw-obsidian-media-claim/?lang=en';

const supportZh: SiteConfig['support'] = [
  { title: '微信支付', body: '推荐使用微信扫码支持项目维护。', image: 'support/weixin.png', alt: '微信支付收款二维码' },
  { title: '微信赞赏码', body: '也可以通过微信赞赏码支持后续迭代。', image: 'support/zanshangma.png', alt: '微信赞赏码' },
  { title: '支付宝', body: '打开支付宝扫一扫即可支持项目。', image: 'support/zhifubao.png', alt: '支付宝收款二维码' }
];

const supportEn: SiteConfig['support'] = [
  { title: 'WeChat Pay', body: 'Scan with WeChat Pay to support the project.', image: 'support/weixin.png', alt: 'WeChat Pay QR code' },
  { title: 'WeChat Reward Code', body: 'You can also support through the WeChat reward code.', image: 'support/zanshangma.png', alt: 'WeChat reward QR code' },
  { title: 'Alipay', body: 'Scan with Alipay to support the project.', image: 'support/zhifubao.png', alt: 'Alipay QR code' }
];

const configs: Record<SiteLocale, SiteConfig> = {
  'zh-CN': {
    version: VERSION,
    metaTitle: `obsidian-cli-plugins ${VERSION}`,
    metaDescription: 'obsidian-cli-plugins 是面向 Codex、OpenClaw 和其他 agent 的 Obsidian 技能，用少量命令完成灵感记录、项目孵化、任务管理、日程管理和附件记录。',
    nav: {
      ariaLabel: '页面导航',
      items: [
        { label: '核心能力', href: '#capabilities' },
        { label: '记录流程', href: '#workflow' },
        { label: '安装与验证', href: '#install' },
        { label: '相关项目', href: '#links' },
        { label: '支持项目', href: '#support' }
      ]
    },
    language: { label: '语言', zh: '中文', en: 'EN' },
    hero: {
      kicker: 'Obsidian Agent 技能',
      title: '灵感、项目、任务、日程，|用少量命令自然写进 Obsidian。',
      subtitle:
        'obsidian-cli-plugins 不追求大而全的复杂系统，而是把每天真实会用的记录动作做顺：一句话记灵感，一个项目慢慢孵化，任务和日程能落地，附件也能跟着记录走。',
      primary: { label: '查看能力', href: '#capabilities' },
      secondary: { label: '安装与验证', href: '#install' },
      panel: {
        kicker: '少即是多',
        title: '少量稳定命令，|覆盖每天真实会用的 Obsidian 工作流。',
        body: '灵感记录、项目记录、任务补充、问题决策、日程归档和文件附件|都收敛到清楚的命令边界里，减少心智负担。',
        chips: ['灵感记录', '项目孵化', '任务管理', '日程管理']
      }
    },
    sections: {
      capabilities: { eyebrow: '核心能力', title: '只保留高频记录动作：|好用、清楚、不过度。' },
      workflow: { eyebrow: '记录流程', title: '把想法、任务、项目和附件|落到 Obsidian。' },
      install: { eyebrow: '安装与验证', title: '先运行 doctor，|再用同步命令|写入 Obsidian。', body: '技能负责 vault discovery、Git preflight、记录创建、附件复制、暂存附件消费和同步，|适合 Codex、OpenClaw 或其他 agent runtime。' },
      links: { eyebrow: '相关项目', title: '本技能负责记录落库，|另外两个项目按需接入。' },
      support: { eyebrow: '支持项目', title: '如果这个技能帮你把记录动作变简单，|可以扫码支持维护。', body: '赞助用于维护脚本、测试真实 Obsidian vault、更新文档，|并适配 Codex / OpenClaw 运行环境变化。' }
    },
    cards: [
      { meta: 'Inbox', title: '灵感记录', body: '突然想到的点子、路上看到的素材、临时想法，|都能用一句话追加到当天或指定周期记录。' },
      { meta: 'Project', title: '项目孵化', body: '项目不是一次写完的文档，|而是持续补充需求、决策、任务、问题和阶段记录的生长过程。' },
      { meta: 'Task', title: '任务管理', body: '把待办、跟进、问题和结论落到 Obsidian 里，|保留上下文，不把任务割裂成另一个系统。' },
      { meta: 'Calendar', title: '日程管理', body: '会议纪要、每日记录、阶段复盘和文件型附件|能进入同一套记录习惯，轻量但可追踪。' }
    ],
    workflow: [
      { step: '01', title: '一句话记录', body: '不要求用户先整理格式，|先把灵感、任务、日程或项目上下文可靠落盘。' },
      { step: '02', title: '按类型沉淀', body: '普通记录、项目记录、任务补充、文件记录各有边界，|但入口保持简单。' },
      { step: '03', title: '附件自然跟随', body: '图片、视频、文件通过 staged attachment 消费进记录，|不需要用户手动找路径。' },
      { step: '04', title: '同步和回看', body: '记录完成后保留 Git preflight 和同步习惯，|让 Obsidian 成为长期可维护的知识库。' }
    ],
    commands: [
      'python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py doctor',
      'python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py record-sync --mode inline --period day --date today --text "Captured note text"',
      'python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py tasks show --period day --date today'
    ],
    links: [
      {
        meta: 'Obsidian 插件',
        title: 'Note Image Manager',
        relation: '可选配套',
        optionality: '需要在 Obsidian 里管理图片时安装；|纯文本记录不需要。',
        body: '负责图片导入、命名、压缩转换、画廊和恢复事务，|管理已经进入 vault 的图片。',
        href: imageManagerUrlZh
      },
      {
        meta: 'OpenClaw 插件',
        title: 'Obsidian Media Claim',
        relation: '可选前置',
        optionality: '仅在 OpenClaw 纯媒体上传省 token 场景中需要。',
        body: '负责把纯媒体消息暂存为 staged attachments，|后续可由本技能写入 Obsidian。',
        href: mediaClaimUrlZh
      },
      {
        meta: '当前项目',
        title: 'obsidian-cli-plugins',
        relation: '记录落库',
        optionality: '可独立处理文本记录；|处理暂存媒体时可搭配 OpenClaw 插件。',
        body: '负责灵感、项目、任务、日程和附件记录，|是 agent 写入 Obsidian 的命令入口。',
        href: '#top'
      }
    ],
    support: supportZh
  },
  en: {
    version: VERSION,
    metaTitle: `obsidian-cli-plugins ${VERSION}`,
    metaDescription: 'obsidian-cli-plugins is an Obsidian skill for Codex, OpenClaw, and other agents. A small command set handles inspiration capture, project incubation, tasks, schedules, and attachment records.',
    nav: {
      ariaLabel: 'Page navigation',
      items: [
        { label: 'Capabilities', href: '#capabilities' },
        { label: 'Workflow', href: '#workflow' },
        { label: 'Install', href: '#install' },
        { label: 'Links', href: '#links' },
        { label: 'Support', href: '#support' }
      ]
    },
    language: { label: 'Language', zh: '中文', en: 'EN' },
    hero: {
      kicker: 'Obsidian agent skill',
      title: 'Capture ideas, projects, tasks, and schedules with a small command set.',
      subtitle:
        'obsidian-cli-plugins avoids a heavy system. It keeps frequent recording actions easy: capture an idea, incubate a project, manage tasks and schedules, and let attachments follow the record.',
      primary: { label: 'View capabilities', href: '#capabilities' },
      secondary: { label: 'Start using it', href: '#install' },
      panel: {
        kicker: 'Less is more',
        title: 'A few stable commands cover daily Obsidian workflows.',
        body: 'Inspiration notes, project updates, task follow-ups, decisions, schedule archives, and files share clear command boundaries without adding another productivity system.',
        chips: ['inspiration', 'project incubation', 'tasks', 'schedules']
      }
    },
    sections: {
      capabilities: { eyebrow: 'Capabilities', title: 'This page only focuses on obsidian-cli-plugins: easy to use, intentionally small.' },
      workflow: { eyebrow: 'Workflow', title: 'Less is more: compress recording into repeatable steps.' },
      install: { eyebrow: 'Install and Verify', title: 'Run doctor first, then write with sync-backed commands.', body: 'The skill owns vault discovery, Git preflight, record creation, attachment copying, staged-attachment consumption, and sync across Codex, OpenClaw, or other agent runtimes.' },
      links: { eyebrow: 'Friendly Links', title: 'Related projects maintain their own Pages. This page only describes obsidian-cli-plugins.' },
      support: { eyebrow: 'Support', title: 'If this skill makes Obsidian recording easier, you can support its maintenance.', body: 'Sponsorship helps maintain scripts, test real Obsidian vaults, update docs, and adapt Codex / OpenClaw runtime changes.' }
    },
    cards: [
      { meta: 'Inbox', title: 'Inspiration capture', body: 'Quick thoughts, field notes, and temporary ideas can be appended to a daily or scoped record with one sentence.' },
      { meta: 'Project', title: 'Project incubation', body: 'A project grows through requirements, decisions, tasks, issues, and progress notes instead of one huge document.' },
      { meta: 'Task', title: 'Task management', body: 'Todos, follow-ups, questions, and conclusions stay with their Obsidian context instead of being split into another system.' },
      { meta: 'Calendar', title: 'Schedule management', body: 'Meetings, daily notes, reviews, and attachment-backed files fit into one lightweight recording habit.' }
    ],
    workflow: [
      { step: '01', title: 'Record in one sentence', body: 'Capture ideas, tasks, schedules, or project context without preparing a template first.' },
      { step: '02', title: 'Settle by type', body: 'Daily notes, project records, task updates, and file records keep clear but simple boundaries.' },
      { step: '03', title: 'Attachments follow naturally', body: 'Images, videos, and files are consumed through staged attachments without manual path hunting.' },
      { step: '04', title: 'Sync and revisit', body: 'Git preflight and sync keep the vault maintainable over time.' }
    ],
    commands: [
      'python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py doctor',
      'python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py record-sync --mode inline --period day --date today --text "Captured note text"',
      'python3 ~/.codex/skills/obsidian-cli-plugins/scripts/obsidian_workflows.py tasks show --period day --date today'
    ],
    links: [
      {
        meta: 'Obsidian Plugin',
        title: 'Note Image Manager',
        relation: 'Optional companion',
        optionality: 'Install it when images need to be managed inside Obsidian; text-only records do not need it.',
        body: 'Handles image import, naming, compression, conversion, galleries, and recovery transactions for images already in the vault.',
        href: imageManagerUrlEn
      },
      {
        meta: 'OpenClaw Plugin',
        title: 'Obsidian Media Claim',
        relation: 'Optional upstream',
        optionality: 'Only needed for token-saving media-only uploads in OpenClaw.',
        body: 'Stages pure media messages as attachments that this skill can later write into Obsidian.',
        href: mediaClaimUrlEn
      },
      {
        meta: 'Current Project',
        title: 'obsidian-cli-plugins',
        relation: 'Record writer',
        optionality: 'Works on its own for text records; pairs with the OpenClaw plugin for staged media.',
        body: 'The command entry point for agents writing ideas, projects, tasks, schedules, and attachments into Obsidian.',
        href: '#top'
      }
    ],
    support: supportEn
  }
};

export function getSiteConfig(locale: SiteLocale): SiteConfig {
  return configs[locale];
}
