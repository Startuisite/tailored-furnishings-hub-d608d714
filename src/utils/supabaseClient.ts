
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the required environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

// Create a client with fallbacks to prevent runtime errors
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',  // Placeholder that won't actually connect
  supabaseKey || 'placeholder-key'
);

// Function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseKey;
};

// Function to submit contact form data to Supabase
export const submitContactForm = async (formData: {
  name?: string;
  phone: string;
  email?: string;
  message?: string;
  isDesigner?: boolean;
  source: string;
}) => {
  // First check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured properly. Contact form submission failed.');
    throw new Error('Database connection not configured. Please contact the administrator.');
  }
  
  // Determine the userType based on form data and source
  let userType = 'customer'; // Default value
  
  // If explicitly marked as designer via checkbox
  if (formData.isDesigner) {
    userType = 'designer';
  }
  
  // Override based on page source if it's from specific pages
  if (formData.source === 'designers_page') {
    userType = 'designer';
  } else if (formData.source === 'customers_page') {
    userType = 'customer';
  }
  
  // Prepare the data to be inserted
  const dataToInsert = {
    name: formData.name || null,
    phone: formData.phone,
    email: formData.email || null,
    message: formData.message || null,
    user_type: userType,
    source: formData.source,
    created_at: new Date().toISOString(),
  };

  // Insert the data into the 'contact_requests' table
  const { data, error } = await supabase
    .from('contact_requests')
    .insert([dataToInsert]);

  if (error) {
    console.error('Error submitting form to Supabase:', error);
    throw error;
  }

  return data;
};
