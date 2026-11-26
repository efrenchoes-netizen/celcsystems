#!/bin/bash
# Chief of Staff Launcher for CELC Systems
# Uso: ./run-chief-of-staff.sh [morning|eod|triage]

MODE=${1:-morning}
CONTEXT_FILE=~/celcsystems/CHIEF_OF_STAFF_CONTEXT.md
TASKS_FILE=~/celcsystems/workspace/tasks/current.md
RELATIONSHIPS_FILE=~/celcsystems/workspace/relationships/current.md
LOG_FILE=~/celcsystems/logs/chief-of-staff.log

# Crear directorios si no existen
mkdir -p ~/celcsystems/logs
mkdir -p ~/celcsystems/workspace/tasks
mkdir -p ~/celcsystems/workspace/relationships

# Función para logging
log_msg() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

log_msg "=== CHIEF OF STAFF STARTED ==="
log_msg "Mode: $MODE"
case $MODE in
    morning|briefing)
        log_msg "🌅 Generando Morning Briefing..."
        echo ""
        echo "=========================================="
        echo "🌅 MORNING BRIEFING - CELC Systems"
        echo "=========================================="
        echo ""
        echo "Fecha: $(date '+%A, %B %d, %Y')"
        echo "Hora: $(date '+%I:%M %p')"
        echo ""
        
        # Leer contexto
        if [ -f $CONTEXT_FILE ]; then
            echo "📋 Contexto cargado desde: $CONTEXT_FILE"
            log_msg "✅ Contexto cargado"
        fi
        
        # Verificar tareas
        echo ""
        echo "📊 TAREAS DEL DÍA:"
        if [ -f $TASKS_FILE ]; then
            echo "Tareas actuales:"
            head -30 $TASKS_FILE | grep -E "^-|\[ |\*" | head -10 || echo "  (revisar archivo de tareas)"
        else
            echo "  ⚠️  No hay archivo de tareas. Creando..."
            touch $TASKS_FILE
            echo "  archivo creado en $TASKS_FILE"
        fi
        
        echo ""
        echo "📅 CALENDARIO:"
        echo "  (Integración con Google Calendar pendiente)"
        
        echo ""
        echo "📧 INBOX:"
        echo "  (Integración con Gmail pendiente)"
        
        echo ""
        echo "🤝 FOLLOW-UPS:"
        if [ -f $RELATIONSHIPS_FILE ]; then
            echo "Seguimientos pendientes:"
            grep -E "^-|\*" $RELATIONSHIPS_FILE | head -5 || echo "  (revisar archivo de relaciones)"
        else
            echo "  ⚠️  No hay archivo de relaciones. Creando..."
            touch $RELATIONSHIPS_FILE
        fi
        
        echo ""
        echo "🎯 PRIORIDAD PRINCIPAL:"
        echo "  (Revisar y completar)"
        echo ""
        echo "=========================================="
        echo "Fin del briefing"
        echo "=========================================="
        ;;
        
    eod|endofday)
        log_msg "🌙 Generando End-of-Day Review..."
        echo ""
        echo "=========================================="
        echo "🌙 END-OF-DAY REVIEW - CELC Systems"
        echo "=========================================="
        echo ""
        echo "Fecha: $(date '+%A, %B %d, %Y')"
        echo ""
        echo "✅ COMPLETADO HOY:"
        echo "  (Revisar tareas completadas)"
        echo ""
        echo "🔄 AÚN PENDIENTE:"
        echo "  (Tareas que continúan mañana)"
        echo ""
        echo "📤 FOLLOW-UPS ENVIADOS:"
        echo "  (Registro de comunicaciones)"
        echo ""
        echo "📅 MAÑANA PREVIEW:"
        echo "  (Tareas preparadas para mañana)"
        echo ""
        echo "📝 CAPTURE:"
        echo "  ¿Hay algo nuevo que agregar?"
        echo ""
        ;;
        
    triage|ad-hoc)
        log_msg "⚡ Generando Triage..."
        echo ""
        echo "=========================================="
        echo "⚡ QUICK TRIAGE - CELC Systems"
        echo "=========================================="
        echo ""
        echo "Top 3 cosas en las que enfocarte AHORA:"
        echo ""
        echo "1️⃣ URGENTE: (requiere atención inmediata)"
        echo ""
        echo "2️⃣ IMPACTO ALTO: (máximo beneficio)"  
        echo ""
        echo "3️⃣ PENDIENTE LARGO: (esperando demasiado)"
        echo ""
        ;;
        
    *)
        echo "Uso: $0 [morning|eod|triage]"
        echo ""
        echo "Modos disponibles:"
        echo "  morning  - Morning briefing (default)"
        echo "  eod      - End-of-day review"
        echo "  triage   - Quick triage mode"
        ;;
esac

log_msg "=== CHIEF OF STAFF COMPLETED ==="
echo ""
echo "📝 Log guardado en: $LOG_FILE"
