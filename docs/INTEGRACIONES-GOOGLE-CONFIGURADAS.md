# Integraciones Google Configuradas para CELC Systems

## ✅ Estado: Configuración Inicial Completada

### 📅 Fecha: 2026-04-13
### 👤 Configurado por: Hermes (OpenClaw Agent)

---

## 🔐 Cuenta de Servicio Creada

| Campo | Valor |
|-------|-------|
| **Project ID** | celc-systems |
| **Client Email** | celc-master-api@celc-systems.iam.gserviceaccount.com |
| **Private Key ID** | c18563abe9a3f4d98e19ee6a87aeebd6e2d25f26 |
| **Ubicación** | ~/.config/google/celc-service-account.json |
| **Permisos** | 600 (solo propietario) |

---

## 📋 Integraciones Configuradas

### 1. ✅ Google Sheets
- **Uso:** Guardar formularios de contacto
- **Workflow:** n8n-workflow-celc-master.json
- **Endpoint:** /webhook/celc-form-contacto

### 2. 🔄 Google Drive (Pendiente de usar)
- **Uso:** Almacenar archivos, backups
- **Estado:** Credenciales listas, pendiente workflow

### 3. 🔄 Gmail (Pendiente)
- **Uso:** Enviar notificaciones automáticas
- **Estado:** Disponible via Service Account

### 4. 🔄 YouTube (Pendiente)
- **Uso:** Subir videos, gestionar canal CELC
- **Estado:** Disponible via Service Account

### 5. 🔄 Google Calendar (Pendiente)
- **Uso:** Reservas de citas técnicas
- **Estado:** Disponible via Service Account

---

## 🚀 Próximos Pasos

### Para Activar Formulario:

1. **Compartir Google Sheet**
   - Ve a tu Sheet
   - Click "Compartir"
   - Agregar: `celc-master-api@celc-systems.iam.gserviceaccount.com`
   - Permiso: **Editor**

2. **Obtener Spreadsheet ID**
   - URL: `https://docs.google.com/spreadsheets/d/[ID-AQUI]/edit`
   - Copiar el ID y reemplazar en `.env.local`

3. **Configurar n8n**
   - Importar workflow: `~/n8n-workflow-celc-master.json`
   - Configurar credenciales Google
   - Activar workflow

4. **Deploy**
   - Rebuild contenedor CELC
   - Probar formulario

---

## 🔒 Seguridad

- Private key encriptado en reposo (permiso 600)
- Service Account con permisos mínimos necesarios
- OAuth scopes restringidos por API

---

**Documentación completa:** Ver `GUIA-CONFIGURACION-FORMULARIO-N8N.md`
