# Crescendo com Confiança

RPG educativo sobre adolescência e puberdade em **Camaçari, Bahia**.

- **Resolução:** 1280 × 960  
- **Engine:** Phaser 3.80  
- **Personagens:** Lucas Tavares e Lara  
- **Versão:** 1.3 (save em 3 slots + auto-save)

## Executar

```bash
cd jogo-puberdade
python -m http.server 8000
```

Abra `http://localhost:8000` (ou Live Server no VS Code).  
Use **Ctrl+F5** se o cache atrapalhar.

## Controles

| Tecla | Ação |
|-------|------|
| WASD / Setas | Mover |
| E / Clique | Interagir |
| F | Entrar (Casa, Escola, UBS, Mercado) |
| R | Rotina |
| Q | Missões |
| I | Inventário |
| M | Mapa |
| ESC | Pausa / salvar |

## Recursos

- 15 capítulos (Lucas e Lara) + missões secundárias  
- Diálogos com escolhas e consequências  
- Clima, dia/noite, partículas  
- Rotina, economia, inventário  
- NPCs com rotinas por horário  
- Interiores · Save em 3 slots · Auto-save  

## Estrutura

```
src/
  main.js
  data/       chapters, dialogues, quests
  scenes/     todas as telas
  systems/    clima, rotina, quests, loja, save
```

História e conteúdo educativo preservados.
