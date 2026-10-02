import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, service, language } = body;

    // Validar campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Preparar datos para el webhook de n8n
    const webhookData = {
      timestamp: new Date().toISOString(),
      source: 'CELC Website',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      service: service || 'General Inquiry',
      message: message.trim(),
      language: language || 'es',
      // Metadata adicional
      userAgent: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
    };

    // Enviar a n8n webhook (configurable via env var)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/celc-form-contacto';
    
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Source': 'celc-website',
      },
      body: JSON.stringify(webhookData),
    });

    // Si n8n no responde, igual guardamos en backup (log)
    if (!n8nResponse.ok) {
      console.log('⚠️ n8n webhook failed, but form submitted:', webhookData);
    }

    // Respuesta exitosa al cliente
    return NextResponse.json(
      { 
        success: true, 
        message: language === 'es' ? 'Mensaje enviado exitosamente' : 'Message sent successfully',
        data: {
          id: Date.now().toString(36),
          receivedAt: webhookData.timestamp,
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}