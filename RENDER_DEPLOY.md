# 🚀 Voyago Bot - Render Deployment Guide

## ✅ Perché Render è Perfetto per Voyago Bot

- ✅ **Supporto Node.js nativo**
- ✅ **Deploy automatico da GitHub**
- ✅ **HTTPS gratuito** (necessario per webhook Telegram)
- ✅ **Piano gratuito** disponibile
- ✅ **Configurazione semplice**

## 🚀 Deploy in 5 Minuti

### Step 1: Prepara il Repository
```bash
# Inizializza git (se non fatto)
git init
git add .
git commit -m "Initial Voyago Bot setup"

# Pusha su GitHub
git remote add origin https://github.com/tuousername/voyago-bot.git
git push -u origin main
```

### Step 2: Deploy su Render
1. Vai su [render.com](https://render.com)
2. Registrati/Login con GitHub
3. Click **"New +"** → **"Web Service"**
4. Connetti il tuo repository GitHub
5. Configura:
   - **Name**: `voyago-bot`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (per iniziare)

### Step 3: Configurazione Automatica
Il file `render.yaml` configurerà automaticamente:
- Tutte le variabili d'ambiente
- Bot token e API keys
- Link di affiliazione
- Impostazioni di produzione

### Step 4: Ottieni URL Webhook
Dopo il deploy, Render ti darà un URL tipo:
`https://voyago-bot.onrender.com`

### Step 5: Aggiorna Webhook URL
```bash
# Aggiorna .env locale per test
WEBHOOK_URL=https://voyago-bot.onrender.com/webhook

# Il bot si configurerà automaticamente in produzione
```

## 🧪 Test Immediato

1. **Verifica Health Check**: 
   Vai su `https://voyago-bot.onrender.com` → dovresti vedere "Voyago Bot is running!"

2. **Test Bot Telegram**:
   - Cerca `@Voyago_bot` su Telegram
   - Invia `/start`
   - Prova `/plan` per il flusso completo

## 🔧 Configurazione Avanzata Render

### Auto-Deploy da GitHub
```yaml
# render.yaml già configurato per:
- Deploy automatico ad ogni push
- Variabili d'ambiente sicure
- Restart automatico in caso di errori
```

### Monitoraggio
- **Logs**: Dashboard Render → Service → Logs
- **Metrics**: CPU, Memory, Response time
- **Alerts**: Configurabili via email

### Scaling (se necessario)
```yaml
# Upgrade plans disponibili:
- Starter: $7/mese (sempre attivo)
- Standard: $25/mese (più risorse)
- Pro: $85/mese (alta disponibilità)
```

## 🎯 Vantaggi Render vs IONOS

| Feature | Render | IONOS |
|---------|--------|-------|
| Node.js Support | ✅ Nativo | ❌ Limitato |
| HTTPS Gratuito | ✅ | ❌ A pagamento |
| Deploy Automatico | ✅ | ❌ Manuale |
| Logs in Real-time | ✅ | ❌ Limitati |
| Piano Gratuito | ✅ | ❌ |
| Webhook Support | ✅ Perfetto | ⚠️ Complicato |

## 🚨 Importante per Piano Gratuito

Il piano gratuito Render ha una limitazione:
- **Sleep dopo 15 min di inattività**
- **Cold start** di ~30 secondi

### Soluzione: Keep-Alive Service
```javascript
// Già implementato in server.js
// Health check endpoint mantiene il servizio attivo
```

### Alternative per Produzione:
1. **Upgrade a Starter Plan** ($7/mese) - sempre attivo
2. **Usa servizio ping esterno** (UptimeRobot gratuito)

## 🎉 Deploy Completato!

Dopo il deploy su Render:

1. ✅ Bot attivo 24/7 con HTTPS
2. ✅ Webhook configurato automaticamente  
3. ✅ AI insights funzionanti
4. ✅ Link affiliazione pronti
5. ✅ Monitoraggio e logs disponibili

### URL Finali:
- **Bot Health**: `https://voyago-bot.onrender.com`
- **Webhook**: `https://voyago-bot.onrender.com/webhook`
- **Telegram Bot**: `@Voyago_bot`

## 🆘 Troubleshooting

### Bot non risponde:
```bash
# Controlla logs su Render dashboard
# Verifica che il servizio sia "Live"
# Test webhook manualmente
```

### AI non funziona:
```bash
# Verifica API key OpenRouter nei logs
# Controlla quota API su openrouter.ai
# Il bot mostrerà fallback se AI non disponibile
```

### Deploy fallisce:
```bash
# Controlla build logs su Render
# Verifica package.json sia corretto
# Assicurati che tutte le dipendenze siano installabili
```

---

**🚀 Il tuo Voyago Bot è pronto per il mondo!**

Con Render hai una soluzione professionale, scalabile e facile da gestire per il tuo bot di viaggi con monetizzazione affiliate.