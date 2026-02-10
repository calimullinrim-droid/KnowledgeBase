---
title: Impostazioni avanzate
sidebar_position: 4
---

:::info

Questo articolo descrive AdGuard per Windows v8.0, un blocca-inserzioni completo che protegge il tuo dispositivo a livello di sistema. Questo è una versione beta ancora in fase di sviluppo. Per provarlo, scarica la [versione beta di AdGuard per Windows](https://agrd.io/windows_beta).

:::

The _Advanced settings_ section contains options that go beyond what most users usually need. AdGuard for Windows works perfectly out of the box, but these settings can be useful in special cases or for troubleshooting.

:::caution

Changing advanced settings without understanding them may cause performance issues, break your Internet connection, or affect your security and privacy. Only modify them if you know what you’re doing or if instructed by our support team.

:::

## Escludi app dal filtraggio inserendo il percorso completo

If you want AdGuard to skip filtering a specific app, enter its full file path here. You can add multiple apps by separating their paths with semicolons.

## Abilita le notifiche a comparsa di AdGuard

Abilita questa funzionalità per visualizzare le notifiche popup di AdGuard. Non appaiono troppo spesso e contengono soltanto informazioni importanti. You can also reopen the latest notification from the tray menu.

## Intercetta automaticamente gli URL di iscrizione agli filtri

When enabled, AdGuard will automatically detect filter subscription links (like `abp:subscribe`) and open a window to help you add them to your filters.

## Utilizza modalità reindirizzamento driver

With this option enabled, AdGuard reroutes all your traffic to a local proxy server for filtering.

Se è spento, AdGuard filtra il traffico direttamente — senza reindirizzarlo. In questa modalità, Windows vede AdGuard come l'unica app che si connette alla rete globale, poiché tutte le altre app passano attraverso di essa. Ciò può migliorare leggermente le prestazioni, ma potrebbe ridurre l'efficacia del firewall di sistema.

## Apri AdGuard all'avvio del sistema

Abilita questa opzione per lanciare automaticamente la finestra di AdGuard all'avvio del PC.

## Abilita il filtraggio all'avvio del sistema

A partire dalla versione 7.12, AdGuard non inizia a filtrare automaticamente il traffico dopo l'avvio del PC, a meno che non sia abilitata l'opzione _Avvia AdGuard all'avvio del sistema_. Invece, funziona in modalità passiva "inerte".

Turning this on allows AdGuard to filter traffic immediately, even if the app hasn’t been opened yet.

## Filtra host locale

Enable this to allow AdGuard to filter loopback (localhost) traffic, which some apps use to communicate within the system. If AdGuard VPN is installed, this setting is always on because the VPN requires it to work properly.

## Capture HAR

This is for debugging only. When enabled, AdGuard will create a HAR file (HTTP Archive 1.2 format) with detailed info about all filtered requests. You can open it in apps like Fiddler.

Keep in mind: it may slow down your browsing.

## Show QUIC in the filtering log

When enabled, AdGuard will include QUIC protocol traffic in the filtering log — but only for blocked requests.

## Blocca Java

Some websites still use Java plug-ins, which rely on outdated and insecure technology. You can disable these plug-ins for security.

Using the _Block Java_ option does not affect JavaScript — it will remain enabled.

## Blocking mode for DNS rules

Scegli come AdGuard risponde quando un dominio è bloccato da una regola DNS basata sulla [sintassi in stile hosts](https://adguard-dns.io/kb/general/dns-filtering-syntax/#etc-hosts-syntax).

- Return a `REFUSED` error
- Return a `NXDOMAIN` error
- Return a custom IP address

### Indirizzo IPv4 personalizzato

If _Custom IP address_ is selected in _Blocking mode for DNS rules_, this IP address will be returned in response to blocked A requests. If none are specified, AdGuard will reply with the default REFUSED error.

### Indirizzo IPv6 personalizzato

If _Custom IP address_ is selected in _Blocking mode for DNS rules_, this IP address will be returned in response to blocked AAAA requests. If none are specified, AdGuard will reply with the default REFUSED error.

## Server di fallback

Set backup DNS servers here. AdGuard will use them if the main DNS server doesn’t respond within the timeout you set. You can:

- Use your system’s default DNS servers
- Add custom fallback servers
- Or choose not to use fallback servers at all

## DNS server timeout

Specify how long (in milliseconds) AdGuard should wait for a DNS response before switching to a fallback server. If left empty or invalid, the default is 5000 ms (5 seconds).

## Custom bootstrap addresses

A bootstrap is an intermediate DNS server used to get the IP address of the secure DNS server you chose earlier in DNS protection. Such a “middle ground” is needed when using protocols that denote the server address by letters (such as DNS-over-TLS, for example). In questo caso, il bootstrap agisce da traduttore, trasformando le lettere in numeri comprensibili dal tuo sistema.

But if needed, you can specify different IP addresses here — they’ll be tried in the order from top to bottom. If none work or nothing is entered, AdGuard will fall back to system defaults.

## Esclusioni DNS

Domains listed here bypass AdGuard DNS servers. Their requests go through the system’s default resolver, and AdGuard does not apply any blocking rules to them.
