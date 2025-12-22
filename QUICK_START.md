# 🚀 Voyago Bot - Quick Start (5 minuti)

## ✅ Tutto Pronto!

- ✅ **Bot Token**: Configurato
- ✅ **OpenRouter API**: Configurato  
- ✅ **9 Link Affiliazione**: Configurati
- ✅ **Render Deploy**: Pronto

## 🚀 Deploy Immediato su Render

### 1. Crea Repository GitHub
```bash
git init
git add .
git commit -m "Voyago Bot ready for deploy"

# Crea repo su GitHub e pusha
git remote add origin https://github.com/TUOUSERNAME/voyago-bot.git
git push -u origin main
```

### 2. Deploy su Render (2 minuti)
1. Vai su [render.com](https://render.com) → **Sign Up/Login**
2. **New +** → **Web Service**
3. **Connect GitHub** → Seleziona il tuo repo
4. **Configurazione**:
   - Name: `voyago-bot`
   - Environment: `Node`
   - Build: `npm install`
   - Start: `npm start`
   - Plan: **Free**

### 3. Deploy Automatico
Il file `render.yaml` configurerà tutto automaticamente:
- Variabili d'ambiente
- Bot token e API keys
- Link affiliazione
- Webhook HTTPS

### 4. Test Immediato
1. **URL Bot**: `https://voyago-bot.onrender.com`
2. **Telegram**: Cerca `@Voyago_bot`
3. **Comandi**: `/start` → `/plan`

## 🎯 Flusso Utente Completo

```
/start → Welcome + "Plan My Trip" button
/plan → Guided questions:
  1. Destination (es. "Paris")
  2. Dates (es. "15/06/2024 - 22/06/2024") 
  3. Traveler type (Solo/Couple/Family/Friends)
  4. Interests (Culture/Food/Nature/Beach/Nightlife)
  5. Budget (es. "€1500")

→ AI generates custom travel plan
→ Shows flights & hotels (Booking.com)
→ Travel services (eSIM, tickets, car rental, attractions)
→ Protection services (insurance, compensation, support)
```

## 💰 Monetizzazione Attiva

Ogni piano generato include link a:
- **YeSim**: eSIM globali
- **TicketNetwork**: Eventi e spettacoli
- **Booking.com**: Voli e hotel
- **AirHelp/Compensair**: Compensazioni voli
- **LocalRent**: Noleggio auto
- **Tiqets**: Musei e attrazioni
- **Ekta**: Assicurazioni viaggio
- **Airalo**: eSIM alternative

## 🧠 AI Features

- **Modello**: Mistral-7B (gratuito via OpenRouter)
- **Prompt**: Ottimizzato per consigli locali
- **Fallback**: Consigli pre-scritti se AI non disponibile
- **Timeout**: 10 secondi max per risposta

## 📊 Monitoraggio

### Render Dashboard:
- **Logs**: Real-time
- **Metrics**: CPU, Memory, Response time
- **Deploy**: Automatico ad ogni push GitHub

### Metriche Chiave:
- Sessioni di pianificazione completate
- Click sui link affiliazione
- Tasso di successo AI
- Errori e performance

## 🎉 Pronto in Produzione!

Dopo il deploy avrai:
- ✅ Bot Telegram professionale
- ✅ AI-powered travel planning
- ✅ 9 flussi di monetizzazione
- ✅ HTTPS e webhook configurati
- ✅ Monitoraggio e logs
- ✅ Deploy automatico da GitHub

## 🆘 Support

Se hai problemi:
1. Controlla logs su Render dashboard
2. Verifica che il servizio sia "Live"
3. Test manuale del webhook
4. Controlla quota OpenRouter API

---

**🌍 Il tuo bot di viaggi è pronto per conquistare il mondo!**