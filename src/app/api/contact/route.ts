import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken, CSRF_HEADER_NAME } from '@/lib/csrf';
import { contactFormProtection, handleArcjetDecision } from '@/lib/arcjet';

export async function POST(request: NextRequest) {
  // Validate CSRF token
  const csrfToken = request.headers.get(CSRF_HEADER_NAME);
  const isValidToken = await validateCSRFToken(csrfToken);
  
  if (!isValidToken) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    );
  }

  // Check rate limit and bot protection
  const decision = await contactFormProtection.protect(request, { requested: 1 });
  const arcjetError = handleArcjetDecision(decision);
  
  if (arcjetError) {
    return NextResponse.json(
      { error: arcjetError.error },
      { status: arcjetError.status }
    );
  }

  try {
    const data = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = data;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Here you would typically:
    // 1. Send email via SendGrid/Resend/etc
    // 2. Store in database
    // 3. Send to Slack/Discord webhook
    
    // For now, just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    });
    
  } catch (error) {
    // Log error details server-side
    console.error('Contact form error:', error);
    
    // Return generic error to client
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}