const execution = $json.execution ?? {};
const workflow = $json.workflow ?? {};
const error = execution.error ?? {};

const data = new Date().toLocaleString("pt-BR", {
  timeZone: "America/Sao_Paulo",
});

const stack = (error.stack ?? "")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

const incidente = `INC-${new Date()
  .toISOString()
  .slice(0, 10)
  .replace(/-/g, "")}-${execution.id ?? "SEM_ID"}`;

const mensagem = (error.message ?? "").toLowerCase();

let severidade = "🟢 Baixa";
let cor = "#107C10";

if (
  mensagem.includes("connection") ||
  mensagem.includes("database") ||
  mensagem.includes("econnreset") ||
  mensagem.includes("timeout") ||
  mensagem.includes("socket") ||
  mensagem.includes("credential")
) {
  severidade = "🔴 Crítica";
  cor = "#c50f1f";
} else if (
  mensagem.includes("429") ||
  mensagem.includes("500") ||
  mensagem.includes("api") ||
  mensagem.includes("http")
) {
  severidade = "🟠 Alta";
  cor = "#d83b01";
} else if (
  mensagem.includes("javascript") ||
  mensagem.includes("expression") ||
  mensagem.includes("syntax")
) {
  severidade = "🟡 Média";
  cor = "#ffb900";
}

const stackResumo = stack
  .split("\n")
  .slice(0, 10)
  .join("\n");

const html = `

<div style="
padding:24px;
font-family:'Segoe UI',Arial,sans-serif;
font-size:14px;
line-height:1.45;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
max-width:860px;
margin:auto;
border:1px solid #d0d0d0;
">

<tr>

<td style="
background:#c50f1f;
padding:26px;
border-bottom:1px solid #374151;
">
<div style="
font-size:13px;
font-weight:700;
color:#fecaca;
text-transform:uppercase;
letter-spacing:1px;
">

N8N PLATFORM MONITOR

</div>

<div style="
margin-top:8px;
font-size:34px;
font-size:20px;
font-weight:700;
">

🚨 Monitoramento de Automações n8n

</div>

<div style="
margin-top:8px;
font-size:16px;
color:#f3f4f6;
">

Foi detectada uma falha durante a execução de uma automação.

</div>

</td>

</tr>

<tr>

<td style="padding:26px;">

<div style="
font-size:24px;
font-weight:700;
line-height:52px;
word-break:break-word;
">

${error.message ?? "Erro não informado"}

</div>

<div style="margin-top:20px;">

<span style="
display:inline-block;
background:${cor};
padding:7px 16px;
font-size:13px;
font-weight:700;
">

${severidade}

</span>

<span style="
margin-left:16px;
font-size:14px;
color:#d1d5db;
">

Incidente:
<b>

${incidente}

</b>

</span>

</div>

<table
width="100%"
cellpadding="12"
cellspacing="0"
style="
margin-top:30px;
border:1px solid #374151;
">

<tr>

<td width="50%" style="border:1px solid #374151;">

<div style="
font-size:11px;
text-transform:uppercase;
color:#9ca3af;
">

⚙ Workflow

</div>

<div style="
margin-top:6px;
font-size:20px;
font-weight:600;
word-break:break-word;
">

${workflow.name ?? "-"}

</div>

</td>

<td width="50%" style="border:1px solid #374151;">

<div style="
font-size:11px;
text-transform:uppercase;
color:#9ca3af;
">

📦 Último Node

</div>

<div style="
margin-top:6px;
font-size:20px;
font-weight:600;
word-break:break-word;
">

${execution.lastNodeExecuted ?? "-"}

</div>

</td>

</tr>

<tr>

<td style="border:1px solid #374151;">

<div style="
font-size:11px;
text-transform:uppercase;
color:#9ca3af;
">

▶ Execução

</div>

<div style="
margin-top:6px;
font-size:20px;
font-weight:700;
">

${execution.id ?? "-"}

</div>

</td>

<td style="border:1px solid #374151;">

<div style="
font-size:11px;
text-transform:uppercase;
color:#9ca3af;
">

🌐 Origem

</div>

<div style="
margin-top:6px;
font-size:20px;
font-weight:700;
">

${execution.executionContext?.source ?? execution.mode ?? "-"}

</div>

</td>

</tr>

<tr>

<td style="border:1px solid #374151;">

<div style="
font-size:11px;
text-transform:uppercase;
color:#9ca3af;
">

🆔 Workflow ID

</div>

<div style="
margin-top:6px;
font-size:15px;
word-break:break-all;
">

${workflow.id ?? "-"}

</div>

</td>

<td style="border:1px solid #374151;">

<div style="
font-size:11px;
text-transform:uppercase;
color:#9ca3af;
">

🕒 Data/Hora

</div>

<div style="
margin-top:6px;
font-size:18px;
font-weight:700;
">

${data}

</div>

</td>

</tr>

</table>
<div style="
margin-top:28px;
text-align:center;
">

<a
href="${execution.url ?? "#"}"
style="
display:inline-block;
background:#dc2626;
text-decoration:none;
padding:16px 34px;
font-size:16px;
font-weight:700;
border:1px solid #ef4444;
">

🔎 Abrir Execução no n8n

</a>

<div style="
margin-top:10px;
font-size:13px;
color:#9ca3af;
">

Clique para visualizar todos os detalhes da execução.

</div>

</div>

<table
width="100%"
cellpadding="18"
cellspacing="0"
style="
margin-top:30px;
border:1px solid #374151;
">

<tr>

<td>

<div style="
font-size:26px;
font-weight:700;
">

💻 Diagnóstico Técnico

</div>

<div style="
margin-top:6px;
font-size:14px;
color:#9ca3af;
">

Resumo técnico do incidente detectado.

</div>

<hr style="
border:none;
border-top:1px solid #374151;
margin:18px 0;
">

<div style="
font-size:12px;
text-transform:uppercase;
color:#9ca3af;
">

Tipo do Erro

</div>

<div style="
margin-top:6px;
font-size:20px;
font-weight:700;
">

${error.name ?? "Erro não identificado"}

</div>

<div style="
margin-top:20px;
font-size:12px;
text-transform:uppercase;
color:#9ca3af;
">

Mensagem

</div>

<div style="
margin-top:6px;
font-size:16px;
font-weight:600;
word-break:break-word;
">

${error.message ?? "-"}

</div>

<div style="
margin-top:20px;
font-size:12px;
text-transform:uppercase;
color:#9ca3af;
">

Ação Recomendada

</div>

<div style="
margin-top:8px;
font-size:15px;
line-height:24px;
">

${mensagem.includes("timeout")
? "Verifique o tempo de resposta do serviço e a disponibilidade da infraestrutura."
: mensagem.includes("econnreset")
? "Verifique a conectividade com o banco de dados ou serviço remoto antes de reexecutar o workflow."
: mensagem.includes("credential")
? "Valide as credenciais configuradas neste workflow."
: mensagem.includes("429")
? "O serviço atingiu o limite de requisições. Aguarde alguns instantes antes de tentar novamente."
: mensagem.includes("syntax") || mensagem.includes("javascript")
? "Revise o código ou expressão utilizada no node que gerou a exceção."
: "Abra a execução para visualizar o stack trace completo e realizar a análise detalhada."}

</div>

</td>

</tr>

</table>

<hr style="
border:none;
border-top:1px solid #374151;
margin:30px 0;
">

<table
width="100%"
cellpadding="0"
cellspacing="0">

<tr>

<td>

<div style="
font-size:20px;
font-weight:700;
">

🤖 N8N Platform Monitor

</div>

<div style="
margin-top:8px;
font-size:13px;
line-height:22px;
color:#9ca3af;
">

Esta notificação foi gerada automaticamente pelo Monitor de Automações n8n.

</div>

</td>

<td align="right">

<div style="
font-size:11px;
text-transform:uppercase;
color:#6b7280;
">

Workflow

</div>

<div style="
margin-top:4px;
font-size:14px;
font-weight:600;
">

${workflow.name ?? "-"}

</div>

<div style="
margin-top:12px;
font-size:11px;
text-transform:uppercase;
color:#6b7280;
">

Execução

</div>

<div style="
margin-top:4px;
font-size:14px;
font-weight:600;
">

${execution.id ?? "-"}

</div>

<div style="
margin-top:12px;
font-size:11px;
text-transform:uppercase;
color:#6b7280;
">

Gerado em

</div>

<div style="
margin-top:4px;
font-size:14px;
font-weight:600;
">

${data}

</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</div>

`;

return [
  {
    json: {
      html,
      incidente,
      severidade,
      workflowName: workflow.name ?? null,
      workflowId: workflow.id ?? null,
      executionId: execution.id ?? null,
      executionUrl: execution.url ?? null,
      executionMode: execution.mode ?? null,
      source: execution.executionContext?.source ?? execution.mode ?? null,
      lastNode: execution.lastNodeExecuted ?? null,
      errorMessage: error.message ?? null,
      errorName: error.name ?? null,
      errorCode: error.code ?? null,
      stackResumo,
      stackCompleto: stack,
      generatedAt: data,
      raw: $json
    }
  }
];
