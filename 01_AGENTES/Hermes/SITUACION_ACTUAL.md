# 🟢 SITUACIÓN ACTUAL — CELC Systems

> Visualiza el estado de la operación como un "semáforo":
> - 🟢 Todo bien, avanzando
> - 🟡 Precaución, requiere atención
> - 🔴 Bloqueado, urgentísimo

---

## 🟢 Servidores / Infraestructura

| Servicio | URL | Estado | Last Check |
|----------|-----|--------|------------|
| n8n | n8n.celcsystems.com | Activo v2.21.7 | 2026-06-13 |
| OpenClaw | localhost:18789 | 🟢 Activo v2026.6.5 | 2026-06-13 |
| Hermes Gateway | Local | Activo | 2026-06-13 |
| VAPI | vapi.ai dashboard | Activo +1 725-543-7076 | 2026-06-13 |
| Website | celcsystems.com | Activo, SSL OK | 2026-06-13 |
| Mundial 2026 | mundial.celcsystems.com | Activo, 6 tabs | 2026-06-13 |
| Engram CORS Proxy | localhost:7438 | Activo | 2026-06-13 |

---

## 🟡 Clientes

| Cliente | Status | Último Contacto | Próximo Follow-up | Notas |
|---------|--------|-----------------|-------------------|-------|
| JM Travel | 🟢 Activo | 2026-04-13 | Cuando me llama | Modelo pasivo: contacto por iniciativa del cliente. Único cliente actual. |

---

## 🟢 Proyectos Activos

| Proyecto | Estado | ETA | Bloqueo |
|----------|--------|-----|---------|
| Formulario web → Sheets | ✅ 100% | — | n8n webhook `/webhook/celc-contact` activo, VAPI +1 725-543-7076 |
| SSL renewal | — | Jul 14, 2026 | Revisar en Junio |
| Resumen diario 8pm | ✅ Activo | — | Cronjob ok |
| Buenos días CELC | ✅ Activo | — | Script 8:05am |
| Daily market monitor | ✅ Activo | — | 10am, paper-trading signals 9:15am |
| Mundial 2026 web app | ✅ Activo | — | Pronósticos diarios 10am + noticias cada 12h |
| Contenido redes sociales | ⏳ Pendiente | — | Esperando decisión de Carlos |
| Google Business verificación | 🟡 Postal enviada — confirmar recepción | — | Revisar status postal |

---

## 🟢 Agentes IA

| Agente | Plataforma | Modelo | Rol | Estado |
|--------|-----------|--------|-----|--------|
| Hermes | CLI / Telegram | ollama/kimi-k2.6:cloud | Chief of Staff / Coordination | 🟢 Activo |
| OpenClaw main | OpenClaw Telegram | ollama/kimi-k2.6:cloud | General assistant | 🟢 Activo |
| OpenClaw field-tech | OpenClaw Telegram | ollama/kimi-k2.6:cloud | Desktop automation | 🟢 Activo |
| Claude Code | CLI | Claude 4 | AWS deployment & coding | 🟢 Activo |

---

## Decisiones Pendientes

- [x] ¿JM Travel sigue como cliente activo? Sí — contacto pasivo, resuelto.
- [ ] ¿Contenido Redes Sociales? Estrategia y canal de calendarización — sigue en proceso.
- [ ] ¿Google Business verificación? Confirmar recepción postal — sigue pendiente.
- [ ] ¿Astor proyecto? Definir alcance y siguiente paso — pendiente.
- [x] ¿Engram memoria limpia? Sí, limpieza programada.
- [x] ¿Reporte diario bolsa? Daily-market-monitor activo (9:15am señales, 10am mercado).

---

## Alineación Estratégica

> Misión del trimestre (Q2 2026): Escalar a 10 clientes.
> **Realidad:** 1 cliente presente (JM Travel, contacto por iniciativa). Requiere esfuerzos de prospección y estrategia.
> **Q3 outlook:** Priorizar onboarding automatizado para nuevos clientes.

---

## 📅 Ritmo Operativo (Cronjobs Activos)

| Horario | Tarea |
|---------|-------|
| 03:00 | Backup diario CELC |
| 08:00 | Chief of Staff morning briefing |
| 08:01 | Daily task prep |
| 08:05 | Buenos días CELC (script) |
| 08:10 | Gmail executive assistant triage |
| 08:15 | Verificar Engram CORS proxy |
| 08:20 | Exportar Engram a Obsidian |
| 09:15 | Señales paper trading |
| 10:00 | Market monitor + pronósticos Mundial |
| 10:00, 13:00, 18:00 | Gmail inbox watchdog (3x día) |
| 12:00 | Noticias Mundial 2026 |
| 20:00 | Resumen diario 8pm |

---

## 🟢 Problemas Recientes Resueltos

| Fecha | Problema | Fix |
|-------|----------|-----|
| 2026-06-13 | OpenClaw `field-tech` respondía "Something went wrong" | API key de Parallel.ai inválida; migrado modelo a `ollama/kimi-k2.6:cloud` |

---

*Actualizado: 2026-06-13*
