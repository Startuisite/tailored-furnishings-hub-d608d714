
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormData {
  "Имя": string;
  "Телефон": string;
  "Email": string;
  "Сообщение": string;
  "Тип клиента": string;
  "Статус": string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    console.log("Received form data:", formData);

    // Format the email content
    const htmlContent = `
      <h1>Новая заявка с сайта</h1>
      <p><strong>Имя:</strong> ${formData["Имя"] || "Не указано"}</p>
      <p><strong>Телефон:</strong> ${formData["Телефон"] || "Не указано"}</p>
      <p><strong>Email:</strong> ${formData["Email"] || "Не указано"}</p>
      <p><strong>Сообщение:</strong> ${formData["Сообщение"] || "Не указано"}</p>
      <p><strong>Тип клиента:</strong> ${formData["Тип клиента"] || "Покупатель"}</p>
      <p><strong>Статус:</strong> ${formData["Статус"] || "Новая"}</p>
    `;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "НПМ Мебель <onboarding@resend.dev>",
      to: ["npm.neprostomebel@mail.ru"],
      subject: `Новая заявка с сайта: ${formData["Тип клиента"]}`,
      html: htmlContent,
      reply_to: formData["Email"] || "no-reply@example.com",
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error in send-email-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
